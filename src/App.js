import React, { useContext } from "react";
import TodoContext from "./TodoContext";
import "./style.css";

export default function App() {
  const {
    input,
    setInput,
    handleAdd,
    handleDelete,
    handleEdit,
    handleSave,
    handleCompletion,
    handleFilterChange,
    filteredTasks,
    editIndex,
    filter,
  } = useContext(TodoContext);

  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <h1>TODO CREATION</h1>
      </header>

      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        style={{ height: '25px', width: '50%', color: 'orange', padding: '4px' }}
        value={input}
      />
      {editIndex !== null ? (
        <button onClick={handleSave} style={{ backgroundColor: 'orange', padding: '14px' , marginLeft:'10px' }}>Save</button>
      ) : (
        <button onClick={handleAdd} style={{ backgroundColor: 'orange', padding: '14px' , marginLeft:'10px' }}>Add</button>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => handleFilterChange('All')} style={{ marginRight: '1rem', backgroundColor: filter === 'All' ? 'orange' : '' }}>All</button>
        <button onClick={() => handleFilterChange('Completed')} style={{ marginRight: '1rem', backgroundColor: filter === 'Completed' ? 'orange' : '' }}>Completed</button>
        <button onClick={() => handleFilterChange('Incomplete')} style={{ backgroundColor: filter === 'Incomplete' ? 'orange' : '' }}>Incomplete</button>
      </div>

      {filteredTasks.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              style={{ padding: '1em', borderBottom: '1.5px solid orange', textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompletion(index)}
                style={{ marginRight: '10px' }}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                  style={{ width: '10em' }}
                />
              ) : (
                <span>{task.text}</span>
              )}
              {editIndex !== index && (
                <>
                  <span
                    style={{ cursor: task.completed ? 'not-allowed' : 'pointer', marginLeft: '6px', float: 'right' }}
                    onClick={() => {
                      if (!task.completed) {
                        handleEdit(index);
                      }
                    }}
                  >✏</span>
                  <span
                    style={{ cursor: 'pointer', marginLeft: '6px', float: 'right' }}
                    onClick={() => handleDelete(index)}
                  >❌</span>
                  {!task.completed && (
                    <span
                      style={{ cursor: 'pointer', marginLeft: '6px', float: 'right' }}
                      onClick={() => handleCompletion(index)}
                    >✅</span>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2 style={{ color: 'grey', marginTop: '8rem', lineHeight: '2.5rem' }}>
             Empty Todo List....
          </h2>
        </div>
      )}
    </div>
  );
}
