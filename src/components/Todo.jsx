import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  settodoFilter,
  searchTodo,
  clearError,
} from "../slices/todoSlice";

function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const { todos, status, filter, searchTerm, error } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      storedTodos.forEach((todo) => dispatch(addTodo(todo.text)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(settodoFilter(newFilter));
  };

  const handleSearch = (e) => {
    dispatch(searchTodo(e.target.value));
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="todo-container">
      <h1>To Do List</h1>

      {error && (
        <div className="error-message" onClick={() => dispatch(clearError())}>
          {error} <span className="dismiss">&times;</span>
        </div>
      )}

      <input
        type="text"
        placeholder="Search todo..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>

        <button
          onClick={() => handleFilterChange("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>

        <button
          onClick={() => handleFilterChange("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Adding..." : "Add Todo"}
        </button>
      </form>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
