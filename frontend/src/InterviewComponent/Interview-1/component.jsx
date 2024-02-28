import React, { useEffect, useRef, useState } from "react";
import "./component.css";

const ExpenseTracker = () => {
  const [expense, setExpense] = useState({
    name: "",
    cost: "",
  });
  const [data, setData] = useState([]);
  const { name, cost } = expense;
  const [totalCost, setTotalCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...data];
    newData.push(expense);
    setData(newData);
  };

  const handlechange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setExpense({ ...expense, [key]: value });
  };

  useEffect(() => {
    const result = data.reduce((acc, item) => {
      return parseInt(item.cost) + acc;
    }, 0);
    setTotalCost(result);
  }, [data]);

  return (
    <div className="container">
      <h1>ExpenseTracker</h1>
      <form onSubmit={handleSubmit}>
        <label>Expense name: </label>
        <input
          type="text"
          name="name"
          placeholder="expense"
          value={name}
          onChange={(e) => handlechange(e)}
        />
        <label>Expense Cost: </label>
        <input
          type="number"
          placeholder="cost"
          value={cost}
          onChange={(e) => handlechange(e)}
          name="cost"
        />
        <button type="submit">Add Expense</button>
      </form>
      {data.length >= 1 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>SR.No.</th>
                <th>Expense Name</th>
                <th>Expense Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ name, cost }, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>Total Cost : {totalCost}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ExpenseTracker;
