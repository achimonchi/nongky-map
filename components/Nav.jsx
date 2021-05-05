import Link from "next/link"

export default function Nav(){
    return(
        <div className="row">
            <div className="col-12 p-0">
                <div className="py-2 px-4 font-xs d-flex align-items-center">
                    <i className="bi bi-person-circle fs-2 me-2"></i> 
                    <span>
                        <Link href="/auth/register">Buat akun</Link> | <b><Link href="/auth/login">Masuk</Link></b>
                    </span>
                </div>
            </div>
        </div>
    )
}