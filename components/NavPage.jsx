
import Link from "next/link"

export default function NavPage(props) {
    const url = props.url || "/"
    return(
        <div className="row">
            <div className="col-12 p-0  bg-white shadow-sm">
                <div className="py-2 px-4 fs-6 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link href={url}>
                            <i className="bi bi-arrow-left fs-2"></i>
                        </Link>
                        <span className="fs-6 fw-bold ms-2">Pencarian</span>
                    </div>
                    <Link href="/auth/login">
                        <i className="bi bi-person-circle fs-2"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}