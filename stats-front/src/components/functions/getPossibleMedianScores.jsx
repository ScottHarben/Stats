export default function getPossibleMedianScores(tournamentScores){
  let minMedianScore = 0;
  let maxMedianScore = 0;
  for (const item of tournamentScores) {
    const floorR1 = Math.floor(item.R1);
    const floorR2 = Math.floor(item.R2);
    const floorR3 = Math.floor(item.R3);
    const floorR4 = Math.floor(item.R4);
    if (item.Year !== 'Total'){
      if (floorR1 !== null){
        if (floorR1 < minMedianScore || minMedianScore === 0){
          minMedianScore = floorR1
        }
        if (floorR1 > maxMedianScore){
          maxMedianScore = floorR1
        }
      }
      if (floorR2 !== null){
        if (floorR2 < minMedianScore || minMedianScore === 0){
          minMedianScore = floorR2
        }
        if (floorR2 > maxMedianScore){
          maxMedianScore = floorR2
        }
      }
      if (floorR3 !== null){
        if (floorR3 < minMedianScore || minMedianScore === 0){
          minMedianScore = floorR3
        }
        if (floorR3 > maxMedianScore){
          maxMedianScore = floorR3
        }
      }
      if (floorR4 !== null){
        if (floorR4 < minMedianScore || minMedianScore === 0){
          minMedianScore = floorR4
        }
        if (floorR4 > maxMedianScore){
          maxMedianScore = floorR4
        }
      }
    }
  }
  return {Min: minMedianScore, Max: maxMedianScore}
}