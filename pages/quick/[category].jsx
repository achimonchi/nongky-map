
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import { fetchAll } from "../../actions/cafes";
import {Listcard} from "../../components/shareds/ListCard";
import NavPage from "./../../components/NavPage";

export default function Category(){
    const router = useRouter();

    const [listData, setListData] = useState([]);
    
    const checkPath = () => {
        switch(router.query.category){
            case "promo":
                fetchPromo();
            break;
            case "nearby":
                fetchNearby();
            break;
            case "menu" :
                fetchMenu();
            break;
        }
    }

    useEffect(()=>{
        checkPath();
    }, [router.query])

    const fetchPromo=async()=>{
        const data = await fetchAll();
        setListData(data.data);
    }

    const fetchNearby=async()=>{
        const data = await fetchAll();
        setListData(data.data);
    }

    const fetchMenu=async()=>{
        const data = await fetchAll();
        setListData(data.data);
    }

    return (
        <>
            <NavPage/>
            <List category={router.query?.category} listData={listData}/>    
        
        </>
    )
}

const List=({listData=[], category})=>{
    return(
        <div className="row">
            <div className="col-12 p-0">
                <div className="search mt-5 pt-5 px-4">
                    <h5 className="font-xs">Anda mencari : {category}</h5>
                    {console.log(category)}
                </div>
                <div className="list py-2 px-4">
                    {
                        listData.length > 0 
                            ? listData.map((data, i)=>(
                                <Listcard key={i}
                                    images={data.c_profile}
                                >
                                    <h1 className="fs-4 fw-bold">{data.c_name}</h1>
                                    <h2 className="fs-6">
                                        {data.c_address?.street}
                                    </h2>
                                    <h2 className="font-xs" style={{opacity:"0.5"}}>
                                        {data.c_address?.province}, {data.c_address?.city}
                                    </h2>
                                    <h2 className="font-xs">
                                    </h2>
                                </Listcard>
                            ))
                            : "No Data ..."
                    }
                </div>
            </div>
        </div>
    )
}