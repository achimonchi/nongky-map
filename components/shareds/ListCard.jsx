export const Listcard=({images,children})=>{
    return(
        <div className="list-card border mb-4 p-2 bg-white  d-flex">
            <div className="side-image border me-2"
                style={{
                    background:`url(${images})`,
                    backgroundSize:"cover",
                    backgroundPosition:"center center",
                    minWidth:"100px",
                    width:"7vw",
                    minHeight:"100px",
                    height:"7vw",
                }}
            ></div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}