let input = document.getElementById("todo");
let button = document.getElementById("AddTodo");
let container = document.getElementById("container");
let ls = document.getElementById("containerCompleted");
(() => input.focus())();

let Todo;

const storageKey = "todo";

const getTodo = () => {
  console.log(localStorage.getItem(storageKey));
  return JSON.parse(localStorage.getItem(storageKey)) || [];
};

const setTodo = (arr) => {
  localStorage.setItem(storageKey, JSON.stringify(arr));
};
if (
  document.readyState === "complete" ||
  document.readyState === "loaded" ||
  document.readyState === "interactive"
) {
  renderAllTodo();
} else {
  document.addEventListener("DOMContentLoaded", renderAllTodo);
}

//Adding Todo
function AddTodo(e) {
  e.preventDefault();
  let randomId = Math.floor(Math.random() * 1000);
  let value = input.value;
  if (value === "") return;
  const objUser = {
    id: randomId,
    text: value,
    isDone: false,
  };
  const todos = getTodo();
  todos.push(objUser);
  renderTodo(objUser);
  input.value = "";
  setTodo(todos);
}

function renderAllTodo() {
  getTodo().forEach((el) => {
    renderTodo(el);
  });
}
button.addEventListener("click", (e) => AddTodo(e));

let completed = document.getElementById("completed");
//Rendering Todo
function renderTodo(obj) {
  TodoListUI(obj);
}

function TodoListUI(el) {
  let fragement = document.createDocumentFragment();
  const p = document.createElement("p");
  p.id = "todo_" + el.id;
  p.innerHTML = el.text;
  const span = document.createElement("span");
  span.innerHTML = "X";
  span.className = "deleteSpan";
  span.setAttribute("data-id", el.id);
  span.style = "margin-left:50px; cursor:pointer";
  span.onclick = (e) => removeTodo(e);
  const btn = document.createElement("button");
  btn.innerHTML = "Edit";
  btn.style = "margin-left:50px; cursor:pointer";
  btn.setAttribute("data-id", el.id);
  btn.className = "edit-todo";
  btn.onclick = (e) => update(e);
  const btnComplete = document.createElement("button");
  btnComplete.innerHTML = "completed";
  btnComplete.id = "completed";
  btnComplete.setAttribute("data-id", el.id);
  btnComplete.onclick = (e) => isCompleted(e);
  p.appendChild(span);
  p.appendChild(btn);
  p.appendChild(btnComplete);
  fragement.appendChild(p);
  if (el.isDone !== true) {
    container.appendChild(fragement);
  } else {
    ls.appendChild(fragement);
  }
}
document
  .getElementById("containerCompleted")
  .addEventListener("click", (e) => removeTodo(e));

//removing Todo
function removeTodo(e) {
  let { id } = e.target.dataset;
  if (e.target.classList.contains("deleteSpan")) {
    const todos = getTodo().filter((el) => el.id.toString() !== id);
    setTodo(todos);
    e.target.closest("p").remove();
  }
}

//mutating state
function isCompleted(e) {
  let { id } = e.target.dataset;
  if (e.target.id === "completed") {
    const todos = getTodo().map((el) => {
      if (el.id.toString() === id) {
        return {
          ...el,
          isDone: !el.isDone,
        };
      }
      return el;
    });
    setTodo(todos);
    reBucketTodos();
  }
}

//update Todo
let edit = document.getElementById("editTodoValue");
let currentUser = {};

function update(e) {
  document.getElementById("editContainer").style = "display:block";
  let { id } = e.target.dataset;
  let ele = getTodo().find((el) => el.id.toString() === id);
  edit.value = ele.text;
  currentUser = ele;
}

function EditTodo() {
  if (event.target.id === "EditButton") {
    let todos = getTodo().map((el) => {
      if (el.id === currentUser.id) {
        return {
          ...el,
          text: edit.value,
        };
      }
      return el;
    });
    setTodo(todos);
    document.getElementById("editContainer").style = "display:none";
    todos.forEach((el) => {
      const domNode = getDomNode(el.id);
      domNode.parentNode.removeChild(domNode);
      renderTodo(el);
    });
  }
}
document
  .getElementById("EditButton")
  .addEventListener("click", () => EditTodo());

let search = document.querySelector("#search");

// search Todo by text
search.addEventListener("input", function () {
  getTodo().forEach((el) => {
    const isVisible = el.text
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const domNode = getDomNode(el.id);
    domNode.style.display = isVisible ? "block" : "none";
  });
});

const getDomNode = (id) => {
  return document.getElementById("todo_" + id);
};

const reBucketTodos = () => {
  const todos = getTodo();
  todos.forEach((item) => {
    const domNode = getDomNode(item.id);
    domNode.parentNode.removeChild(domNode);
    if (!item.isDone) {
      container.appendChild(domNode);
    } else {
      ls.appendChild(domNode);
    }
  });
};
