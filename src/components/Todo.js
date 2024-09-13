import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import './Todo.scss';

export default function Todo() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const { currentUser } = useAuth();
    const userEmail = currentUser.email;

    // Fetch todos from the backend
    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await axios.get(`${apiUrl}/todos/${currentUser.uid}`);
                setTodos(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        }
        fetchTodos();
    }, [currentUser]);

    // Add a new todo
    const handleAddTodo = async () => {
        const response = await axios.post(apiUrl, {
            userId: currentUser.uid,
            title: newTodo,
        });
        setTodos([...todos, response.data]);
        setNewTodo('');
    };

    // Toggle complete status of a todo (mark as active or completed)
    const handleToggleComplete = async (id, completed) => {
        const response = await axios.patch(`${apiUrl}/todos/${id}`, {
            completed: !completed,
        });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    };

    // Delete a todo
    const handleDeleteTodo = async id => {
        await axios.delete(`${apiUrl}/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    console.log("*-*-*", todos);

    // Filter the todos into active and completed sections
    const activeTodos = todos.filter(todo => !todo.completed);
    console.log("activeTodos", activeTodos);

    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <div className="todo-container container">
            <header className="todo-header">
                <div>
                    <h1>Your Todos</h1>
                    <span className='email'>{userEmail}</span>
                </div>
                <LogoutButton />
            </header>

            {/* Input for adding new todos */}
            <div className="todo-input-container">
                <input
                    className="todo-input"
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="New Todo"
                />
                <button
                    className="todo-add-button"
                    onClick={handleAddTodo}
                    disabled={!newTodo.trim()}
                >
                    Add
                </button>
            </div>

            {/* Active Todos List */}
            <h2 className='header'>Active Todos</h2>
            <ul className="todo-list">
                {activeTodos.map(todo => (
                    <li key={todo._id} className="todo-item">
                        <span
                            onClick={() => handleToggleComplete(todo._id, todo.completed)}
                            className="todo-title"
                        >
                            {todo.title}
                        </span>
                        <div className='btn-wrapper'>
                            <button
                                className="todo-complete-button btn btn-success"
                                onClick={() => handleToggleComplete(todo._id, todo.completed)}
                            >
                                Done
                            </button>
                            <button
                                className="todo-delete-button btn btn-warning"
                                onClick={() => handleDeleteTodo(todo._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Completed Todos Section */}
            {completedTodos.length > 0 && (
                <>
                    <h2 className='header'>Completed Todos</h2>
                    <ul className="todo-list">
                        {completedTodos.map(todo => (
                            <li key={todo._id} className="todo-item">
                                <span className="todo-title completed">
                                    {todo.title}
                                </span>
                                <div className='btn-wrapper'>
                                    <button
                                        className="todo-active-button btn btn-primary"
                                        onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                    >
                                        Not Done
                                    </button>
                                    <button
                                        className="todo-delete-button btn btn-warning"
                                        onClick={() => handleDeleteTodo(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}