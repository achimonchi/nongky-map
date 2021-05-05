import {useRef} from "react";
import Link from "next/link";

export default function Login(){

    let passInput = useRef(null);
    let iconLock = useRef(null);
    let isDisplay = false;

    const displayPassword = (e) => {
        isDisplay = !isDisplay;
        
        if(isDisplay){
            passInput.current.setAttribute("type", "text")
            iconLock.current.setAttribute("class", "bi bi-unlock")
        } else {
            iconLock.current.setAttribute("class", "bi bi-lock")
            passInput.current.setAttribute("type", "password")
        }
    }

    return(
        <div className="row">
            <div className="col-12 p-0">
                <div id="login" className="auth px-4 py-2">
                    <div className="top">
                        <Link href="/">
                            <div>
                                <i className="bi bi-arrow-left fs-2"></i>
                            </div>
                        </Link>
                        
                    </div>
                    <div className="header">
                        <h1 className="fw-bold fs-3">Selamat Datang Kembali</h1>
                        <p>Yuk eksplore berbagai tempat nongkrong di dekatmu</p>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-grid gap-2">
                                    <button className="btn bg-white py-2 border">
                                        <i class="bi bi-google me-3 color-primary"></i>
                                        <span>Masuk dengan <b>Google</b></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center mt-2 mb-2">
                                    Atau
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div class="input-group mb-3">
                                    <input type="email" class="form-control border" placeholder="user@example.com"/>
                                    <button class="input-group-text bg-white border" id="basic-addon2">
                                        <i class="bi bi-envelope"></i>
                                    </button>
                                </div>
                                <div class="input-group mb-3">
                                    <input ref={passInput} type="password" class="form-control border" placeholder="password kamu"/>
                                    <button onClick={displayPassword} class="input-group-text bg-white border" id="basic-addon2">
                                        <i class="bi bi-lock" ref={iconLock}></i>
                                    </button>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn bg-primary text-white">
                                        <span>Masuk dengan sekarang</span>
                                    </button>
                                </div>
                                <div className="forget font-xs text-center mt-2">
                                    <Link href="/">
                                        Lupa password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="footer font-xs text-center mt-4">
                        <Link href="/auth/register" className="mt-4">
                            <div>Belum punya akun? <b>Daftar Sekarang</b></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}