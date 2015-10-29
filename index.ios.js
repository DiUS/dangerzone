/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import coordDistance from './js/util/coordDistance';
import isInZone from './js/util/isInZone';

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  MapView,
  TouchableHighlight,
  AlertIOS,
} = React;


const dangerzoneCoords = [
  {
    latitude: -33.8634,
    longitude: 151.210,
    title: 'dangerous place',
    radius: 100
  },
  {
    latitude: -33.8630,
    longitude: 151.212,
    title: 'another dangerous place',
    radius: 100
  }
];

var CurrentCoordinates = React.createClass({
  render: function() {
    var longitude;
    var latitude;

    if (this.props.coords) {
      longitude = this.props.coords.longitude;
      latitude = this.props.coords.latitude;
    }

    return (
        <Text>
          Current position:
          {longitude}, {latitude}
        </Text>
    );
  }
});

var Button = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
});

var dangerzone = React.createClass({
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
    this.watchID = navigator.geolocation.watchPosition(newPosition => this._updatePosition(newPosition));
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  componentWillReceiveProps: function () {
    const nearbyDangerZones = this._getNearbyDangerZones();
    const currentZoneAlerts = this.state.currentZoneAlerts;
    nearbyDangerZones.forEach(zone => {
      const knownZone = currentZoneAlerts.hasOwnProperty(zone.coordId);
      if (!knownZone) {

      }
    });
  },

  _updatePosition: function (position) {
    const location = position.coords;
    const nearbyZones = dangerzoneCoords
      .filter(zone => isInZone(location, zone))
      .map(zone => ({
        title: zone.title,
        coordId: `${zone.lat},${zone.lon}`,
        distance: coordDistance(location, zone)
      }));

    this.setState({ location });
  },

  _showAlert: function() {
    AlertIOS.alert(
      'Notification Received',
      'Alert message: yo',
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Dangerzone
        </Text>

        <CurrentCoordinates coords={this.state.location}/>

        <Text>
          {/*JSON.stringify(nearbyZones, ' ', 2)*/}
        </Text>

        <View style={styles.row}>
          <MapView style={styles.map} showsUserLocation={true} annotations={dangerzoneCoords} />
        </View>
        <Button
          onPress={this._showAlert.bind(this)}
          label="Send fake notification"
        />
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
  }
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
    marginBottom: 5
  },
  geolocation: {
    fontWeight: '500'
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
    borderColor: '#777777'
  },

  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});

AppRegistry.registerComponent('dangerzone', () => dangerzone);