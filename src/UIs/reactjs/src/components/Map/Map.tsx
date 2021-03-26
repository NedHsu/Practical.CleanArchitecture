import React, { Component } from "react";
import { renderToString } from 'react-dom/server';
import { connect } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, LayerGroup, LayersControl } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import styles from "./Map.module.scss";
import L, { LatLng, LatLngLiteral, LatLngTuple } from "leaflet";
import { IoIosCloudyNight } from "react-icons/io";
import { WiDayFog } from "react-icons/wi";

import * as weatherActions from "../../containers/Weathers/actions";

type Props = {
  authService: any
  viewport: any
  center: any
  zoom: any
  observations: any
  fetchWeatherObservation: any
}

interface MyState {
  center: LatLng | LatLngLiteral | LatLngTuple | null
  locationfound: boolean
  locationPosition: LatLng | LatLngLiteral | LatLngTuple | null
  selectPosition: LatLng | LatLngLiteral | LatLngTuple | null
  zoom: number
}
class Map extends Component<Props, MyState> {
  state = {
    center: { lat: 24.48339, lng: 118.41064 },
    locationfound: false,
    locationPosition: { lat: 51.505, lng: -0.09 },
    selectPosition: null,
    observationType: 1,
    zoom: 0,
  }

  componentDidMount() {
    this.props.fetchWeatherObservation({ type: this.state.observationType });
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
        zoomlevelschange(e) {
          console.log(e);
        },
        zoomend(e) {
          self.setState({ zoom: e.target._zoom });
        },
      })
      return this.state.selectPosition === null ? null : (
        <Marker position={this.state.selectPosition ?? { lat: 0, lng: 0 }} eventHandlers={markEventHandle} draggable={true}>
          <Popup>
            select here
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

    const observations = this.state.zoom < 11 ? this.props.observations?.filter(x => x.stationId.startsWith("46")) : this.props.observations;
    const WeatherIcons = observations?.map((item) => {
      return (
        <Marker key={item.stationId}
          position={{ lat: item.lat, lng: item.lon }}
          icon={L.divIcon({
            html: renderToString(
              <div>
                <IoIosCloudyNight size="2rem" />
                {item.weatherElement?.TEMP}℃
              </div>
            ),
            className: styles.weatherIcon
          })}>
          <Popup>
            {item.locationName} {item.weatherElement?.Weather} <br />
            氣溫: {item.weatherElement?.TEMP} ℃<br />
            濕度: {Number(item.weatherElement?.HUMD) * 100}%<br />
            累積雨量: {item.weatherElement?.[this.state.observationType === 1 ? "24R" : "H_24R"]}mm
            風向: {item.weatherElement?.WDIR}° 風速: {item.weatherElement?.WDSD}m/s
          </Popup>
        </Marker>
      );
    });

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
          <LayersControl position="topright">
            <LayersControl.Overlay name="Weather" checked={true}>
              <LayerGroup>
                {WeatherIcons}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
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
    observations: state.weather.observations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeatherObservation: (query) => dispatch(weatherActions.fetchWeatherObservation(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
