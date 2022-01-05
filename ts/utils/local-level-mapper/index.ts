interface MapProps {
  localLevel: number
}

interface NumberKeyValue {
  [key: number]: number;
}

const localLevelToRadiusMap: NumberKeyValue = {
  0: 3,
  1: 5,
  2: 10,
  3: 20,
  4: 30, 
  5: 50,
  6: 100,
  7: 200,
  8: 300,
  9: 600
}

const map = (props: MapProps) => {
  return localLevelToRadiusMap[props.localLevel]
}

module.exports = Object.freeze({
  map: map
})

