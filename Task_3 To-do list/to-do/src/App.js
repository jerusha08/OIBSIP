import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";

function App() {
  const[isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTodo,setNewTodo]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completedTodos,setCompletedTodos]=useState([]);
   const handleAddToDo=()=>{
    let newTodoItem={
      title: newTodo,
      description: newDescription,
    }
    let newTodoArr=[...allTodos];
    newTodoArr.push(newTodoItem);
    setTodos(newTodoArr);
    localStorage.setItem('todolist',JSON.stringify(newTodoArr))
   };
   const handleDelete=index=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
   }
   const handleCheck=index=>{
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let hours = now.getHours ();
    let min = now.getMinutes ();
    let s = now.getSeconds ();
    let lastDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hours + ':' + min+ ':' + s;

      let filteredItem={
        ...allTodos[index],
        lastDate:lastDate,
      }
      let updateCompletedArr=[...completedTodos];
      updateCompletedArr.push(filteredItem);
      setCompletedTodos(updateCompletedArr);
      handleDelete(index);
      localStorage.setItem('completedTodos',JSON.stringify(updateCompletedArr))
   }
   const handleDeleteCompleted=index=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
   }
   useEffect(()=>{
  let storedTodo=JSON.parse(localStorage.getItem('todolist'));
  let storedCompleted=JSON.parse(localStorage.getItem('completedTodos'));
  if(storedTodo){
    setTodos(storedTodo);
    }
  if(storedCompleted){
    setCompletedTodos(storedCompleted);
  }

   },[])
  return (
    <div className="App">
      <h1>TaskPlanner</h1>
      <p><i>Streamline Your Day, Master Your Tasks!!</i></p>
      <div className="todo-wrap">
        <div className="todo-input">
          <div className="input-item">
            <label>Title</label>
            <input type="text" value={newTodo}
              onChange={e => setNewTodo (e.target.value)} placeholder="Add a task here..."/>
          </div>
          <div className="input-item">
            <label>Description</label>
            <input type="text"  value={newDescription}
              onChange={e => setNewDescription(e.target.value)}placeholder="Write it's description"/>
          </div>
          <div className='input-item'>
         <button type='button' onClick={handleAddToDo}className='primaryBtn'>ADD</button>
        </div>
        </div>
    <div className="btn-types">
        <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}>Pending</button>
        <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}>Completed</button>
            
      </div>
      <div className='pending-list'>
{isCompleteScreen===false&&allTodos.map((item,index)=>{
  return(
    <div className='pending-list-item' key={index}>
    <div>
    <h3>{item.title}</h3>
    <h4>{item.description}</h4>
    </div>
    <div>
    
      <RiDeleteBin2Line className='icon' onClick={()=>handleDelete(index)}title="Delete"/>
      <FaRegCircleCheck className='check-icon' onClick={()=>handleCheck(index)} title="completed"/>
    </div>
  </div>
  )
})}
{isCompleteScreen===true&&completedTodos.map((item,index)=>{
  return(
    <div className='pending-list-item' key={index}>
    <div>
    <h3>{item.title}</h3>
    <h4>{item.description}</h4>
    <h4><i>Completed at: {item.lastDate}</i></h4>
    </div>
    <div>
    
      <RiDeleteBin2Line className='icon' onClick={()=>handleDeleteCompleted(index)}title="Delete"/>
      
    </div>
  </div>
  )
})}
      </div>
    </div>
    </div>
  );
}

export default App;
