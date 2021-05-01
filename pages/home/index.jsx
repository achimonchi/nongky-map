import React, {useState, useEffect} from 'react';
import Link from "next/link"
import Nav from "./../../components/Nav";
import {getCurrentLocation} from "./../../actions/map"

export default function Index(props){
    const [location, setLocation] = useState("");
    const [permission, setPermission] = useState("")
    const lists = [
        {
            icon : "bi bi-tag color-primary fs-2",
            text : "Promo",
            url : "",
        },
        {
            icon : "bi bi-geo-alt fs-2",
            text : "Terdekat",
            url : "",
        },
        {
            icon : "bi bi-cup-straw fs-2",
            text : "Menu",
            url : "",
        },
    ]

    const cafes = [
        {
            c_name : "Coffee A",
            c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            c_address : {
                street : "Jl Garuda Gg Pelita No 15",
                province : "Riau",
                city : "Pekanbaru"
            },
        },
        {
            c_name : "Coffee B",
            c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            c_address : {
                street : "Jl Garuda Gg Pelita No 15",
                province : "Riau",
                city : "Pekanbaru"
            },
        },
        {
            c_name : "Coffee C",
            c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            c_address : {
                street : "Jl Garuda Gg Pelita No 15",
                province : "Riau",
                city : "Pekanbaru"
            },
        },
        {
            c_name : "Coffee D",
            c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            c_address : {
                street : "Jl Garuda Gg Pelita No 15",
                province : "Riau",
                city : "Pekanbaru"
            },
        },
        {
            c_name : "Coffee E",
            c_profile : "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            c_address : {
                street : "Jl Garuda Gg Pelita No 15",
                province : "Riau",
                city : "Pekanbaru"
            },
        },
    ]

    useEffect(()=>{
        getLocation()
        console.log(props.data)
    },[])

    useEffect(()=>{
        checkPermission()
    },[permission]);

    const checkPermission=async()=>{
        const permission = await navigator.permissions.query({name:"geolocation"});
        setPermission(permission.state);
    }

    const getLocation=async()=>{
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async(position)=>{
                const coords = position.coords;
                const data = await getCurrentLocation(coords);
                setLocation(data.city+" : "+data.latitude+" , "+data.longitude);
                console.log(data)
            }, function(err){console.log(err)}, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            })
        } else {
            setLocation("Lokasi tidak terdeteksi !");
            setPermission("prompt");
        }
    }

    return <>
        <Nav/>
        <Banner permission={permission} location={location} setPermission={setPermission}/>
        <Category lists={lists}/>
        <HighlightPromo cafes={cafes}/>
        <Nearby cafes={cafes}/>
    </>
}

const Banner=(props)=>{
    const handleRevoke=async()=>{
        alert("Harap aktifkan GPS dan Ubah Permission pada Location !")
        // browser.permissions.remove(permissionToRemove).then(result => {
        //     console.log(result);
        //   });
        // navigator.permissions.revoke({name:'geolocation'}).then(function(result) {
        //     props.setPermission(result.state);
        //   });
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
                                    <i className="bi bi-geo me-2"></i> 
                                    {
                                        props.permission !== "granted"
                                            ? <span onClick={handleRevoke} className="bg-white color-dark p-1 px-2 rounded ">actifkan gps</span>
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
                                        <span className="form-control">
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
                                        <div className="col-4" key={key}>
                                            <div className="d-flex flex-column align-items-center card p-2 justify-content-center" style={{height:"100%"}}>
                                                <i className={list.icon}></i>
                                                <span className="text-center item font-xs">{list.text}</span>
                                            </div>
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