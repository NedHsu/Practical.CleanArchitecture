import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import styles from "./Map.module.scss";
import { LatLng } from "leaflet";

const OTHER_PROPS = [
  'children',
  'className',
  'id',
  'style',
  'useFlyTo',
  'whenReady',
]

type Props = {
  authService: any
  viewport: any
  center: any
  zoom: any
}

const searchControl = SearchControl({
  provider: new OpenStreetMapProvider(),
  marker: {
    draggable: true,
  },
});

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    load() {
      console.log("loaded");
    },
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
};

const MapControls = () => {
  const map = useMap();
  map.addControl(searchControl);
  return null
}

class Map extends Component<Props> {
  state = {
    center: { lat: 51.505, lng: -0.09 },
  }
  componentDidMount() {
  }
  render() {
    return (
      <MapContainer center={this.state.center} zoom={13} scrollWheelZoom={true} className={styles.map_container}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.state.center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker />
        <MapControls />
      </MapContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authService: state.auth.authService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
