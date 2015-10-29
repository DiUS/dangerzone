export default function (zone, coord) {
  return coordDistance(coord, zone) <= zone.radius;
};