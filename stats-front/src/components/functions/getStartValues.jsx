export default function getStartValues(tournamentScores, tournamentBoB){
  let initialPossibleStrokes = 0;
  const initialPossibleStrokesList = tournamentScores.filter((item) => {
    return item.Year === 'Total'
  })
  if (initialPossibleStrokesList.length === 1){
    initialPossibleStrokes = initialPossibleStrokesList[0].Total;
  }
  let initialPossibleBoB = 0;//here
  const initialPossibleBoBList = tournamentBoB.filter((item) => {
    return item.Year === 'Total'
  })
  if (initialPossibleBoBList.length === 1){
    initialPossibleBoB = initialPossibleBoBList[0].Total;
  }
  const startValues = {InitialStrokes: initialPossibleStrokes, InitialBoB: initialPossibleBoB}
  return startValues;
}