const listUl = document.querySelector(".list");
const input = document.querySelector("#todoInput");
const url = "/api/todos/";

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createTodo(input.value);
  }
});

// listen for click on parent UL then target the span or li
listUl.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    let li = e.target.closest("li");
    removeTodo(li.dataset.id);
    li.remove();
  } else if (e.target.tagName === "LI") {
    let li = e.target.closest("li");
    updateTodo(li.dataset.id);
    li.classList.toggle("done");
  }
});

async function getTodos() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const todos = await response.json();
    addTodos(todos);
  } catch (error) {
    console.error(error.message);
  }
}

async function getTodo(id) {
  try {
    const response = await fetch(url + id);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const todo = await response.json();
    return todo;
  } catch (error) {
    console.error(error.message);
  }
}

function addTodos(todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.className = "deleteX";
  span.innerHTML = "X";

  li.innerHTML = todo.name;
  li.dataset.id = todo._id;
  li.append(span);

  !todo.completed ? (li.className = "task") : (li.className = "task done");
  listUl.append(li);
  input.value = "";
}

async function createTodo(todoStr) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: todoStr }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const todoJson = await response.json();
    addTodo(todoJson);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeTodo(todoStr) {
  try {
    let deleteUrl = url + todoStr;
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // wait for the json response
    const responseJson = await response.json();
    console.log(`Todo id:${responseJson._id} was deleted from the database`);
  } catch (error) {
    console.error(error.message);
  }
}

async function updateTodo(todoStr) {
  try {
    let todo = await getTodo(todoStr);
    let updateUrl = url + todoStr;
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // wait for the json response
    const responseJson = await response.json();
    console.log(`Todo id:${responseJson._id} was updated`);
  } catch (error) {
    console.error(error.message);
  }
}

getTodos();
