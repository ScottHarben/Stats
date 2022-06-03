import React, { useState } from "react";

export default function Projections(props){
  const {checklistBoB, checklistStrokes, projectionsList, prizePicksLastUpdated, statTypeFilters, lineTypeFilters,
          handleStatTypeFilterChange, handleLineTypeFilterChange} = props;

  function statTypeFilterChange(value){
    handleStatTypeFilterChange(value);
  }

  function lineTypeFilterChange(value){
    handleLineTypeFilterChange(value);
  }

  const projectionsFiltered = projectionsList.filter((item) => {
    const strokesFilterCheck = statTypeFilters.filter(x => x.Value === 'Strokes')[0];
    const bobFilterCheck = statTypeFilters.filter(x => x.Value === 'Birdies Or Better')[0];
    const overFilterCheck = lineTypeFilters.filter(x => x.Value === 'Over')[0];
    const underFilterCheck = lineTypeFilters.filter(x => x.Value === 'Under')[0];
    if (statTypeFilters.length > 0 && lineTypeFilters.length > 0) {
      if (item.StatType === 'Strokes' && strokesFilterCheck.Checked){
        const objIndex = checklistStrokes.findIndex((obj) => obj.Value === item.PossibleMedian);
        if (objIndex !== -1){
          const checked = checklistStrokes[objIndex].Checked;
          if (checked){
            if (item.OverUnder === 'Over' && overFilterCheck.Checked){
              return checked;
            }
            if (item.OverUnder === 'Under' && underFilterCheck.Checked){
              return checked;
            }
          }
        }
      }
      if (item.StatType === 'Birdies Or Better' && bobFilterCheck.Checked){
        const objIndex = checklistBoB.findIndex((obj) => obj.Value === item.PossibleMedian);
        if (objIndex !== -1){
          const checked = checklistBoB[objIndex].Checked;
          if (checked){
            if (item.OverUnder === 'Over' && overFilterCheck.Checked){
              return true;
            }
            if (item.OverUnder === 'Under' && underFilterCheck.Checked){
              return true
            }
          }
        }
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
          <div className="mb-2">
            <div className="d-inline-block">
              {statTypeFilters.map((obj) => (
                <span key={obj.Value}>
                  <input type="checkbox" className="btn-check" id={obj.Value} checked={obj.Checked} autoComplete="off" onChange={() => statTypeFilterChange(obj.Value)} />
                  <label className="btn btn-outline-primary me-2 mb-2" htmlFor={obj.Value}>{obj.Value}</label>
                </span>
              ))}
            </div>
            <div className="d-inline-block">
              {lineTypeFilters.map((obj) => (
                <span key={obj.Value}>
                  <input type="checkbox" className="btn-check" id={obj.Value} checked={obj.Checked} autoComplete="off" onChange={() => lineTypeFilterChange(obj.Value)} />
                  <label className="btn btn-outline-primary me-2 mb-2" htmlFor={obj.Value}>{obj.Value}</label>
                </span>
              ))}
            </div>
          </div>
          <p className="mb-5">Select projected median values and check your filters to see projections.</p>
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
        <div className="mb-2">
          <div className="d-inline-block">
            {statTypeFilters.map((obj) => (
              <span key={obj.Value}>
                <input type="checkbox" className="btn-check" id={obj.Value} checked={obj.Checked} autoComplete="off" onChange={() => statTypeFilterChange(obj.Value)} />
                <label className="btn btn-outline-primary me-2 mb-2" htmlFor={obj.Value}>{obj.Value}</label>
              </span>
            ))}
          </div>
          <div className="d-inline-block">
            {lineTypeFilters.map((obj) => (
              <span key={obj.Value}>
                <input type="checkbox" className="btn-check" id={obj.Value} checked={obj.Checked} autoComplete="off" onChange={() => lineTypeFilterChange(obj.Value)} />
                <label className="btn btn-outline-primary me-2 mb-2" htmlFor={obj.Value}>{obj.Value}</label>
              </span>
            ))}
          </div>
        </div>
        {projectionsFiltered.map((obj) => (
          <div key={obj.PrizePicksProjectionId} className="card mb-3">
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
