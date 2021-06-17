import Layout from '../components/Layout'
import ReactMapGL, { Marker }from "react-map-gl";
import { useState } from 'react';

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: 46.767382,
    longitude: 23.602234,
    zoom:18,
    width: '100%',
    height: '700px'
  })
  return (
    <Layout activeTab={"home"}>
      <h1 style={{ textAlign: 'center' }}>Visit us !</h1>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZHJhZmF6YWthcyIsImEiOiJja3ExNjFsbW8wYnQzMm9xcmlmN3picXJmIn0.ueogbAfSS_LKncueRmefUQ"
        onViewportChange={(viewport => {
          setViewport(viewport);
        })}
        mapStyle="mapbox://styles/alexandrafazakas/ckq17nly31rj517p89e5b4nv9"
     >
         <Marker latitude={46.767217} longitude={23.602485} offsetLeft={-20} offsetTop={-10}>
         🧘<strong>YOGA STUDIO</strong>
         </Marker>
      </ReactMapGL>
    </Layout>
  )
}
