import React, { useState, useEffect } from "react";
import Table from "./generic/table";

export default function Log({axios}){
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const result = await axios.get("/api/logs");
        setLogs(result.data);
      } catch (error) {
        //handleError(error);
      }
    })();
  }, [axios]);

  const model = [
    {columnName: 'Process'},
    {columnName: 'Message'},
    {columnName: 'Injected', attributes: ['dateTime']}
  ]

  return(
    <Table model={model} data={logs} />
  );
}