import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function onAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="App">
      <Logo />
      <Form onAddItem={onAddItem} />
      <PackingList items={items} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>Travel List My Practice</h1>
    </div>
  );
}

function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { quantity, description, packed: false, id: Date.now() };
    onAddItem(newItem);
    setDescription(""); // Clear the input field after submission
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");
  //
  //
  //
  //

  return (
    <div className="list">
      <h3>Packing List</h3>
      <ul>
        {items.map((item) => (
          <Item item={item} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        {/* <button onClick={onClearItem}>Clear list</button> */}
      </div>
    </div>
  );
}

function Item({ item, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      {item.quantity} x
      <span className={item.packed === true ? "packed" : ""}>
        {item.description}
      </span>
    </li>
  );
}

function Stats() {}

export default App;
