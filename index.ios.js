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
});

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
          <Text style={styles.title}>Distance from dangerzone[0]:</Text>
          {Math.round(coordDistance({ longitude, latitude }, dangerzoneCoords[0]) * 1e3) + ' (m)'}
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
  }
});

AppRegistry.registerComponent('dangerzone', () => dangerzone);