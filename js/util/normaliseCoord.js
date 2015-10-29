export default function (coord) {
  return {
    lat: coord.lat || coord.latitude  || coord[0],
    lon: coord.lon || coord.longitude || coord[1]
  };
};