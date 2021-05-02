import {useState, useEffect} from "react";
import ReactMapGL, {Marker} from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';

import nextConfig from "../../config/next.config";


export default function MapComponent({locations, changeLocation}) {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "300px",
        // The latitude and longitude of the center of London
        latitude: 51.5074,
        longitude: -0.1278,
        zoom: 10
    });

    const [userPosition, setUserPosition] = useState({});

    useEffect(()=>{
        const lat = locations.center[1]
        const lon = locations.center[0]
        setViewport({...viewport, latitude:lat, longitude:lon})
        setUserPosition({lat,lon});
        changeLocation({lat,lon})
        console.log({userPosition})
    },[locations])

    const handleClick=(e)=>{
        // console.log(e.lngLat)
        const lat = e.lngLat[1];
        const lon = e.lngLat[0];
        setUserPosition({lat,lon})
        changeLocation({lat,lon})
    }

  return <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={nextConfig.TOKEN_MAPBOX}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onClick={handleClick}
        >
            <Marker
                latitude={userPosition.lat}
                longitude={userPosition.lon}
                offsetLeft={-20}
                offsetTop={-20}
            >
                <span role="img" aria-label="push-pin">
                    <i className="bi bi-geo-alt-fill color-primary fs-2"></i>
                </span>

            </Marker>
    </ReactMapGL>
}

// export default MapComponent;