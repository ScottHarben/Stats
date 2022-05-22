export default function Select(props){
  const {selectItems, label, selectId, classes, handleValueChange} = props;

  function handleChange(e) {
    handleValueChange(e.target.value);
  }

  return(
    <div className="mt-3 form-group">
      <label htmlFor={selectId}>{label}</label>
      <select className={classes} id={selectId} onChange={handleChange}>
        {selectItems.map((item) => (
          <option key={item.Value} value={item.Value}>{item.Text}</option>
        ))}
      </select>
    </div>
  );
}