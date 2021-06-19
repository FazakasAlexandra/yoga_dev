import ReactMapGL, { Marker } from "react-map-gl";
import { useState } from 'react'

export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: 46.767382,
        longitude: 23.602234,
        zoom: 15,
        width: '100%',
        height: '500px'
    })


    return <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZHJhZmF6YWthcyIsImEiOiJja3ExNjFsbW8wYnQzMm9xcmlmN3picXJmIn0.ueogbAfSS_LKncueRmefUQ"
        onViewportChange={(viewport => {
            setViewport(viewport);
        })}
        mapStyle="mapbox://styles/alexandrafazakas/ckq17nly31rj517p89e5b4nv9"
    >
        <Marker latitude={46.767217} longitude={23.602485} offsetLeft={-30} offsetTop={-40}>
            🧘<strong>YOGA STUDIO</strong>
        </Marker>
    </ReactMapGL>
}
