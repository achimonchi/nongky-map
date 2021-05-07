import React, {useState, useEffect} from 'react';
import Link from "next/link"
import Nav from "./../../components/Nav";
import {getCurrentLocation} from "./../../actions/map"
import { fetchAll } from '../../actions/cafes';

export default function Index(){
    const [location, setLocation] = useState("");
    const [permission, setPermission] = useState("");
    const [cafes, setCafes] = useState([]);
    const [cafesNearby, setCafesNearby] = useState([]);

    const lists = [
        {
            icon : "bi bi-tag color-primary fs-2",
            text : "Promo",
            url : "/quick/promo",
        },
        {
            icon : "bi bi-geo-alt fs-2",
            text : "Terdekat",
            url : "/quick/nearby",
        },
        {
            icon : "bi bi-cup-straw fs-2",
            text : "Menu",
            url : "/quick/menu",
        },
    ]

    useEffect(()=>{
        const localPermission = localStorage.getItem("permission")
        setPermission(localPermission);
    }, [])

    useEffect(()=>{
        fetchAllCafes();
        fetchAllCafesNearby();
    }, [])

    useEffect(()=>{
        getLocation()
    },[permission])

    const fetchAllCafes=async()=>{
        const data = await fetchAll();
        setCafes(data.data);
    }

    const fetchAllCafesNearby=async()=>{
        const data = await fetchAll();
        setCafesNearby(data.data);
    }

    const checkPermission=async()=>{
        if(navigator.geolocation){
            const localPermission = localStorage.getItem("permission");
            if(localPermission == "granted"){
                setPermission( localPermission );
                localStorage.setItem("permission", "granted");
            } else {
                navigator.geolocation.getCurrentPosition(async()=>{
                    const permissions = await navigator.permissions.query({name:"geolocation"});
    
                    setPermission(permissions.state);
                    localStorage.setItem("permission", permissions.state);
                })
            }
        }
    }

    const getLocation=async()=>{
        if(navigator.geolocation && permission == "granted"){
            navigator.geolocation.getCurrentPosition(async(position)=>{
                const coords = position.coords;
                const data = await getCurrentLocation(coords, permission);
                setLocation(data.city+" | "+data.streetName);
                // console.log(data)
            }, function(err){console.log(err)}, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            })
        } else {
            setLocation("Lokasi tidak terdeteksi !");
        }
    }

    return <>
        <Nav/>
        <Banner 
            permission={permission}
            location={location} 
            setPermission={setPermission}
            checkPermission={checkPermission}
        />
        <Category lists={lists}/>
        <HighlightPromo cafes={cafes}/>
        <Nearby cafes={cafesNearby}/>
    </>
}

