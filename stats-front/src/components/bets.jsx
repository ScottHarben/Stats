import React, { useState, useEffect } from "react";
import authHeader from "./functions/authHeader";
import Select from "./generic/select";

export default function Bets({axios}){
  const [tournamentSelect, setTournamentSelect] = useState([]);
  const [yearSelect, setYearSelect] = useState([]);
  const [roundSelect, setRoundSelect] = useState([]);
  const [betNumberSelect, setBetNumberSelect] = useState([]);
  const [picksSelect, setPicksSelect] = useState([]);
  const [correctPicksSelect, setCorrectPicksSelect] = useState([]);
  const [wager, setWager] = useState(0.00);
  const [multiplier, setMultiplier] = useState(0.00);
  const [hitSelect, setHitSelect] = useState([]);
  const [reducedSelect, setReducedSelect] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const selectResult = await axios.get("/api/tournament/select");
        const yearNow = new Date().getFullYear();
        const yearNext = yearNow + 1;
        setTournamentSelect(selectResult.data);
        setYearSelect([{Value: yearNow, Text: yearNow}, {Value: yearNext, Text: yearNext}]);
        setRoundSelect([{Value: 1, Text: 1}, {Value: 2, Text: 2}, {Value: 3, Text: 3}, {Value: 4, Text: 4}]);
        setBetNumberSelect([{Value: 1, Text: 1}, {Value: 2, Text: 2}, {Value: 3, Text: 3}, {Value: 4, Text: 4}, {Value: 5, Text: 5}]);
        setPicksSelect([{Value: 2, Text: 2}, {Value: 3, Text: 3}, {Value: 4, Text: 4}, {Value: 5, Text: 5}]);
        setCorrectPicksSelect([{Value: 0, Text: 0}, {Value: 1, Text: 1}, {Value: 2, Text: 2}, {Value: 3, Text: 3}, {Value: 4, Text: 4}, {Value: 5, Text: 5}]);
        setHitSelect([{Value: 0, Text: "No"}, {Value: 1, Text: "Yes"}]);
        setReducedSelect([{Value: 0, Text: "No"}, {Value: 1, Text: "Yes"}]);
      } catch (error) {
        //handleError(error);
      }
    })();
  }, [axios]);

  function handleChange(e) {
    switch (e.target.name) {
      case "wager":
        setWager(e.target.value);
        break;
      case "multiplier":
        setMultiplier(e.target.value);
        break;
      default:
        break;
    }
  }

  async function addBet(e) {
    e.preventDefault();
    try {
      const permNum = e.target["permNum"].value;
      const year = e.target["year"].value;
      const round = e.target["round"].value;
      const betNumber = e.target["betNumber"].value;
      const picks = e.target["picks"].value;
      const correctPicks = e.target["correctPicks"].value;
      const wager = e.target["wager"].value;
      const multiplier = e.target["multiplier"].value;
      const hit = e.target["hit"].value;
      const reduced = e.target["reduced"].value;

      const addBetResult = await axios.post("/api/bets/addbet", 
        { params: {
            PermNum: permNum, 
            Year: year,
            Round: round,
            BetNumber: betNumber,
            Picks: picks,
            CorrectPicks: correctPicks,
            Wager: wager,
            Multiplier: multiplier,
            Hit: hit,
            Reduced: reduced
          }}, 
        { headers: authHeader() }
      );

      // if (assignResult.status === 200){
      //   const unassignedResult = await axios.get("/api/player/getunassigned", { params: {wildcard: ''}});
      //   const pgaPlayerResult = await axios.get("/api/player/getpgaplayers", { params: {wildcard: ''}});
      //   setPrizePicksPlayer({});
      //   setPGAPlayer({});
      //   setPlayerUnassignedList(unassignedResult.data);
      //   setPGAPlayerList(pgaPlayerResult.data);
      //   setClearPlayerSearchFields(true);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <div className="card w-100 mt-5 mx-auto login-card">
      <div className="card-body">
        <form onSubmit={addBet}>
          <Select selectItems={tournamentSelect} label="Tournament" selectId="permNum" classes="form-control" />
          <Select selectItems={yearSelect} label="Year" selectId="year" classes="form-control" />
          <Select selectItems={roundSelect} label="Round" selectId="round" classes="form-control" />
          <Select selectItems={betNumberSelect} label="Bet Number" selectId="betNumber" classes="form-control" />
          <Select selectItems={picksSelect} label="Picks" selectId="picks" classes="form-control" />
          <Select selectItems={correctPicksSelect} label="Correct Picks" selectId="correctPicks" classes="form-control" />
          <div className="mt-3 mb-3">
            <label htmlFor="inputWager" className="form-label">Wager</label>
            <input 
              type="number"
              step="0.01"
              className="form-control" 
              id="inputWager" 
              name="wager"
              value={wager}
              onChange={handleChange} 
            />
          </div>
          <div className="mt-3 mb-3">
            <label htmlFor="inputMultiplier" className="form-label">Multiplier</label>
            <input 
              type="number" 
              step="0.01"
              className="form-control" 
              id="inputMultiplier" 
              name="multiplier"
              value={multiplier}
              onChange={handleChange} 
            />
          </div>
          <Select selectItems={hitSelect} label="Hit" selectId="hit" classes="form-control" />
          <Select selectItems={reducedSelect} label="Reduced" selectId="reduced" classes="form-control" />
          <button type="submit" className="mt-3 btn btn-primary">
            Add Bet
          </button>
        </form>
      </div>
    </div> 
  );
}
