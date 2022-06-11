import { Fragment } from "react";

export default function Table(props){
  const {model, data, label} = props;
  let modelFiltered = [];
  let dataFiltered = [];

  for (const object of model) {
    if (object.hasOwnProperty('displayName')){
      modelFiltered.push({columnName: object.displayName});
    } else {
      modelFiltered.push({columnName: object.columnName});
    }
  };

  for (const row of data) {
    let dataDict = {}
    for (const object of model){
      if (object.hasOwnProperty('attributes')){
        if (object.attributes.indexOf('dateTime') !== -1){
          const key = object.columnName;
          const options = {dateStyle:"medium",timeStyle:"short"}
          const value = new Date(row[object.columnName]).toLocaleString("en-US", {options});
          dataDict[key] = value;
        } else {
          const key = object.columnName;
          const value = row[object.columnName];
          dataDict[key] = value;
        } 
      } else {
        const key = object.columnName;
        const value = row[object.columnName];
        dataDict[key] = value;
      }
    }
    dataFiltered.push(dataDict);
  }

  return(
    <Fragment>
      <label>{label}</label>
      <table className="table table-sm table-hover">
        <thead>
            <tr>
              {modelFiltered.map((object, index) => (
                <th key={index} scope="col small">{object.columnName}</th>
                ))}
            </tr>
        </thead>
        <tbody>
          {dataFiltered.map((row, index) => (
            <tr key={index}>
              {model.map((object, index2) => (
                <td key={index2} className="small">{row[object.columnName]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}