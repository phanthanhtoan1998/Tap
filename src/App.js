import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [values, setValues] = useState([[]]);
  
  const [totalScore, setTotalScore] = useState(360);

  const [checkMajors, setCheckMajors] = useState([{name:"s" ,listMajors: [1, 2,],TotalMajors:160},
  {name:"l",listMajors: [3, 4],TotalMajors:160}]);
  const [numberStudent, setnumberStudent] = useState();


  const handleNameChange = (index, value) => {
    const newMajors = [...checkMajors];
    newMajors[index].name = value;
    setCheckMajors(newMajors);
  };
  const handleTatolMajorsChange = (index, value) => {
    const newMajors = [...checkMajors];
    newMajors[index].TotalMajors = value;
    setCheckMajors(newMajors);
  };

  const handleListMajorsChange = (index, value) => {
    const newMajors = [...checkMajors];
    newMajors[index].listMajors = value.split(",").map(item => Number(item.trim()));
    setCheckMajors(newMajors);
  };

  const addMajor = () => {
    setCheckMajors([...checkMajors, { name: '', listMajors: [] }]);
  };
  

  const handleMajorsSubmit = (e) => {
    e.preventDefault();
    console.log("checkMajors",checkMajors);
    // Do something with majors
  };

  const handleRowsChange = (event) => {
    const newRows = parseInt(event.target.value);
    setRows(newRows);
      //
      setValues(newRows>rows?[...values, ...new Array(newRows - values.length).fill([])]:values.slice(0, newRows));
      console.log("values:",rows);
  }

  const handleColsChange = (event) => {
    const newCols = parseInt(event.target.value);
    setCols(newCols);
    //
    const newValues =newCols>cols? values.map((row) => [...row, ...new Array(newCols - row.length).fill('')]): values.map(row => row.slice(0, newCols));
    setValues(newValues);
  }

  const handleValueChange = (event, row, col) => {
    const newValues = [...values];
    newValues[row][col] = event.target.value;
    setValues(newValues);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const inputFields = [];
// for theo dòng theo cột của bảng 
  for (let i = 0; i < rows; i++) {

    const rowValues = [];

    for (let j = 0; j < cols; j++) {
      const value = values[i]?.[j] || '';
      rowValues.push(
        <input type="text" key={j} value={value} onChange={(event) => handleValueChange(event, i, j)} />
      );
    }
        inputFields.push(
      <div key={i}>
        {rowValues}
      </div>
    );
  }
const checkStudent=(event)=>{
 var count=0;
  for (let index = 0; index < values.length; index++) {
 var totalCheckMajors=0;
    const majorsValue=values[index].slice(0,1)
    // shift cắt phần tử đầu tiên của mảng 
    const element = values[index].slice(1).reduce(( accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0);
    if(element>totalScore){
      checkMajors.forEach(majors => {
        if(majors.name==majorsValue)
        {
         majors.listMajors.forEach(m => {
          //tại vì đã dùng shift bên trên nên values lúc này sẽ mất phần tử đầu tiên 
         totalCheckMajors+=parseInt( values[index][m])
         });
         console.log("majors.TotalMajors:",majors.TotalMajors);
         if(totalCheckMajors>majors.TotalMajors)
         {
          console.log("totalCheckMajors:"+totalCheckMajors )
          count++;
          console.log("count:"+count );
         }
        }
       });
     console.log("values:"+values );
    }
   
   
  }
  setnumberStudent(count)
  console.log("count:"+count );

}
const updateTotalScore=(event)=>{
  setTotalScore(event.target.value)
  console.log(totalScore);
}




const removeMajors =(event)=>{
  setCheckMajors([{name:"",listMajors:[]}])
}
  
  return (
 
    <div style={{color: "red"}}>
   <form onSubmit={handleSubmit}>
      <label>
         rows:
        <input type="number" value={rows} onChange={handleRowsChange} />
      </label>
      <label>
         columns:
        <input type="number" value={cols} onChange={handleColsChange} />
      </label>
      {inputFields}
      <button type="submit" onClick={checkStudent}>Submit</button>
    </form>

    <label>
          totalScore:
        <input type="number" value={totalScore} onChange={updateTotalScore} />
      </label>
    
      <form onSubmit={handleMajorsSubmit}>
      {checkMajors.map((major, index) => (
        <div key={index}>
          <label>
            Name:
            <input type="text" value={major.name} onChange={(e) => handleNameChange(index, e.target.value)} />
          </label>
          <label>
            List Majors:
            <input type="text" value={major.listMajors} onChange={(e) => handleListMajorsChange(index, e.target.value)} />
          </label>
          <label>
            Total Majors:
            <input type="text" value={major.TotalMajors} onChange={(e) => handleTatolMajorsChange(index, e.target.value)} />
          </label>
        </div>
        
      ))}
      <button type="button" onClick={addMajor}>Add Majors</button>
      {/* <button type="submit">Submit</button> */}
      <button type="button" onClick={removeMajors}>reset Majors</button>
    </form>

    <div>
      <td  type="number" >{numberStudent}
      </td>
    </div>
    </div>
  );
}

export default App;
