import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";

const App = () => {
  const [data, setDdata] = useState([]);

  const [renderData, setRenderData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [numberArr, setNumberArr] = useState([]);
  const [currentBtnIndex, setCurrentBtnIndex] = useState(1);

  const options = [5, 10, 15];

  let setPaginationIndexCount = (data) => {
    let paginationIndexLimit = 1;
    if (data.length % rowsPerPage === 0) {
      paginationIndexLimit = data.length / rowsPerPage;
    } else {
      paginationIndexLimit = data.length / rowsPerPage + 1;
    }
    let tempData = data.slice(0, 10);
    let tempArr = [];
    for (let i = 1; i <= paginationIndexLimit; i++) {
      tempArr.push(i);
    }
    setRenderData(tempData);
    setNumberArr(tempArr);
  };
  let getData = async () => {
    let todoData = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setDdata(todoData.data);
    setPaginationIndexCount(todoData.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // to reset the pagination buttons and the data according to rowsPerPage
  useEffect(() => {
    setPaginationIndexCount(data);
    handleCLick(currentBtnIndex);
  }, [rowsPerPage]);

  let handleCLick = (btnIndex) => {
    let start = rowsPerPage * (btnIndex - 1);
    let end = rowsPerPage * btnIndex;

    let tempData = [];
    tempData = data.slice(start, end);
    setRenderData(tempData);
    setCurrentBtnIndex(btnIndex);
  };

  let decrement = () => {
    if (currentBtnIndex === 1) return;
    handleCLick(currentBtnIndex - 1);
    setCurrentBtnIndex(currentBtnIndex - 1);
  };

  let increment = () => {
    console.log("increment");
    handleCLick(currentBtnIndex + 1);
    setCurrentBtnIndex(currentBtnIndex + 1);
  };

  const onOptionChangeHandler = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    console.log("User Selected Value - ", typeof event.target.value);
  };

  return (
    <div className="App">
      <Pagination />
      {renderData.length > 0 &&
        renderData.map((elem) => <p key={elem.id}>{elem.title}</p>)}
      <div className="pagination-index-container">
        <i className="bi bi-arrow-left-square" onClick={() => decrement()}></i>
        {numberArr.map((btn) => (
          <button key={btn} onClick={() => handleCLick(btn)}>
            {btn}
          </button>
        ))}
        <i className="bi bi-arrow-right-square" onClick={() => increment()}></i>
        <select onChange={onOptionChangeHandler}>
          <option>Please choose one option</option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default App;
