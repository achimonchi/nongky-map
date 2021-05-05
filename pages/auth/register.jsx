import {useRef} from "react";
import Link from "next/link";

export default function Register(){

    let passInput = useRef(null);
    let iconLock = useRef(null);
    let isDisplay = false;

    let isDisplayConfirm = false;
    let passInputConfirm = useRef(null);
    let iconLockConfirm = useRef(null);

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

    const displayPasswordConfirm=()=>{
        isDisplayConfirm = !isDisplayConfirm;
        
        if(isDisplayConfirm){
            passInputConfirm.current.setAttribute("type", "text")
            iconLockConfirm.current.setAttribute("class", "bi bi-unlock")
        } else {
            iconLockConfirm.current.setAttribute("class", "bi bi-lock")
            passInputConfirm.current.setAttribute("type", "password")
        }
    }

    return(
        <div className="row">
            <div className="col-12 p-0">
                <div id="login" className="auth px-4 py-2">
                    <div className="top">
                        <Link href="/">
                            <div>
                                <i className="bi bi-arrow-left"></i>
                            </div>
                        </Link>
                        
                    </div>
                    <div className="header">
                        <h1 className="fw-bold fs-3">Ayo gabung </h1>
                        <p>Mulai berpetualang bersama temanmu sekarang </p>
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
                                <div class="input-group mb-3">
                                    <input ref={passInputConfirm} type="password" class="form-control border" placeholder="Ulangi Password Kamu"/>
                                    <button onClick={displayPasswordConfirm} class="input-group-text bg-white border" id="basic-addon2">
                                        <i class="bi bi-lock" ref={iconLockConfirm}></i>
                                    </button>
                                </div>
                                <div className="check mb-3 d-flex">
                                    <input type="checkbox" className="bg-white me-2"/> 
                                    <span className="font-xs">Saya setuju dengan <b>Syarat</b> dan <b>Kebijakan</b></span>
                                </div>
                                <div className="d-grid gap-2">
                                <button className="btn bg-primary text-white">
                                        <span>Daftar sekarang</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="footer font-xs text-center mt-4">
                        <Link href="/auth/login" className="mt-4">
                            <div>Sudah punya akun? <b>Masuk Sekarang</b></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
