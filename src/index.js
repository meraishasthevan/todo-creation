import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TodoProvider } from "./TodoContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoProvider>
  <App />
 </TodoProvider>
);

reportWebVitals();