const Banner=(props)=>{
    const handleRevoke=async()=>{
        props.checkPermission();
    }
    return (
        <div className="row">
            <div className="col-12 p-0">
                <div className="" style={{backgroundImage: 'url(/images/banner.jpg)', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',  borderRadius:"20px 20px 0px 0px"}}>
                    <div className="px-4 py-4 "  style={{background:"linear-gradient(45deg, rgba(18,38,47,0.9), rgba(41,86,107,0.9))", borderRadius:"20px 20px 0px 0px"}}>
                        <div className="row">
                            <div className="col-10 col-sm-9">
                                <h1 className="text-white fs-3 text-shadow fw-bold">Mau <span className="color-primary">Nongky</span> Dimana Kamu Hari Ini</h1>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-12">
                                <div className="text-white font-xs">
                                    <i className="bi bi-geo-alt-fill me-2"></i> 
                                    {
                                        props.permission !== "granted"
                                            ? <span onClick={handleRevoke} className="bg-white color-dark p-1 px-2 rounded ">aktifkan gps</span>
                                            : props.location
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <Link href="/home/search">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-white border-0" id="basic-addon1">
                                            <i className="bi bi-search color-primary"></i>
                                        </span>
                                        <span className="form-control" style={{
                                            whiteSpace:"nowrap", overflowX:"hidden"
                                        }}>
                                            Cari nama  tempat atau menu ...
                                        </span>
                                        {/* <input type="text" className="form-control border-0" placeholder="Cari nama  tempat atau menu ..." aria-label="Username" aria-describedby="basic-addon1"/> */}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

const Category=(props)=>{
    const lists = props.lists || [];
    return(
        <div className="row mt-2">
            <div className="col-12 p-0">
                <div className="category p-4">
                    <h1 className="font-xs">Kategori</h1>
                    <div className="category-items">
                        <div className="row">
                            {
                                lists.length > 0 
                                    ?   lists.map((list, key)=> (
                                        <div className="col" key={key}>
                                            <Link href={list.url} >
                                                <div className="d-flex flex-column align-items-center card p-2 justify-content-center cursor" style={{height:"100%"}}>
                                                    <i className={list.icon}></i>
                                                    <span className="text-center item font-xs">{list.text}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                    : "Loading ..."
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HighlightPromo=(props)=>{
    const cafes = props.cafes || [];
    return (
        <div className="row">
            <div className="col-md-12 p-0">
                <div className="highlight p-4 py-2">
                    <h1 className="font-xs">Promo untuk kamu</h1>
                    <div className="d-flex" style={{overflowX: 'auto'}}>
                        {
                            cafes.length > 0 
                                ? cafes.map((cafe,key)=>(
                                    <div key={key} className="card card-highlight rounded-3">
                                        <div className="image rounded-3" style={{backgroundImage:`url(${cafe.c_profile})`, backgroundPosition:"center center", backgroundSize:"cover", minHeight: "30vw"}}>
                                            <div className="overlay rounded-3 p-2">
                                                <div className="d-flex flex-column justify-content-end align-items-end">
                                                    <span className="text-white bg-warning-80 px-3 py-1 font-xs rounded-pill flex mb-1">
                                                        <i className="bi bi-star-fill text-white" style={{marginRight:"2px"}}></i>
                                                        <span className="ml-3">4.3</span>
                                                    </span>
                                                    <span className="text-white bg-primary-80 px-3 py-1 font-xs rounded-pill flex">
                                                        <i className="bi bi-tag text-white" style={{marginRight:"2px"}}></i>
                                                        <span className="text-white">ada promo</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc p-2">
                                            <div className="fs-6 fw-bold">{cafe.c_name}</div>
                                            <div className="font-xs">
                                                {cafe.c_address.street}
                                            </div>
                                            <div className="location font-xs color-primary mt-2 d-flex flex-row-reverse ">
                                                <i className="bi bi-geo-alt-fill "></i>
                                                <span>4.0 KM</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : ""
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const Nearby=(props)=>{
    const cafes = props.cafes || [];
    return(
        <div className="row mt-2">
            <div className="col-md-12 p-0">
                <div className="highlight p-4 py-2">
                    <h1 className="font-xs">Tempat disekitar kamu</h1>
                    <div className="d-flex" style={{overflowX: 'auto'}}>
                        {
                            cafes.length > 0 
                                ? cafes.map((cafe,key)=>(
                                    <div key={key} className="card card-highlight rounded-3">
                                        <div className="image rounded-3" style={{backgroundImage:`url(${cafe.c_profile})`, backgroundPosition:"center center", backgroundSize:"cover", minHeight: "30vw"}}>
                                            <div className="overlay rounded-3">
                                            <div className="d-flex flex-column justify-content-end align-items-end">
                                                    <span className="text-white bg-warning-80 px-3 py-1 font-xs rounded-pill flex mt-1">
                                                        <i className="bi bi-star-fill text-white" style={{marginRight:"2px"}}></i>
                                                        <span className="ml-3">4.3</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc p-2">
                                            <div className="fs-6 fw-bold">{cafe.c_name}</div>
                                            <div className="font-xs">
                                                {cafe.c_address.street}
                                            </div>
                                            <div className="location font-xs color-primary mt-2 d-flex flex-row-reverse ">
                                                <i className="bi bi-geo-alt-fill "></i>
                                                <span>4.0 KM</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : ""
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}