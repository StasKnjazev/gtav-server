const bankBlips: Array<object> = [
  { x: -1382.44, y: -500.38, z: 33.16 },
  { x: 1180.27, y: 2704.92, z: 38.09 },
  { x: -116.76, y: 6468.89, z: 31.63 },
];

const markers: Array<object> = [
  { x: -1382.44, y: -500.38, z: 32.2 },
  { x: 1180.46, y: 2704.89, z: 37.1 },
  { x: -116.76, y: 6468.89, z: 30.65 },
];

const startColshapeFromSantos: ColshapeMp = mp.colshapes.newSphere(-1382.46, -500.65, 33.16, 1, 0);
const startColshapeFromSandy: ColshapeMp = mp.colshapes.newSphere(1179.79, 2704.90, 38.09, 1, 0); // 1179.79, 2704.90, 38.09 // 1180.27, 2704.92, 38.09
const startColshapeFromPaleto: ColshapeMp = mp.colshapes.newSphere(-116.76, 6468.89,31.63, 1, 0);


export default {
  bankBlips,
  markers,
  startColshapeFromSantos,
  startColshapeFromSandy,
  startColshapeFromPaleto,
};
