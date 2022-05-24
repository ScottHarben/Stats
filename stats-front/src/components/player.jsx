import React, { useState, useEffect } from "react";
import authHeader from "./functions/authHeader";

export default function Player({axios}){
  const [playerUnassignedList, setPlayerUnassignedList] = useState([]);
  const [pgaPlayerList, setPGAPlayerList] = useState([]);
  const [prizePicksPlayer, setPrizePicksPlayer] = useState({});
  const [pgaPlayer, setPGAPlayer] = useState({});
  const [clearPlayerSearchFields, setClearPlayerSearchFields] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const unassignedResult = await axios.get("/api/player/getunassigned", { params: {wildcard: ''}});
        const pgaPlayerResult = await axios.get("/api/player/getpgaplayers", { params: {wildcard: ''}});
        setPlayerUnassignedList(unassignedResult.data);
        setPGAPlayerList(pgaPlayerResult.data);
      } catch (error) {
        //handleError(error);
      }
    })();
  }, [axios]);

  async function getUnassignedSearch(e) {
    try {
      const wildcard = e.target.value;
      const prizePicksresults = await axios.get("/api/player/getunassigned", { params: {wildcard: wildcard}});
      setPlayerUnassignedList(prizePicksresults.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPGAPlayerSearch(e) {
    try {
      const wildcard = e.target.value;
      const pgaPlayerResult = await axios.get("/api/player/getpgaplayers", { params: {wildcard: wildcard}});
      setPGAPlayerList(pgaPlayerResult.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addUnassignedPlayer(prizePicksPlayerId, name) {
    try {
      setPrizePicksPlayer({PrizePicksPlayerId: prizePicksPlayerId, Name: name})
    } catch (error) {
      console.error(error);
    }
  }

  async function addPGAPlayer(playerId, firstName, lastName) {
    try {
      setPGAPlayer({PlayerId: playerId, FirstName: firstName, LastName: lastName})
    } catch (error) {
      console.error(error);
    }
  }

  async function assignPlayer(playerId, prizePicksPlayerId) {
    try {
      const assignResult = await axios.post("/api/player/assignplayer", 
        { params: {PlayerId: playerId, PrizePicksPlayerId: prizePicksPlayerId}}, 
        { headers: authHeader() }
      );
      if (assignResult.status === 200){
        const unassignedResult = await axios.get("/api/player/getunassigned", { params: {wildcard: ''}});
        const pgaPlayerResult = await axios.get("/api/player/getpgaplayers", { params: {wildcard: ''}});
        setPrizePicksPlayer({});
        setPGAPlayer({});
        setPlayerUnassignedList(unassignedResult.data);
        setPGAPlayerList(pgaPlayerResult.data);
        setClearPlayerSearchFields(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const playerCount = playerUnassignedList.length;
  const showingCount = playerUnassignedList.length > 5 ? 5 : playerUnassignedList.length;
  const showingText = playerUnassignedList.length === 0 ? '' : `Showing ${showingCount} of ${playerCount} results`;

  const uaPlayerCount = pgaPlayerList.length;
  const uaPhowingCount = pgaPlayerList.length > 5 ? 5 : pgaPlayerList.length;
  const uaShowingText = pgaPlayerList.length === 0 ? '' : `Showing ${uaPhowingCount} of ${uaPlayerCount} results`;

  return(
    <div className="mt-3 row w-auto">
      <div className="col-lg-4 mb-5">
        <div className="form-group">
          <label htmlFor="playerSearch">Unassigned Players</label>
          <input type="text" className="form-control" id="playerSearch" placeholder="Enter player" onChange={getUnassignedSearch} />
          <small id="playerSearchHelp" className="form-text text-muted">Start typing to select a player.</small>          
        </div>
        <ul className="list-group mt-3">
          {playerUnassignedList.slice(0,5).map((player) => (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>{player.Name}</span>
              <span><button className="btn btn-primary btn-sm" onClick={() => addUnassignedPlayer(player.PrizePicksPlayerId, player.Name)}>Select</button></span>
            </li>
          ))}
        </ul>
        <small id="playerSearchListHelp" className="form-text text-muted">{showingText}</small> 
      </div>
      <div className="col-lg-4 mb-5">
        <div className="form-group">
          <label htmlFor="playerSearch">PGA Players</label>
          <input type="text" className="form-control" id="playerSearch" placeholder="Enter player" onChange={getPGAPlayerSearch} />
          <small id="playerSearchHelp" className="form-text text-muted">Start typing to select a player.</small>          
        </div>
        <ul className="list-group mt-3">
          {pgaPlayerList.slice(0,5).map((player) => (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>{player.FirstName} {player.LastName}</span>
              <span><button className="btn btn-primary btn-sm" onClick={() => addPGAPlayer(player.PlayerId, player.FirstName, player.LastName)}>Select</button></span>
            </li>
          ))}
        </ul>
        <small id="playerSearchListHelp" className="form-text text-muted">{uaShowingText}</small> 
      </div>
      <div className="col-lg-4 mb-5">
        <div className="card">
          <div className="card-body">
            <p>Prize Picks: <span>{prizePicksPlayer.Name}</span></p>
            <p>PGA Tour: <span>{pgaPlayer.FirstName} {pgaPlayer.LastName}</span></p>
            <button href="#" className="btn btn-primary" onClick={() => assignPlayer(pgaPlayer.PlayerId, prizePicksPlayer.PrizePicksPlayerId)}>Submit</button>
          </div>
        </div> 
      </div>
    </div>
  );
}
