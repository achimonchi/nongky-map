import agent from "./../utils/agent";

export const getCurrentLocation=(coords) => {
    return new Promise(async(resolve)=>{
        try{
            const latLon = {
                lat : coords.latitude,
                lon : coords.longitude,
            }
            const stringCoords = JSON.stringify(latLon);
            if(localStorage.getItem("coords") == stringCoords){
                console.log("SAMA ...");
                const jsonCoords = JSON.parse(localStorage.getItem("coords"));
                const jsonCity = localStorage.getItem("city");
                console.log(jsonCity)
                resolve({
                    city : jsonCity,
                    latitude : jsonCoords.lat,
                    longitude : jsonCoords.lon,
                })
            }
            else {
                localStorage.setItem("coords", stringCoords);
                const res = await agent.post("/api/map", {
                    lat : coords.latitude,
                    lon : coords.longitude
                });
                const data = res.data.data;
                localStorage.setItem("city",data.city)
                resolve({
                    city : data.city,
                    latitude : data.latitude,
                    longitude : data.longitude,
                })
            }
        } catch(err){
            console.log(err)
            resolve({
                city : "Unknown",
                latitude : "0",
                longitude : "0",
            })
        }
    })
}