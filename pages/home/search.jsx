import {useState, useEffect} from "react"
import NavPage from './../../components/NavPage'

export default function Search(){
    return <>
        <NavPage url="/home"/>
        <InputSearch/>
    </>
}

const InputSearch=()=>{
    const [city, setCity] = useState("");

    useEffect(()=>{
        const localCity = localStorage.getItem("city");
        setCity(localCity)
        console.log({localCity})
    },[])
    
    return(
        <div className="row">
            <div className="col-md-12 p-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inputSearch px-4 py-4">
                            <div className="color-dark mb-2">
                                <i className="bi bi-geo-fill me-2"></i>
                                <span>{
                                    city
                                        ? <>
                                            <spanc className="fw-bold">{city}</spanc> | <span> Set ulang lokasi ?</span>
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
        </div>
    )
}