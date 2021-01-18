import React, { useState,useEffect } from 'react';
import './App.css';

import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setfilteredTodos] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setfilteredTodos(todos.filter(todo => todo.completed === true));
        break; 
      case "uncompleted":
        setfilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') == null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      var todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
        setfilteredTodos={setfilteredTodos} />
      <TodoList 
        filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos} />
    </div>
  );
}

export default App;
