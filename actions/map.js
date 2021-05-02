import {agent, wilayah} from "./../utils/agent";

export const getCurrentLocation=(coords, permission) => {
    return new Promise(async(resolve)=>{
        try{
            const latLon = {
                lat : coords.latitude,
                lon : coords.longitude,
            }
            const stringCoords = JSON.stringify(latLon);
            if(localStorage.getItem("coords") == stringCoords && localStorage.getItem("city") && localStorage.getItem("streetName")){
                // console.log("SAMA ...");
                const jsonCoords = JSON.parse(localStorage.getItem("coords"));
                const jsonCity = localStorage.getItem("city");
                const jsonStreet = localStorage.getItem("streetName");
                // console.log(jsonCity)
                resolve({
                    city : jsonCity,
                    latitude : jsonCoords.lat,
                    longitude : jsonCoords.lon,
                    streetName : jsonStreet
                })
            }
            else {
                localStorage.setItem("coords", stringCoords);
                const res = await agent.post("/api/map", {
                    lat : coords.latitude,
                    lon : coords.longitude
                });
                const data = res.data.data;
                // console.log({dataMap:res.data})
                localStorage.setItem("city",data.city)
                const streetName = data.streetName || "No Data";
                localStorage.setItem("streetName",streetName)
                resolve({
                    city : data.city,
                    latitude : data.latitude,
                    longitude : data.longitude,
                    streetName : streetName
                })
            }
        } catch(err){
            console.log(err)
            resolve({
                city : "No data",
                latitude : "0",
                longitude : "0",
                streetName : "No data"
            })
        }
    })
}

export const getProvinces=()=>{
    return new Promise(async(resolve)=>{
        try{
            const provincesTemp = await wilayah.get("/daerahindonesia/provinsi");
            // console.log({provincesTemp})
            const dataProvinces = provincesTemp.data.provinsi;
            const provinces = [];
            dataProvinces.map((prov)=>{
                provinces.push({
                    value:prov.id,
                    label:prov.nama
                });
                return;
            })
            resolve(provinces);
        } catch(err){
            console.log(err);
            resolve([]);
        }
    })
}

export const getCities=(id)=>{
    return new Promise(async(resolve)=>{
        try{
            const citiesTemp = await wilayah.get(`/daerahindonesia/kota?id_provinsi=${id}`);
            // console.log({citiesTemp})
            const dataCities = citiesTemp.data.kota_kabupaten;
            const cities = [];
            dataCities.map((prov)=>{
                const name = prov.nama;
                const nameTemp = name.split(" ");
                nameTemp.splice(0,1);
                const newName = nameTemp.join(" ")
                cities.push({
                    value:prov.id,
                    label:newName
                });
                return;
            })
            resolve(cities);
        } catch(err){
            console.log(err);
            resolve([]);
        }
    })
}