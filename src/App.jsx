import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
    let todos = JSON.parse(localStorage.getItem("todos")) 
    setTodos(todos);
    }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
        let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }
  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-5 rounded-xl p-3 sm:p-5 bg-violet-100 min-h-[80vh] max-w-2xl">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled :bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input onChange= {toggleFinished} type="checkbox" checked = {showFinished} /> show finished
        <div className = 'h-[1px] bg-black opacity-15 my-2'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length === 0 && <div className='text-center text-gray-500'>No todos added yet!</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex flex-col sm:flex-row w-full items-start sm:items-center my-3 p-2 bg-white rounded-md shadow-md">
                <div className="flex items-center gap-2 flex-1 min-w-0 w-full">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={`${item.isCompleted ? "line-through" : ""} break-words w-0 flex-1 min-w-0`}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex flex-row gap-x-1 mt-2 sm:mt-0 sm:ml-2">
                  <button onClick={e => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md'><FaEdit /></button>
                  <button onClick={e => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md'><AiFillDelete /></button>
                </div>
              </div>
            )
          ))}
        </div>
    </div>
    </>
  )
}
export default App
