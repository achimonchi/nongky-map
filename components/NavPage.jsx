
import Link from "next/link"
import { useEffect, useRef, useState } from "react";

export default function NavPage(props) {
    const url = props.url || "/";
    let nav = useRef(null);

    const [clientWidth, setClientWidth] = useState(0);

    useEffect(()=>{
        handleScroll()
    }, [clientWidth])

    const handleScroll=()=>{
        setClientWidth(nav.current.clientWidth)
        console.log(nav.current.clientWidth);
    }
    

    return(
        <div className="row" >
            <div ref={nav} className="col-12 p-0  ">
                <div  className="py-2 px-4 bg-white shadow-sm fs-6 d-flex align-items-center position-fixed justify-content-between"
                    style={{
                        width:clientWidth
                    }}
                >
                    <div className="d-flex align-items-center ">
                        <Link href={url}>
                            <i className="bi bi-arrow-left fs-2 cursor"></i>
                        </Link>
                        <span className="fs-6 fw-bold ms-2">Pencarian</span>
                    </div>
                    <Link href="/auth/login">
                        <i className="bi bi-person-circle fs-2 cursor"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}