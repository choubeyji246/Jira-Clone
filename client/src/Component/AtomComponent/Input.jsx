import React from "react";

const Input = (props) => {
  const { type, id, name, value, changeEvent}= props;
  return (
    <>
      <input
        style={{marginLeft:"20px"}}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => changeEvent(e)}
      />
    </>
  );
};

export default Input;
