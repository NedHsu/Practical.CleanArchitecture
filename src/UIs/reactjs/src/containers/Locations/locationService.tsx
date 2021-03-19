

class LocationService {
    geoFindMe = async (success, error) => {
        var message = "";
        var href = "";
        function _success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            message = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        }

        function _error() {
            message = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            message = 'Geolocation is not supported by your browser';
        } else {
            message = 'Locating…';
            await navigator.geolocation.getCurrentPosition(success, error);
        }
    }
}

const instance = new LocationService();

export default instance;