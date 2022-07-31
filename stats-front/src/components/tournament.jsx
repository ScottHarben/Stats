import React, { useState, useEffect, Fragment } from "react";
import Table from "./generic/table";
import Select from "./generic/select";
import Projections from "./projections";
import getPossibleMedianScores from "./functions/getPossibleMedianScores";
import getPossibleMedianBoB from "./functions/getPossibleMedianBoB";
import getStartValues from "./functions/getStartValues";
const lodash = require('lodash');


export default function Log({axios}){
  const [tournamentSelect, setTournamentSelect] = useState([]);
  const [tournamentScores, setTournamentScores] = useState([]);
  const [tournamentBoB, setTournamentBoB] = useState([]);
  const [projectionsList, setProjectionsList] = useState([]);
  const [checklistStrokes, setChecklistStrokes] = useState([]);
  const [checklistBoB, setChecklistBoB] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectPermNum, setSelectPermNum] = useState();
  const [statTypeFilters, setStatTypeFilters] = useState([]);
  const [lineTypeFilters, setLineTypeFilters] = useState([]);


  useEffect(() => {
    (async function () {
      try {
        const selectResult = await axios.get("/api/tournament/select");
        const localPermNum = localStorage.getItem("permNum");
        let permNum = "";
        if (localPermNum) {
          permNum = localPermNum
        } else {
          permNum = selectResult.data[0].Value;
        }
        const scoreResult = await axios.get("/api/tournament/medianscore", { params: {permNum: permNum}});
        const bobResult = await axios.get("/api/tournament/medianbob", { params: {permNum: permNum}});
        const projectionsResult = await axios.get("/api/tournament/getprojections");
        const logResult = await axios.get("/api/logs");
        setTournamentSelect(selectResult.data);
        setTournamentScores(scoreResult.data);
        setTournamentBoB(bobResult.data);
        setProjectionsList(projectionsResult.data);
        setLogs(logResult.data);
        setSelectPermNum(permNum);
        
        const possibleMedianScoreRange = getPossibleMedianScores(scoreResult.data);
        const possibleMedianBoBRange = getPossibleMedianBoB(bobResult.data);
        const startValues = getStartValues(scoreResult.data, bobResult.data);
        const scoreRange = lodash.range(possibleMedianScoreRange.Min,possibleMedianScoreRange.Max+1);
        const bobRange = lodash.range(possibleMedianBoBRange.Min,possibleMedianBoBRange.Max+1);
        const localChecklistStrokes = localStorage.getItem("checklistStrokes");
        let scoreRangeChecks = [];
        if (localChecklistStrokes) {
          scoreRangeChecks = JSON.parse(localChecklistStrokes);
        } else {
          scoreRangeChecks = scoreRange.map((value) => (
            {Value: value, Checked: value === startValues.InitialStrokes}
          ));
        }
        const localChecklistBoB = localStorage.getItem("checklistBoB");
        let bobRangeChecks = [];
        if (localChecklistBoB) {
          bobRangeChecks = JSON.parse(localChecklistBoB);
        } else {
          bobRangeChecks = bobRange.map((value) => (
            {Value: value, Checked: value === startValues.InitialBoB}
          ));
        }
        setChecklistStrokes(scoreRangeChecks);
        setChecklistBoB(bobRangeChecks);
        
        const localStatTypeFilter = localStorage.getItem("statTypeFilter");
        let statTypeChecks = [];
        if (localStatTypeFilter) {
          statTypeChecks = JSON.parse(localStatTypeFilter);
        } else {
          statTypeChecks = [
            {Value: 'Strokes', Checked: true},
            {Value: 'Birdies Or Better', Checked: true}
          ];
        }
        const localLineTypeFilter = localStorage.getItem("lineTypeFilter");
        let lineTypeChecks = [];
        if (localLineTypeFilter) {
          lineTypeChecks = JSON.parse(localLineTypeFilter);
        } else {
          lineTypeChecks = [
            {Value: 'Over', Checked: true},
            {Value: 'Under', Checked: true}
          ];
        }
        setStatTypeFilters(statTypeChecks)
        setLineTypeFilters(lineTypeChecks)
      } catch (error) {
        //handleError(error);
      }
    })();
  }, [axios]);

  async function getTournamentStats(permNum) {
    try {
      localStorage.setItem("permNum", permNum);

      const scoreResult = await axios.get("/api/tournament/medianscore", { params: {permNum: permNum}});
      const bobResult = await axios.get("/api/tournament/medianbob", { params: {permNum: permNum}});
      setTournamentScores(scoreResult.data);
      setTournamentBoB(bobResult.data);

      const possibleMedianScoreRange = getPossibleMedianScores(scoreResult.data);
      const possibleMedianBoBRange = getPossibleMedianBoB(bobResult.data);
      const startValues = getStartValues(scoreResult.data, bobResult.data);
      const scoreRange = lodash.range(possibleMedianScoreRange.Min,possibleMedianScoreRange.Max+1);
      const bobRange = lodash.range(possibleMedianBoBRange.Min,possibleMedianBoBRange.Max+1);
      const scoreRangeChecks = scoreRange.map((value) => (
        {Value: value, Checked: value === startValues.InitialStrokes}
      ));
      const bobRangeChecks = bobRange.map((value) => (
        {Value: value, Checked: value === startValues.InitialBoB}
      ));
      setChecklistStrokes(scoreRangeChecks);
      setChecklistBoB(bobRangeChecks);
      localStorage.removeItem("checklistStrokes");
      localStorage.removeItem("checklistBoB");
      localStorage.removeItem("statTypeFilter");
      localStorage.removeItem("lineTypeFilter");
    } catch (error) {
      //console.error(error.response.data);
    }
  }

  function handleStrokeMedianChange(value){
    const newChecklist = checklistStrokes.map((obj) => (
      {Value: obj.Value, Checked: obj.Checked}
    ));
    const objIndex = newChecklist.findIndex((obj) => obj.Value === value);
    const currentChecked = newChecklist[objIndex].Checked;
    newChecklist[objIndex].Checked = !currentChecked;
    setChecklistStrokes(newChecklist);
    localStorage.setItem("checklistStrokes", JSON.stringify(newChecklist));
  }

  function handleBoBMedianChange(value){
    const newChecklist = checklistBoB.map((obj) => (
      {Value: obj.Value, Checked: obj.Checked}
    ));
    const objIndex = newChecklist.findIndex((obj) => obj.Value === value);
    const currentChecked = newChecklist[objIndex].Checked;
    newChecklist[objIndex].Checked = !currentChecked;
    setChecklistBoB(newChecklist);
    localStorage.setItem("checklistBoB", JSON.stringify(newChecklist));
  }

  function handleStatTypeFilterChange(value){
    const newChecklist = statTypeFilters.map((obj) => (
      {Value: obj.Value, Checked: obj.Checked}
    ));
    const objIndex = newChecklist.findIndex((obj) => obj.Value === value);
    const currentChecked = newChecklist[objIndex].Checked;
    newChecklist[objIndex].Checked = !currentChecked;
    setStatTypeFilters(newChecklist);
    localStorage.setItem("statTypeFilter", JSON.stringify(newChecklist));
  }

  function handleLineTypeFilterChange(value){
    const newChecklist = lineTypeFilters.map((obj) => (
      {Value: obj.Value, Checked: obj.Checked}
    ));
    const objIndex = newChecklist.findIndex((obj) => obj.Value === value);
    const currentChecked = newChecklist[objIndex].Checked;
    newChecklist[objIndex].Checked = !currentChecked;
    setLineTypeFilters(newChecklist);
    localStorage.setItem("lineTypeFilter", JSON.stringify(newChecklist));
  }

  const model = [
    {columnName: 'Year'},
    {columnName: 'R1'},
    {columnName: 'R2'},
    {columnName: 'R3'},
    {columnName: 'R4'},
    {columnName: 'Total'}
  ] 

  const lastUpdatedRecords = logs.filter((log) => {
    return log.Message === 'main finished';
  })
  let pgaLastUpdated = "";
  let prizePicksLastUpdated = "";
  for (const log of lastUpdatedRecords) {
    if (log.Process === 'PGATour'){
      const options = {dateStyle:"medium",timeStyle:"short"}
      pgaLastUpdated = new Date(log.Injected).toLocaleString("en-US", {options});
    }
    if (log.Process === 'PrizePicks'){
      const options = {dateStyle:"medium",timeStyle:"short"}
      prizePicksLastUpdated = new Date(log.Injected).toLocaleString("en-US", {options});
    }
  }
  
  return(
    <Fragment>
      <h2 className="mt-3 mb-0">Statistics</h2> <span className="text-muted small">updated: {pgaLastUpdated}</span>
      <div className="row">
        <div className="col-lg-6">
          <Select selectItems={tournamentSelect} selected={selectPermNum} label="Tournament" selectId="PermNum" classes="form-control" handleValueChange={getTournamentStats} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card mt-3">
            <div className="card-body">
              <Table model={model} data={tournamentScores} label="Median Strokes" />
              <div>
                {checklistStrokes.map((item, index) => (
                  <span key={index}>
                    <input type="checkbox" className="btn-check" id={item.Value} checked={item.Checked} onChange={() => handleStrokeMedianChange(item.Value)} autoComplete="off" />
                    <label className="btn btn-outline-primary me-2 mb-2" htmlFor={item.Value}>{item.Value}</label>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mt-3">
            <div className="card-body">
              <Table model={model} data={tournamentBoB} label="Median Birdies Or Better" />
              <div>
                {checklistBoB.map((item, index) => (
                  <span key={index}>
                    <input type="checkbox" className="btn-check" id={item.Value} checked={item.Checked} onChange={() => handleBoBMedianChange(item.Value)} autoComplete="off" />
                    <label className="btn btn-outline-primary me-2 mb-2" htmlFor={item.Value}>{item.Value}</label>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Projections 
        checklistBoB={checklistBoB} 
        checklistStrokes={checklistStrokes} 
        projectionsList={projectionsList} 
        prizePicksLastUpdated={prizePicksLastUpdated}
        statTypeFilters={statTypeFilters} 
        lineTypeFilters={lineTypeFilters} 
        handleStatTypeFilterChange={handleStatTypeFilterChange}
        handleLineTypeFilterChange={handleLineTypeFilterChange}
      />
    </Fragment>
  );
}