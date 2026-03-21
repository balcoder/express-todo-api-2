const listUl = document.querySelector(".list");
const input = document.querySelector("#todoInput");
const url = "/api/todos/";

/**
 * Event Listeners
 */

// Handle keyboard input
input.addEventListener("keydown", ({ key, target }) => {
  // grab the key and target fromt the event obj
  if (key === "Enter" && target.value.trim()) {
    createTodo(target.value.trim());
    target.value = ""; // Clear input immediately for better UX
  }
});

// listen for clicks on parent UL
listUl.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  const id = li.dataset.id;
  // delete todo if clicking the span and update DOM
  if (e.target.tagName === "SPAN") {
    await removeTodo(id);
    li.remove();
  }
  // toggle status on todo and update db
  else if (e.target.tagName === "LI") {
    const isCompleted = li.classList.contains("done");
    await updateTodo(id, !isCompleted);
    li.classList.toggle("done");
  }
});

/**
 * API
 */

const getTodos = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const todos = await response.json();
    todos.forEach(addTodoToDOM);
    // addTodos(todos);
  } catch (error) {
    console.error(error.message);
  }
};

const createTodo = async (name) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Could not create todo");

    const newTodo = await response.json();
    addTodoToDOM(newTodo);
  } catch (err) {
    console.error(err.message);
  }
};

// Toggle completion status on the database
const updateTodo = async (id, completed) => {
  try {
    const response = await fetch(`${url}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) throw new Error("Update failed");
    console.log(`Todo ${id} updated`);
  } catch (err) {
    console.error(err.message);
  }
};

// Delete todo from the server

const removeTodo = async (id) => {
  try {
    const response = await fetch(`${url}${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Delete failed");
    console.log(`Todo ${id} deleted.`);
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * UI Helpers
 */

const addTodoToDOM = ({ _id, name, completed }) => {
  const li = document.createElement("li");
  li.classList.add("task");
  if (completed) li.classList.add("done");

  li.dataset.id = _id;
  // use textContent instead of html for XSS
  li.textContent = name;

  const span = document.createElement("span");
  span.className = "deleteX";
  span.textContent = "X";

  li.append(span);
  listUl.append(li);
};

// initial render
getTodos();
