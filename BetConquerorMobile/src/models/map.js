import Zone from './zone';
import PlayerEnum from './player';

const Map = {
  zones: [],
};

const initializeMap = () => {
  Map.zones = inializeZones();
};

const inializeZones = () => {
  let zones = [];
  zones.push(
    new Zone('zoneOrange', PlayerEnum.none, {
      xLeft: 80,
      xRight: 400,
      yDown: 154,
      yUp: 52,
    }),
  );

  zones.push(
    new Zone('zoneViolette', PlayerEnum.player1, {
      xLeft: 160,
      xRight: 415,
      yDown: 294.5,
      yUp: 160,
    }),
  );
  return zones;
};

initializeMap();

export default Map;
