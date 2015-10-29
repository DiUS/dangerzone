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
  View,
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

var dangerzone = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
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
          <CurrentCoordinates coords={this.state.lastPosition.coords} />
        </Text>
      </View>
    );
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
    marginBottom: 5,
  },
  geolocation: {
    fontWeight: '500',
  },
});

AppRegistry.registerComponent('dangerzone', () => dangerzone);
