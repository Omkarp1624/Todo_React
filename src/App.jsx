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
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 rounded-xl p-4 sm:p-8 bg-violet-100 min-h-[80vh] max-w-2xl shadow-lg">
        <h1 className='font-bold text-center text-2xl mb-6 text-violet-900'>iTask - Manage your todos at one place</h1>
        <div className="addTodo mb-8 flex flex-col gap-3 bg-white p-4 rounded-lg shadow">
          <h2 className='text-lg font-bold text-violet-800'>Add a Todo</h2>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your todo..."
              className='flex-1 rounded-lg px-4 py-2 border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400'
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-400 px-5 py-2 text-sm font-bold text-white rounded-md transition'
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="mr-2 accent-violet-700"
            id="showFinished"
          />
          <label htmlFor="showFinished" className="text-violet-900 font-medium">Show finished</label>
        </div>
        <div className='h-[1px] bg-violet-300 opacity-50 mb-4'></div>
        <h2 className='text-lg font-bold text-violet-800 mb-3'>Your Todos</h2>
        <div className="todos flex flex-col gap-4">
          {todos.length === 0 && (
            <div className='text-center text-gray-400'>No todos added yet!</div>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex flex-col sm:flex-row w-full items-start sm:items-center bg-white p-3 rounded-lg shadow transition"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="accent-violet-700"
                  />
                  <div className={`${item.isCompleted ? "line-through text-gray-400" : "text-violet-900"} break-words flex-1 min-w-0 text-base`}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex flex-row gap-2 mt-3 sm:mt-0 sm:ml-4">
                  <button
                    onClick={e => handleEdit(e, item.id)}
                    className='bg-violet-700 hover:bg-violet-900 p-2 text-lg text-white rounded-md transition'
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={e => handleDelete(e, item.id)}
                    className='bg-red-600 hover:bg-red-800 p-2 text-lg text-white rounded-md transition'
                    title="Delete"
                  >
                    <AiFillDelete />
                  </button>
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
