export default function getPossibleMedianBoB(tournamentBoB){
  let minMedianBoB = 0;
  let maxMedianBoB = 0;
  for (const item of tournamentBoB) {
    const floorR1 = Math.floor(item.R1);
    const floorR2 = Math.floor(item.R2);
    const floorR3 = Math.floor(item.R3);
    const floorR4 = Math.floor(item.R4);
    if (item.Year !== 'Total'){
      if (floorR1 !== null){
        if (floorR1 < minMedianBoB || minMedianBoB === 0){
          minMedianBoB = floorR1
        }
        if (floorR1 > maxMedianBoB){
          maxMedianBoB = floorR1
        }
      }
      if (floorR2 !== null){
        if (floorR2 < minMedianBoB || minMedianBoB === 0){
          minMedianBoB = floorR2
        }
        if (floorR2 > maxMedianBoB){
          maxMedianBoB = floorR2
        }
      }
      if (floorR3 !== null){
        if (floorR3 < minMedianBoB || minMedianBoB === 0){
          minMedianBoB = floorR3
        }
        if (floorR3 > maxMedianBoB){
          maxMedianBoB = floorR3
        }
      }
      if (floorR4 !== null){
        if (floorR4 < minMedianBoB || minMedianBoB === 0){
          minMedianBoB = floorR4
        }
        if (floorR4 > maxMedianBoB){
          maxMedianBoB = floorR4
        }
      }
    }
  }
  return {Min: minMedianBoB, Max: maxMedianBoB}
}