import {useState, useEffect} from "react"
import React from "react"
import dynamic from "next/dynamic"

import NavPage from './../../components/NavPage'
import CustomSelect from "./../../components/shareds/CustomSelect";
import nextConfig from "./../../config/next.config";

import {getProvinces, getCities} from "./../../actions/map";

export default function Search(){
    return <>
        <NavPage url="/home"/>
        <InputSearch/>
    </>
}

const InputSearch=()=>{
    const [city, setCity] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal=()=>{
        setIsOpen(true);
    }

    const handleCloseModal=()=>{
        setIsOpen(false);
    }

    useEffect(()=>{
        const localCity = localStorage.getItem("city");
        setCity(localCity)
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Submitted!")
    }

    // const [userLocation, setUserLocation] = useState({})
    
    return(
        <div className="row">
            <div className="col-md-12 p-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inputSearch px-4 py-4">
                            <form onSubmit={handleSubmit}>
                                <div className="color-dark mb-2">
                                    <i className="bi bi-geo-fill me-2"></i>
                                    <span onClick={handleOpenModal} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">{
                                        city
                                            ? <>
                                                <span className="fw-bold">{city}</span> | <span> Set ulang lokasi ?</span>
                                            </>
                                            : "Pilih Lokasimu"
                                    }</span>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-white border-1" id="basic-addon1">
                                        <i className="bi bi-search color-primary"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Cari nama  tempat atau menu ..." aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="riwayat px-4">
                            <h1 className="font-xs fw-bold">Riwayat Pencarian</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={isOpen}
                handleCloseModal={handleCloseModal}
                setCityRoot={setCity}
            />
        </div>
    )
}

const Modal=({isOpen, handleCloseModal, setCityRoot})=>{
    const [optionsProvince, setOptionsProvince] = useState([]);
    const [optionsCity, setOptionsCity] = useState([]);

    const [province, setProvince] = useState({});
    const [city, setCity] = useState({});
    

    useEffect(()=>{
        if(isOpen){
            getAllProvinces();
        }
    },[isOpen])

    useEffect(()=>{
        getAllCities(province.value)
    }, [province, city])

    async function getAllProvinces(){
        const provinces = await getProvinces();
        // console.log({provinces})
        setOptionsProvince(provinces);
    }

    async function getAllCities(id_province){
        const cities = await getCities(id_province);
        // console.log({cities})
        setOptionsCity(cities);
    }

    function changeProvince(val) {
        setProvince(val);
    }
    function changeCity(val) {
        setCity(val);
        setCityRoot(val.label)
        localStorage.setItem("city", val.label)
    }

    function changeLocation(location){
        // console.log({location})
    }

    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Cari Lokasi Kamu</h5>
                    <button onClick={handleCloseModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="province mb-2">
                        <CustomSelect 
                            options={optionsProvince}
                            handleChange={changeProvince}
                            label="Pilih Provinsi"
                            className="mb-2"
                        />
                    </div>
                    <div className="city mb-2">
                        <CustomSelect 
                            options={optionsCity}
                            handleChange={changeCity}
                            label="Pilih Kota"
                        />
                    </div>
                    <div className="map-leaflet mt-4">

                        <MapLeaflet changeLocation={changeLocation} city={city}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn text-white bg-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

const MapLeaflet = ({city, changeLocation}) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city.label}.json?access_token=${nextConfig.TOKEN_MAPBOX}`
    const Map = dynamic(()=>import("../../components/shareds/MapComponent"),
    {
        loading: ()=>"Loading ...",
        ssr: false,
    })

    const [locations, setLocations] = useState([]);
    useEffect(()=>{
        const fetchLocations = async() => {
            await fetch(url)
                .then((text)=>text.text())
                .then((res)=>JSON.parse(res))
                .then((json)=>{
                    setLocations(json.features[0]);
                })
        }
        fetchLocations();
    }, [city])
    if(city.value)
        return <Map changeLocation={changeLocation} locations={locations} />
    else
        return <p>Pilih Kota terlebih dahulu</p>
     
}