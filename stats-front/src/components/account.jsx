import React, { useState, useEffect } from "react";
import authHeader from "./functions/authHeader";
import Select from "./generic/select";

export default function Account({axios}){
  const [txSelect, setTxSelect] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    (async function () {
      try {
        setTxSelect([{Value: "D", Text: "Deposit"}, {Value: "W", Text: "Withdrawal"}, {Value: "C", Text: "Credit"}]);
      } catch (error) {
        //handleError(error);
      }
    })();
  }, [axios]);

  function handleChange(e) {
    switch (e.target.name) {
      case "amount":
        setAmount(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      default:
        break;
    }
  }

  async function addTransaction(e) {
    e.preventDefault();
    try {
      const transaction = e.target["transaction"].value;
      const amount = e.target["amount"].value;
      const date = e.target["date"].value;

      const addBetResult = await axios.post("/api/account/addtransaction", 
        { params: {
            Transaction: transaction, 
            Amount: amount,
            Date: date,
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
        <form onSubmit={addTransaction}>
          <Select selectItems={txSelect} label="Transaction" selectId="transaction" classes="form-control" />
          <div className="mt-3 mb-3">
            <label htmlFor="inputAmount" className="form-label">Amount</label>
            <input 
              type="number"
              step="0.01"
              className="form-control" 
              id="inputAmount" 
              name="amount"
              value={amount}
              onChange={handleChange} 
            />
          </div>
          <div className="mt-3 mb-3">
            <label htmlFor="inputDate" className="form-label">Date</label>
            <input 
              type="date"
              className="form-control" 
              id="inputDate" 
              name="date"
              value={date}
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="mt-3 btn btn-primary">
            Add Transaction
          </button>
        </form>
      </div>
    </div> 
  );
}
