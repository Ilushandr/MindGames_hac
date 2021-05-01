export const HEATMAP_FULL = 13;
export const HEATMAP_ZONE_QUARTER = 23

const defaultMapClass = 'redstone';
const defaultMapSize = 'size-70';


const getZone = (rangeAlpha, digitRange, player, type = 'circle', size = defaultMapSize) =>
{
  var color;
  if (player === 'main') {
    color = 'greenstone'
  } else {
    color = 'redstone'
  }
  let mapStones = {}
  let classNamesMapStones = {}
  let alpha = rangeAlpha.toUpperCase().split('')
  let digits = digitRange.split(',')

  alpha.map((char) => {
    digits.map((digit) => {
      mapStones[`${char}${digit}`] = type
      classNamesMapStones[`${char}${digit}`] = `${size} ${color}`
    })
  })

  return {mapStones, classNamesMapStones};
}
export const MAP_QUARTERS = (player) => {
  return {'1': getZone('GHJKLMN', '7,8,9,10,11,12,13', player),
  '2': getZone('ABCDEFG', '7,8,9,10,11,12,13', player),
  '3': getZone('ABCDEFG', '1,2,3,4,5,6,7', player),
  '4': getZone('GHJKLMN', '1,2,3,4,5,6,7', player)}
}

export const MAP_HALF  = (player) => {
  return {'1': getZone('ABCDEFGGHJKLMN', '7,8,9,10,11,12,13'),
  '2': getZone('ABCDEFGGHJKLMN', '1,2,3,4,5,6,7')}
}
