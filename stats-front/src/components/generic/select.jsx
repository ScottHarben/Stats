export default function Select(props){
  const {selectItems, selected, label, selectId, classes, handleValueChange} = props;

  function handleChange(e) {
    if (handleValueChange !== undefined){
      handleValueChange(e.target.value);
    }
  }

  return(
    <div className="mt-3 form-group">
      <label htmlFor={selectId}>{label}</label>
      <select className={classes} id={selectId} onChange={handleChange}>
        {selectItems.map((item) => (
          <option key={item.Value} value={item.Value} selected={item.Value === selected}>{item.Text}</option>
        ))}
      </select>
    </div>
  );
}