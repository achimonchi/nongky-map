import Head from "next/head";

export default function Layout({children}){
    return(
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* google fonts */}
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>

                {/* Bootstrap 5 */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossOrigin="anonymous"></script>

                
            </Head>
            <div className="container" id="layout">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-sm-10 col-12" id="layoutRoot">
                        <div id="layoutChildren">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}