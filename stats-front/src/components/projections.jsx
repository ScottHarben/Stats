import React from "react";
import Table from "./generic/table";

export default function Projections(props){
  const {checklistBoB, checklistStrokes, projectionsList, prizePicksLastUpdated} = props;

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

  if (projectionsList.length === 0){
    return (
      <div className="mt-3 row">
        <div className="col-lg-12">
          <div className="mb-3">
            <h2 className="mt-3 mb-0">Projections</h2><span className="text-muted small">updated: {prizePicksLastUpdated}</span>
          </div>
          <p className="mb-5">PrizePicks lines not available yet.</p>
        </div>
      </div>
    )
  }

  if (projectionsFiltered.length === 0){
    return(
      <div className="mt-3 row">
        <div className="col-lg-12">
          <div className="mb-3">
            <h2 className="mt-3 mb-0">Projections</h2><span className="text-muted small">updated: {prizePicksLastUpdated}</span>
          </div>
          <p className="mb-5">Select projected median values to see projections.</p>
        </div>
      </div>
    )
  }

  return(
    <div className="mt-3 row">
      <div className="col-lg-12">
        <div className="mb-3">
          <h2 className="mt-3 mb-0">Projections</h2><span className="text-muted small">updated: {prizePicksLastUpdated}</span>
        </div>
        {projectionsFiltered.map((obj,index) => (
          <div key={obj.PlayerId+index} className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h6>{obj.FirstName[0]}. {obj.LastName}</h6>
                </div>
                <div className="col text-end">
                  <span className="text-muted small">{obj.StatType}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                <span className="text-muted small">Line</span>
                  <div className="small">
                    {obj.OverUnder} {obj.Line}
                  </div>
                </div>
                <div className="col">
                <span className="text-muted small">Proj</span>
                <div className="small">
                    {obj.PossibleMedian}
                  </div>
                </div>
                <div className="col">
                <span className="text-muted small">20</span>
                <div className="small">
                    {obj.L20}%
                  </div>
                </div>
                <div className="col">
                <span className="text-muted small">40</span>
                <div className="small">
                    {obj.L40}%
                  </div>
                </div>
                <div className="col">
                <span className="text-muted small">80</span>
                <div className="small">
                    {obj.L80}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
