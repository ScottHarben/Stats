import { Fragment } from "react";

export default function Table(props){
  const {model, data, label} = props;
  let modelFiltered = [];
  let dataFiltered = [];

  model.map((object) => {
    if (object.hasOwnProperty('displayName')){
      modelFiltered.push({columnName: object.displayName});
    } else {
      modelFiltered.push({columnName: object.columnName});
    }
  })

  data.map((row) => {
    let dataDict = {}
    model.map((object) => {
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
    })
    dataFiltered.push(dataDict);
  })

  return(
    <Fragment>
      <label>{label}</label>
      <table className="table table-sm table-hover">
        <thead>
            <tr>
              {modelFiltered.map((object) => (
                <th scope="col">{object.columnName}</th>
                ))}
            </tr>
        </thead>
        <tbody>
          {dataFiltered.map((row) => (
            <tr>
              {model.map((object) => (
                <td>{row[object.columnName]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}