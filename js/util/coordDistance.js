const RADIUS_EARTH = 6.371e3; // In kilometers

/**
 * Convert degrees to radians
 * @param deg
 * @returns {number}
 */
function deg2rad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Calculate the distance in km between two coordinates on a sphere.
 *
 * Takes 2 objects with lat/lon properties or 2 arrays with lat/lon pairs
 *
 * E.g.
 *  coordDistance({ lat: -33.8, lon: 151.2 }, { lat: 34.1, lon: -118.8 });
 *  coordDistance([-33.8, 151.2], [34.1, -118.8]);
 */
export default function (a, b) {
  let latA = deg2rad(a.lat || a.latitude  || a[0]);
  let lonA = deg2rad(a.lon || a.longitude || a[1]);
  let latB = deg2rad(b.lat || b.latitude  || b[0]);
  let lonB = deg2rad(b.lon || b.longitude || a[1]);

  let dlat = Math.abs(latA - latB);
  let dlon = Math.abs(lonA - lonB);

  let sinSqLat = Math.pow(Math.sin(dlat / 2), 2);
  let sinSqLon = Math.pow(Math.sin(dlon / 2), 2);
  let lawCosLat = Math.cos(latA) * Math.cos(latB);
  let asinArg = Math.sqrt(sinSqLat + lawCosLat * sinSqLon);
  let centralAngle = 2 * Math.asin(asinArg);

  return RADIUS_EARTH * centralAngle;
};