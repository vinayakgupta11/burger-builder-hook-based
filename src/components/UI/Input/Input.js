import React from "react";
import Classes from "./Input.css";
const input = (props) => {
 // console.log(props);
  let inputElement = null;
  const inputClasses=[Classes.InputElement];
  if(props.invalid && props.shouldValidate && props.touched)
  inputClasses.push(Classes.Invalid);
  let validationError = null;
if (props.invalid && props.touched) {
validationError = <p className={Classes.ValidationError}>Please enter a valid {props.valueType}!</p>;
}
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={Classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select className={Classes.InputElement} value={props.value}  onChange={props.changed}>
          {props.elementConfig.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
             >
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={Classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={Classes.Input}>
      <label className={Classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};
export default input;
