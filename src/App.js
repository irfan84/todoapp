import React, {useState} from 'react';
import './App.css';

const Todo = ({ todo, index, completedTodo, incompletedTodo, deleteTodo }) => {
  return (
    <div>
    <ul>
      <div>
        { todo.isCompleted ? (<li onClick={() => incompletedTodo(index)}
      style={{ textDecoration: "line-through" }}>{todo.text}</li>) 
      : 
      (<li onClick={() => completedTodo(index)}
      style={{ textDecoration: "" }}>{todo.text}</li>)}
      <button onClick={() => deleteTodo(index)}>Delete</button>
      </div>
      </ul>

    </div>
  );
}

const TodoInfo = ({ todos }) => {

  return (
    <div>
    <h3>{todos.filter(todo => 
    todo.isCompleted === true).length} Todos Completed from {todos.length} Todos</h3>  
    </div>
  );
}

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form>
      <input type="text" value={value}
      onChange={e => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}


const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completedTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const incompletedTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (
    <div className="app">
      <section className="container">
      <TodoForm addTodo={addTodo} />
      <TodoInfo todos={todos}/>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completedTodo={completedTodo}
            incompletedTodo={incompletedTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </section>
    </div>
  );
}
export default App;
