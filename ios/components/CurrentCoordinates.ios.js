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



export default CurrentCoordinates;