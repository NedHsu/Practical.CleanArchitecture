import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import styles from "./Map.module.scss";
import L, { LatLng, LatLngLiteral, LatLngTuple } from "leaflet";

type Props = {
  authService: any
  viewport: any
  center: any
  zoom: any
}

interface MyState {
  center: LatLng | LatLngLiteral | LatLngTuple | null
  locationfound: boolean
  locationPosition: LatLng | LatLngLiteral | LatLngTuple | null
  selectPosition: LatLng | LatLngLiteral | LatLngTuple | null
}
class Map extends Component<Props, MyState> {
  state = {
    center: { lat: 51.505, lng: -0.09 },
    locationfound: false,
    locationPosition: { lat: 51.505, lng: -0.09 },
    selectPosition: null,
  }

  componentDidMount() {
  }
  render() {
    const self = this;
    const LocationMarker = () => {
      const map = useMapEvents({
        locationfound(e) {
          self.setState({ locationPosition: e.latlng, locationfound: true, selectPosition: e.latlng });
          map.flyTo(e.latlng, map.getZoom())
        },
      })
      return this.state.locationPosition === null ? null : (
        <Marker position={this.state.locationPosition}>
          <Popup>
            <span onClick={() => self.setState({ selectPosition: self.state.locationPosition })}>You are here<br />Click me to select here</span>
          </Popup>
        </Marker>
      )
    };

    const markEventHandle = ({
      dragend(e) {
        self.setState({ selectPosition: e.target.getLatLng() });
      },
    })

    const SelectMark = () => {
      const map = useMapEvents({
        unload() {
        },
        click(e) {
          self.setState({ selectPosition: e.latlng });
        },
        dragend(e) {
          console.log(e);
        },
        drag(e) {
          console.log(e);
        },
      })
      return this.state.selectPosition === null ? null : (
        <Marker position={this.state.selectPosition ?? { lat: 0, lng: 0 }} eventHandlers={markEventHandle} draggable={true}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )
    };

    const searchControl = SearchControl({
      provider: new OpenStreetMapProvider(),
      marker: {
        draggable: true,
      },
    });

    const MapControls = () => {
      const map = useMap();
      if (!self.state.locationfound) {
        map.addControl(searchControl);
        map.locate();
      }
      return null
    }

    const WeatherIcon = (weather) => {
      return (
        <Marker
          position={this.state.center}
          icon={L.divIcon({
            html: ""
          })}>
        </Marker>
      )
    }

    return (
      <div>
        <MapContainer center={this.state.center} zoom={13} scrollWheelZoom={true} className={styles.map_container}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SelectMark />
          <LocationMarker />
          <MapControls />
        </MapContainer>
        <div>
          lat: {(this.state.selectPosition ?? { lat: null }).lat} lng: {(this.state.selectPosition ?? { lng: null }).lng}
        </div>
      </div>
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
