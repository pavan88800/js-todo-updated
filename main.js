let input = document.getElementById('todo')
let button = document.getElementById('AddTodo')
let container = document.getElementById('container')
input.focus()
let Todo
function getStore () {
  if (localStorage.getItem('todo') !== null) {
    Todo = JSON.parse(localStorage.getItem('todo'))
  } else {
    Todo = []
  }
}

//Adding Todo
function AddTodo (e) {
  e.preventDefault()
  let randomId = Math.floor(Math.random() * 1000)
  let value = input.value
  if (value !== '') {
    Todo.push({
      id: randomId,
      text: value,
      isDone: false
    })
    renderTodo()
  }
  input.value = ''
  localStorage.setItem('todo', JSON.stringify(Todo))
}
button.addEventListener('click', e => AddTodo(e))
document.addEventListener('DOMContentLoaded', getStore())
document.body.addEventListener('onload', renderTodo())
document.body.addEventListener('onload', TodoCompletedUI())

let completed = document.getElementById('completed')

//Rendering Todo
function renderTodo (e) {
  container.innerHTML = ''
  Todo.forEach(el => {
    if (el.isDone !== true) {
      TodoListUI(el)
    }
  })
}
function TodoListUI (el) {
  const p = document.createElement('p')
  p.innerHTML = el.text
  const span = document.createElement('span')
  span.innerHTML = 'X'
  span.className = 'deleteSpan'
  span.setAttribute('data-id', el.id)
  span.style = 'margin-left:50px; cursor:pointer'
  const btn = document.createElement('button')
  btn.innerHTML = 'Edit'
  btn.style = 'margin-left:50px; cursor:pointer'
  btn.setAttribute('data-id', el.id)
  btn.className = 'edit-todo'
  btn.onclick = e => update(e)
  const btnComplete = document.createElement('button')
  btnComplete.innerHTML = 'completed'
  btnComplete.id = 'completed'
  btnComplete.setAttribute('data-id', el.id)
  btnComplete.onclick = e => isCompleted(e)
  p.appendChild(span)
  p.appendChild(btn)
  p.appendChild(btnComplete)
  container.appendChild(p)
}

container.addEventListener('click', e => removeTodo(e))
document
  .getElementById('containerCompleted')
  .addEventListener('click', e => removeTodo(e))

//removing Todo
function removeTodo (e) {
  let { id } = e.target.dataset
  if (e.target.classList.contains('deleteSpan')) {
    Todo = Todo.filter(el => el.id.toString() !== id)
    localStorage.setItem('todo', JSON.stringify(Todo))
    e.target.closest('p').remove()
  }
}

//mutating state
function isCompleted (e) {
  let { id } = e.target.dataset
  if (e.target.id === 'completed') {
    Todo = Todo.map(el => {
      if (el.id.toString() === id) {
        return {
          ...el,
          isDone: !el.isDone
        }
      }
      return el
    })
  }
  localStorage.setItem('todo', JSON.stringify(Todo))
  if (e.target.id === 'completed') {
    window.location.reload()
  }
}

function TodoCompletedUI () {
  let newTodo = Todo.filter(el => el.isDone !== false)
  newTodo.forEach(el => {
    if (el.isDone !== false) {
      CompletedUIList(el)
    }
  })
  renderTodo()
}

//Completed UI LIST
function CompletedUIList (el) {
  let ls = document.getElementById('containerCompleted')
  const p = document.createElement('p')
  p.innerHTML = el.text
  const span = document.createElement('span')
  span.innerHTML = 'X'
  span.className = 'deleteSpan'
  span.setAttribute('data-id', el.id)
  span.style = 'margin-left:50px; cursor:pointer'
  const btn = document.createElement('button')
  btn.innerHTML = 'Edit'
  btn.style = 'margin-left:50px; cursor:pointer'
  btn.setAttribute('data-id', el.id)
  btn.className = 'edit-todo'
  btn.onclick = e => update(e)
  const btnComplete = document.createElement('button')
  btnComplete.innerHTML = 'completed'
  btnComplete.id = 'completed'
  btnComplete.setAttribute('data-id', el.id)
  btnComplete.onclick = e => isCompleted(e)
  p.appendChild(span)
  p.appendChild(btn)
  p.appendChild(btnComplete)
  ls.appendChild(p)
}

//update Todo
function update (e) {
  let { id } = e.target.dataset

  let ele = Todo.find(el => el.id.toString() === id)

  if (ele.text) {
    input.value = ele.text
  }

  if (e.target.classList.contains('edit-todo')) {
    Todo = Todo.filter(el => el.id !== ele.id)
    localStorage.setItem('todo', JSON.stringify(Todo))
    e.target.closest('p').remove()
  }
  for (let update of Todo) {
    console.log(update.id === ele.id)
    if (update.id === ele.id) {
      update.text = input.value
    }
  }
  localStorage.setItem('todo', JSON.stringify(Todo))
}

let search = document.querySelector('#search')

// search Todo by text
search.addEventListener('input', function () {
  let filterTodo = Todo.filter(el =>
    el.text.toLowerCase().includes(search.value.toLowerCase())
  )
  Todo = filterTodo
  renderTodo()
  getStore()
})
