'use strict';

var BackgroundGeolocation = require('react-native-background-geolocation');

BackgroundGeolocation.configure({
    desiredAccuracy: 0,
    stationaryRadius: 50,
    distanceFilter: 50,
    disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
    locationUpdateInterval: 5000,
    minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change
    fastestLocationUpdateInterval: 5000,
    activityRecognitionInterval: 10000,
    stopDetectionDelay: 1,  // <--  minutes to delay after motion stops before engaging stop-detection system
    stopTimeout: 2, // 2 minutes
    activityType: 'AutomotiveNavigation',

    // Application config
    debug: true,
    forceReloadOnLocationChange: false,
    forceReloadOnMotionChange: false,
    forceReloadOnGeofence: false,
    stopOnTerminate: false,
    startOnBoot: true
});

// This handler fires whenever bgGeo receives a location update.
BackgroundGeolocation.on('location', function(location) {
  console.log('- [js]location: ', JSON.stringify(location);
});

// This handler fires whenever bgGeo receives an error
BackgroundGeolocation.on('location', function(error) {
  var type = error.type;
  var code = error.code;
  alert(type + " Error: " + code);
});

// This handler fires when movement states changes (stationary->moving; moving->stationary)
BackgroundGeolocation.on('motionchange', function(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
});

BackgroundGeolocation.start(function() {
  console.log('- [js] BackgroundGeolocation started successfully');

  // Fetch current position
  BackgroundGeolocation.getCurrentPosition({timeout: 30000}, function(location) {
    console.log('- [js] BackgroundGeolocation received current position: ', JSON.stringify(location));
  }, function(error) {
    alert("Location error: " + error);
  });
});

module.exports = BackgroundGeolocation;
