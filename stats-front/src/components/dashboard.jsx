import React, { useState, useEffect } from "react";
import Table from "./generic/table";

export default function Dashboard({axios}){
  const [txs, setTxs] = useState([]);
  const [bets, setBets] = useState([]);
  const [depositTotal, setDepositTotal] = useState(0);

  useEffect(() => {
    function sumProp(array, prop){
      return array.map(obj => (obj[prop])).reduce((total, num) => {return total + num});
    }

    (async function () {
      try {
        const txsResult = await axios.get("/api/account/gettransactions");
        const betsResult = await axios.get("/api/bets/getbets");
        const deposits = sumProp(txs, "Amount");
        setTxs(txsResult.data);
        setBets(betsResult.data);
        setDepositTotal(deposits);
      } catch (error) {
        //handleError(error);
      }
    })();
  }, [axios]);
  
  return(
    <div className="row mt-3">
      <div className="col-lg-3">
        <div className="card">
          <div className="card-body">

          </div>
        </div>
      </div>
    </div>
  );
}