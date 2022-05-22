import React from "react";
import Table from "./generic/table";

export default function Projections(props){
  const {checklistBoB, checklistStrokes, projectionsList} = props;

  const projectionsFiltered = projectionsList.filter((item) => {
    if (item.StatType === 'Strokes'){
      const objIndex = checklistStrokes.findIndex((obj) => obj.Value === item.PossibleMedian);
      if (objIndex !== -1){
        const checked = checklistStrokes[objIndex].Checked;
        return checked;
      }
    }
    if (item.StatType === 'Birdies Or Better'){
      const objIndex = checklistBoB.findIndex((obj) => obj.Value === item.PossibleMedian);
      if (objIndex !== -1){
        const checked = checklistBoB[objIndex].Checked;
        return checked;
      }
    }
  })

  const model = [
    {columnName: 'FirstName', displayName: 'First Name'},
    {columnName: 'LastName', displayName: 'Last Name'},
    {columnName: 'StatType', displayName: 'Stat Type'},
    {columnName: 'Line'},
    {columnName: 'OverUnder', displayName: 'Over/Under'},
    {columnName: 'PossibleMedian', displayName: 'Projected Median'},
    {columnName: 'L20', displayName: 'Last 20'},
    {columnName: 'L40', displayName: 'Last 40'},
    {columnName: 'L80', displayName: 'Last 80'},
  ]

  return(
    <div className="mt-3 row">
      <div className="col-lg-12">
        <Table model={model} data={projectionsFiltered} label="Projections" />
      </div>
    </div>
  );
}
