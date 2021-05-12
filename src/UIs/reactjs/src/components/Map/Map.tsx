import React, { Component } from "react";
import { renderToString } from 'react-dom/server';
import { connect } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, LayerGroup, LayersControl } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import styles from "./Map.module.scss";
import L, { LatLng, LatLngLiteral, LatLngTuple } from "leaflet";
import * as RI from "react-icons/ri";

import * as weatherActions from "../../containers/Weathers/actions";
import { Button, ButtonGroup, Nav } from "react-bootstrap";
import dayjs from "dayjs";

type Props = {
  authService: any
  viewport: any
  center: any
  observations: any
  recents: any
  fetchWeatherObservation: any
  fetchWeatherEarthquake: any
  fetchWeatherTidal: any
  fetchWeatherAlarm: any
  fetchWeatherRecent: any
}

interface MyState {
  center: LatLng | LatLngLiteral | LatLngTuple | null
  locationfound: boolean
  locationPosition: LatLng | LatLngLiteral | LatLngTuple | null
  selectPosition: LatLng | LatLngLiteral | LatLngTuple | null
  zoom: any
  showObservation: boolean
  showEarthquake: boolean
  showTidal: boolean
  showRainfall: boolean
  showRecent: boolean
  recentTimeIndex: number
}
class Map extends Component<Props, MyState> {
  state = {
    center: { lat: 24.48339, lng: 118.41064 },
    locationfound: false,
    locationPosition: { lat: 51.505, lng: -0.09 },
    selectPosition: null,
    observationType: 1,
    zoom: 0,
    showObservation: true,
    showRecent: false,
    showEarthquake: false,
    showTidal: false,
    showRainfall: false,
    recentTimeIndex: 0,
  }

  toggleObservation = () => {
    if (!this.state.showObservation) {
      this.props.fetchWeatherObservation({ type: this.state.observationType });
    }
    this.setState({ showObservation: !this.state.showObservation, showRecent: false });
  };

  toggleRecent = () => {
    if (!this.state.showRecent) {
      this.props.fetchWeatherRecent({});
    }
    this.setState({ showRecent: !this.state.showRecent, showObservation: false });
  };

  toggleEarthquake = () => {
    if (!this.state.showEarthquake) {
      this.props.fetchWeatherEarthquake({});
    }
    this.setState({ showEarthquake: !this.state.showEarthquake });
  };

  toggleRainfall = () => {
    this.setState({ showRainfall: !this.state.showRainfall });
  };

  toggleTidal = () => {
    if (!this.state.showTidal) {
      this.props.fetchWeatherTidal({});
    }
    this.setState({ showTidal: !this.state.showTidal });
  };
  initMap: boolean = false;

