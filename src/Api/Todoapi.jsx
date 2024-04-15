import React, { useState, createContext, useEffect } from "react";
import Form from "../Component/NormalApp/Form";

const Context = createContext("No Data Available Here.");
const getValueLocalStorage = () => {
  let val = localStorage.getItem("item");
  // console.log(typeof val);
  if (val !== "") {
    // ! JSON.parse derived from an array, the method  that convert JSON string into javascript object.
    let vals = JSON.parse(localStorage.getItem("item")); // '[]' ==> []
    // console.log(vals);
    return vals;
  } else {
    return [];
  }
};
// console.log(getValueLocalStorage());
const Todoapi = (props) => {
  const [todo, setTodo] = useState(getValueLocalStorage());

  // !==========================================handleForm=====================================================================================================================
  // todo setData in Your app
  const handleForm = (e) => {
    //! console.log(e.target[0].value);
    //! console.log(e.target[0].value.length);
    e.preventDefault();
    let date = new Date();
    // ?console.log(date.toLocaleTimeString());
    const time = date.toLocaleTimeString();
    const dates = date.toDateString();
    const val = e.target[0].value;
    if (e.target[0].value.length !== 0) {
      setTodo([
        ...todo,
        {
          list: val,
          createListTime: time,
          currentDate: dates,
        },
      ]);
    }
    e.target[0].value = "";
  };
  // !========================================handleDelete=======================================================================================================================
  const handleDelete = (index) => {
    const filterData = todo.filter((val, inds) => {
      return inds !== index;
    });
    setTodo(filterData);
  };

  // !=======================================handleEdit========================================================================================================================

  const handleEdit = (ind, items) => {
    const updateValue = prompt("Edit Your Data On specific text ", items);
    // console.log(updateValue);// if->>>>click cancle then return null
    let date = new Date();
    // ?console.log(date.toLocaleTimeString());
    const times = date.toLocaleTimeString();
    const datess = date.toDateString();
    if (updateValue !== null) {
      const editValue = todo.map((value, index) =>
        // console.log(value)
        index === ind
          ? {
              ...value,
              list: updateValue,
              createListTime: times,
              currentDate: datess,
            }
          : value
      );
      setTodo(editValue);
    }
  };
  // !=======================================localStorage to set data========================================================================================================================

  // ? ====================store inside Local storage=====================================================
  //! useEffect use to store data in localStorage
  //! locaStorage take two value key/value
  //! JSON.stringify use to convert value into a Json string or javascript object because localStorage store data in string format
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(todo)); //store like {item:'[]'}
  }, [todo]);

  // !=======================================handleClearAll========================================================================================================================

  const handleClearAll = () => {
    if (confirm("😯 Really, You Want To Clear All Data .")) {
      localStorage.clear();
      setTodo([]);
    }
  };
  //! =================================================================

  return (
    <Context.Provider
      value={{
        name: "todo",
        handleForm,
        todo,
        handleDelete,
        handleEdit,
        handleClearAll,
      }}
    >
      {props.children}
      <Form />
    </Context.Provider>
  );
};
export default Todoapi;
export { Context };
