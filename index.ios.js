/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  MapView,
} = React;




var CurrentCoordinates = React.createClass({
  render: function() {
    var longitude;
    var latitude;

    if(this.props.coords) {
      longitude = this.props.coords.longitude;
      latitude = this.props.coords.latitude;
    }

    return (
        <Text>
          <Text>My coordinates</Text>
          <Text>longitude: {longitude}</Text>
          <Text>latitude: {latitude}</Text>
        </Text>
    );
  }
})

var Map = React.createClass({
  render: function() {
    var longitude;
    var latitude;

    if(this.props.coords) {
      longitude = this.props.coords.longitude;
      latitude = this.props.coords.latitude;
    }

    return (
        <Text>
          <Text>My coordinates</Text>
          <Text>longitude: {longitude}</Text>
          <Text>latitude: {latitude}</Text>
        </Text>
    );
  }
})

var dangerzone = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',


      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render: function() {
    var longitude;
    var latitude;

    if(this.state.lastPosition.coords) {
      longitude = this.state.lastPosition.coords.longitude;
      latitude = this.state.lastPosition.coords.latitude;
    }

    var dangerzoneCoords = [
      {
        latitude: -33.8634,
        longitude: 151.210,
        title: 'dangerous place',
      },
      {
        latitude: -33.8630,
        longitude: 151.212,
        title: 'another dangerous place',
      }
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the Dangerzone
        </Text>
        <Text style={styles.instructions}>
          Lets get dangerous
        </Text>
        <Text style={styles.instructions}>
          =)
        </Text>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {JSON.stringify(this.state.initialPosition)}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
        </Text>
          <CurrentCoordinates coords={this.state.lastPosition.coords} />
        <View style={styles.row}>

          <MapView style={styles.map} showsUserLocation={true} annotations={dangerzoneCoords} />
        </View>
      </View>
    );
  },

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  geolocation: {
    fontWeight: '500',
  },




  map: {
    height: 150,
    width: 300,
    margin: 100,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

AppRegistry.registerComponent('dangerzone', () => dangerzone);

/// - Utility ------------------------------------------------------------------

/**
 * Calculate the distance in km between two coordinates on a sphere.
 * 
 * @param {object} a - First coordinate.
 * @param {number} a.lat - First coordinate latitude.
 * @param {number} a.lon - First coordinate longitude.
 * @param {object} b - Second coordinate.
 * @param {number} b.lat - Second coordinate latitude.
 * @param {number} b.lon - Second coordinate longitude.
 */
function distance(a, b) {
  var RADIUS_EARTH = 6.371e3; // In kilometers

  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }

  var latA = deg2rad(a.lat);
  var lonA = deg2rad(a.lon);
  var latB = deg2rad(b.lat);
  var lonB = deg2rad(b.lon);

  var dlat = Math.abs(latA - latB);
  var dlon = Math.abs(lonA - lonB);

  var sinSqLat = Math.pow(Math.sin(dlat / 2), 2);
  var sinSqLon = Math.pow(Math.sin(dlon / 2), 2);
  var lawCosLat = Math.cos(latA) * Math.cos(latB);
  var asinArg = Math.sqrt(sinSqLat + lawCosLat * sinSqLon);
  var centralAngle = 2 * Math.asin(asinArg);

  return RADIUS_EARTH * centralAngle;
}