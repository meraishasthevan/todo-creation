import React, { createContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [filter, setFilter] = useState('All'); 

  const handleAdd = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput(''); 
    }
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInput(tasks[index].text); 
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setTasks(tasks.map((task, i) => 
        i === editIndex ? { ...task, text: input } : task
      ));
      setInput(''); 
      setEditIndex(null);  
    }
  };

  const handleCompletion = (index) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true; 
  });

  return (
    <TodoContext.Provider
      value={{
        input,
        setInput,
        tasks,
        editIndex,
        handleAdd,
        handleDelete,
        handleEdit,
        handleSave,
        handleCompletion,
        handleFilterChange,
        filteredTasks,
        filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
