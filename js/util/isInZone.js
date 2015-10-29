import coordDistance from './coordDistance';

export default function (coord, zone) {
  return coordDistance(coord, zone) <= zone.radius;
};