  componentDidMount() {
    this.props.fetchWeatherAlarm({});
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
        moveend(e) {
          e.target.getBounds();
          console.log(e);
        },
        load(e) {
          console.log(e);
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
      if (!self.initMap) {
        self.initMap = true;
        map.addControl(searchControl);
        map.locate();
      }
      return null
    }

    const observations = this.state.zoom < 11 ? this.props.observations?.filter(x => x.stationId.startsWith("46")) : this.props.observations;
    const tmpColors = [
      { tmp: -50, color: "#0040FF" },
      { tmp: -20, color: "#A54BFF" },
      { tmp: 0, color: "#fff" },
      { tmp: 10, color: "#4BFFFF" },
      { tmp: 20, color: "#A5FF4B" },
      { tmp: 30, color: "#FF4B4B" },
      { tmp: 40, color: "#FF00BF" },
      { tmp: 99, color: "#000" },
    ];

    const Icon = props => {
      const { iconName, color } = props;
      const icon = React.createElement(RI[iconName]);
      return <div style={{ fontSize: "2rem", color: color, opacity: "0.9" }}>{icon}</div>;
    };

    const WeatherMarks = observations?.map((item) => {
      let tmp = item.weatherElement?.TEMP;
      let color = tmpColors.find(x => x.tmp >= tmp)?.color ?? "#fff";
      return (
        <Marker key={item.stationId}
          position={{ lat: item.lat, lng: item.lon }}
          icon={L.divIcon({
            html: renderToString(
              <div>
                <Icon iconName={item.icon ?? "RiMapPin3Fill"} color={color} />
                {item.weatherElement?.TEMP}℃
              </div>
            ),
            className: styles.weatherIcon
          })}>
          <Popup>
            {item.locationName} {item.weatherElement?.Weather} <br />
            氣溫: {item.weatherElement?.TEMP} ℃<br />
            濕度: {Number(item.weatherElement?.HUMD) * 100}%<br />
            累積雨量: {item.weatherElement?.[this.state.observationType === 1 ? "24R" : "H_24R"]}mm<br />
            風向: {item.weatherElement?.WDIR}° 風速: {item.weatherElement?.WDSD}m/s
          </Popup>
        </Marker>
      );
    });

    const RecentMarks = this.props.recents?.filter(x => x.times[this.state.recentTimeIndex]).map((item) => {
      let timeObj = item.times[this.state.recentTimeIndex];
      let weatherElement = timeObj.weatherElement ?? {};
      let tmp = weatherElement.MinT?.parameterName ? Number(weatherElement.MinT.parameterName) : -99;
      let color = tmpColors.find(x => x.tmp >= tmp)?.color ?? "#fff";
      return (
        <Marker key={"Recent-" + item.locationName}
          position={{ lat: item.lat, lng: item.lon }}
          icon={L.divIcon({
            html: renderToString(
              <div>
                <Icon iconName={timeObj.icon ?? "RiMapPin3Fill"} color={color} />
                {weatherElement.MinT.parameterName}-{weatherElement.MaxT.parameterName}℃
              </div>
            ),
            className: styles.weatherIcon
          })}>
          <Popup>
            {item.locationName} {weatherElement.Weather} <br />
            感受: {weatherElement.CI.parameterName}<br />
            氣溫: {weatherElement.MinT.parameterName}-{weatherElement.MaxT.parameterName} ℃<br />
            降雨機率: {weatherElement.PoP.parameterName}%<br />
          </Popup>
        </Marker>
      )
    });

    const RecentButtons = this.props.recents[0]?.times.map((item, i, arr) => {
      return (
        <Button key={"RecentBtn" + i} variant="light" active={this.state.recentTimeIndex === i} onClick={() => this.setState({ recentTimeIndex: i })}>
          {dayjs(item.startTime).format("MM/DD HH:mm")}{i + 1 === arr.length ? "-" + dayjs(item.endTime).format("MM/DD HH:mm") : null}
        </Button>
      )
    }) ?? null;

    const RainfallMarks = observations?.filter(x => x.weatherElement).map((item) => {
      let mm = item.weatherElement[this.state.observationType === 1 ? "24R" : "H_24R"];
      if (mm === "-99") {
        return null;
      }
      return (
        <Marker key={item.stationId}
          position={{ lat: item.lat, lng: item.lon }}
          icon={L.divIcon({
            html: renderToString(
              <div>
                {mm}mm
              </div>
            ),
            className: styles.weatherRainfall
          })}>
        </Marker>
      );
    });

    return (
      <div>
        <Nav className={styles.weather_menu} as="ul">
          <Nav.Item as="li">
            <Button variant="outline-secondary" active={this.state.showObservation} onClick={this.toggleObservation}>觀測</Button>
          </Nav.Item>
          <Nav.Item as="li">
            <Button variant="outline-secondary" active={this.state.showRecent} onClick={this.toggleRecent}>預測</Button>
            {this.state.showRecent ? (<ButtonGroup className="mb-2">{RecentButtons}</ButtonGroup>) : null}
          </Nav.Item>
          <Nav.Item as="li">
            <Button variant="outline-secondary" active={this.state.showEarthquake} onClick={this.toggleEarthquake}>地震</Button>
          </Nav.Item>
          <Nav.Item as="li">
            <Button variant="outline-secondary" active={this.state.showRainfall} onClick={this.toggleRainfall}>雨量</Button>
          </Nav.Item>
          <Nav.Item as="li">
            <Button variant="outline-secondary" active={this.state.showTidal} onClick={this.toggleTidal}>潮汐</Button>
          </Nav.Item>
        </Nav>
        <MapContainer center={this.state.center} zoom={13} scrollWheelZoom={true} className={styles.map_container}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SelectMark />
          <LocationMarker />
          <MapControls />
          <LayersControl position="topright">
            <LayersControl.Overlay name="Weather" checked={this.state.showObservation}>
              <LayerGroup>
                {WeatherMarks}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Rainfall" checked={this.state.showRainfall}>
              <LayerGroup>
                {RainfallMarks}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Recent" checked={this.state.showRecent}>
              <LayerGroup>
                {RecentMarks}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
        <div className={styles.coordinate}>
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
    recents: state.weather.recents,
    earthquakes: state.weather.earthquakes,
    tidals: state.weather.tidals,
    alarms: state.weather.alarms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeatherObservation: (query) => dispatch(weatherActions.fetchWeatherObservation(query)),
    fetchWeatherEarthquake: (query) => dispatch(weatherActions.fetchWeatherEarthquake(query)),
    fetchWeatherTidal: (query) => dispatch(weatherActions.fetchWeatherTidal(query)),
    fetchWeatherAlarm: (query) => dispatch(weatherActions.fetchWeatherAlarm(query)),
    fetchWeatherRecent: (query) => dispatch(weatherActions.fetchWeatherRecent(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
