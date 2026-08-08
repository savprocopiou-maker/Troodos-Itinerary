/* Sunrise / sunset without an API key.
 *
 * Standard low-precision solar position algorithm (the "sunrise equation"),
 * accurate to roughly a minute — far better than this itinerary needs.
 * Everything runs locally, so it still works with no signal.
 */

const Sun = (function () {
  const RAD = Math.PI / 180;
  const J2000 = 2451545.0;
  const UNIX_EPOCH_JD = 2440587.5;

  function toJulian(date) {
    return date.getTime() / 86400000 + UNIX_EPOCH_JD;
  }
  function fromJulian(j) {
    return new Date((j - UNIX_EPOCH_JD) * 86400000);
  }

  /* Returns { sunrise: Date, sunset: Date } in real UTC instants, or null
     if the sun does not rise/set that day (never happens in Cyprus). */
  function times(date, lat, lon) {
    const jd = toJulian(date);

    // Days since J2000, corrected for longitude (west negative in this form).
    const n = Math.round(jd - J2000 - 0.0009);
    const Jstar = n + 0.0009 - lon / 360;

    // Solar mean anomaly
    const M = (357.5291 + 0.98560028 * Jstar) % 360;
    const Mr = M * RAD;

    // Equation of the centre
    const C = 1.9148 * Math.sin(Mr) + 0.0200 * Math.sin(2 * Mr) + 0.0003 * Math.sin(3 * Mr);

    // Ecliptic longitude
    const lambda = (M + C + 180 + 102.9372) % 360;
    const lr = lambda * RAD;

    // Solar transit (local noon)
    const Jtransit = J2000 + Jstar + 0.0053 * Math.sin(Mr) - 0.0069 * Math.sin(2 * lr);

    // Declination
    const sinDec = Math.sin(lr) * Math.sin(23.4397 * RAD);
    const cosDec = Math.cos(Math.asin(sinDec));

    // Hour angle for the standard -0.833° altitude (refraction + solar radius)
    const cosOmega =
      (Math.sin(-0.833 * RAD) - Math.sin(lat * RAD) * sinDec) /
      (Math.cos(lat * RAD) * cosDec);

    if (cosOmega > 1 || cosOmega < -1) return null;

    const omega = Math.acos(cosOmega) / RAD;

    return {
      sunrise: fromJulian(Jtransit - omega / 360),
      sunset:  fromJulian(Jtransit + omega / 360),
      noon:    fromJulian(Jtransit)
    };
  }

  /* Format an instant in Cyprus local time (handles EET/EEST automatically). */
  function fmt(date, tz) {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', hour12: false,
        timeZone: tz || 'Asia/Nicosia'
      }).format(date);
    } catch (e) {
      // Fallback if the timezone database is unavailable
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', hour12: false
      }).format(date);
    }
  }

  return { times: times, fmt: fmt };
})();

if (typeof module !== 'undefined') { module.exports = Sun; }
