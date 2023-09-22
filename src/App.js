import { useState } from "react";

export default function App() {
  const [listItems, setListItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState("fcfs");

  let sortedItems;
  if (sortBy === "fcfs") sortedItems = listItems;

  if (sortBy === "completed")
    sortedItems = listItems
      .slice()
      .sort((a, b) => Number(b.status) - Number(a.status));
  if (sortBy === "incomplete")
    sortedItems = listItems
      .slice()
      .sort((a, b) => Number(a.status) - Number(b.status));
  function handleShowForm() {
    setShowAddForm((show) => !show);
  }

  function handleToggleItem(id) {
    setListItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  }

  function handleDelete(id) {
    console.log("deleted");
    setListItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="container">
      <h1>TODO LIST</h1>

      <Controls
        onHandleShowForm={handleShowForm}
        sortBy={sortBy}
        onHandleSort={setSortBy}
      />

      <ul>
        {sortedItems.length === 0 ? (
          <p className="no-item">No Items</p>
        ) : (
          sortedItems.map((item) => (
            <ToDoItem
              item={item}
              key={item.time}
              handleToggleItem={handleToggleItem}
              handleDelete={handleDelete}
            />
          ))
        )}
      </ul>

      {showAddForm && (
        <AddForm setListItems={setListItems} setShowAddForm={setShowAddForm} />
      )}
    </div>
  );
}

function Controls({ onHandleShowForm, onHandleSort, sortBy }) {
  return (
    <div className="buttons">
      <button onClick={onHandleShowForm}>Add New</button>
      <select value={sortBy} onChange={(e) => onHandleSort(e.target.value)}>
        <option value="fcfs">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
}

function ToDoItem({ item, handleToggleItem, handleDelete }) {
  return (
    <li>
      {!item.status && (
        <input
          type="checkbox"
          value={item.status}
          onChange={() => handleToggleItem(item.id)}
        />
      )}
      {item.status && (
        <input
          type="checkbox"
          checked
          value={item.status}
          onChange={() => handleToggleItem(item.id)}
        />
      )}
      <p style={item.status ? { textDecoration: "line-through" } : {}}>
        {item.title} {item.time}
      </p>
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </li>
  );
}

function AddForm({ setListItems, setShowAddForm }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  function handleOnSubmit(e) {
    e.preventDefault();

    const time =
      new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
    const id = Math.floor(Math.random() * 99999 + 1);
    console.log(id);
    if (!title) return;
    const newItem = {
      title,
      status,
      time,
      id,
    };
    setListItems((items) => [...items, newItem]);
    setShowAddForm(false);
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Add ToDo</h2>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={false}>Incomplete</option>
        <option value={true}>Completed</option>
      </select>
      <div className="addForm-button">
        <button>Add</button>
        <button onClick={() => setShowAddForm(false)}>Close</button>
      </div>
    </form>
  );
}
