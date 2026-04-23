import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/todos";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const loadTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) return;

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
    }

    setTitle("");
    setDescription("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTodos();
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>TODO APP</h2>

        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />

        <input
          style={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />

        <button style={styles.mainBtn} onClick={handleSubmit}>
          {editId ? "UPDATE" : "ADD"}
        </button>

        <div style={styles.list}>
          {todos.map((todo) => (
            <div key={todo._id} style={styles.todo}>
              <div style={{ flex: 1 }}>
                <div style={styles.todoTitle}>{todo.title}</div>
                <div style={styles.todoDesc}>{todo.description}</div>
              </div>

              <div>
                <button style={styles.smallBtn} onClick={() => editTodo(todo)}>
                  Edit
                </button>
                <button
                  style={styles.smallBtn}
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    width: "380px",
    padding: "25px",
    border: "2px solid #000",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#000",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #000",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#fff",
  },
  mainBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  list: {
    marginTop: "10px",
    textAlign: "left",
  },
  todo: {
    borderTop: "1px solid #000",
    padding: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoTitle: {
    fontWeight: "bold",
    color: "#000",
  },
  todoDesc: {
    fontSize: "14px",
    color: "#333",
  },
  smallBtn: {
    marginLeft: "5px",
    padding: "5px 8px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default TodoApp;