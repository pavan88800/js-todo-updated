let input = document.getElementById('todo')
let button = document.getElementById('AddTodo')
let container = document.getElementById('container')
button.addEventListener('click', () => AddTodo())

let Todo = JSON.parse(localStorage.getItem('todo')) || []

function AddTodo () {
  let randomId = Math.floor(Math.random() * 1000)
  let value = input.value
  if (value !== '') {
    Todo.push({
      id: randomId,
      text: value
    })
    window.location.reload()
  }
  input.value = ''
  localStorage.setItem('todo', JSON.stringify(Todo))
  console.log(Todo)
}
document.addEventListener('DOMContentLoaded', getTodo())

function getTodo () {
  let Fragment = document.createDocumentFragment()
  Todo.forEach(el => {
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
    span.appendChild(btn)
    p.appendChild(span)
    Fragment.appendChild(p)
  })
  container.appendChild(Fragment)
}

container.addEventListener('click', e => removeTodo(e))
container.addEventListener('click', e => update(e))

function removeTodo (e) {
  let { id } = e.target.dataset
  console.log(e.target)
  if (e.target.classList.contains('deleteSpan')) {
    Todo = Todo.filter(el => el.id.toString() !== id)
    localStorage.setItem('todo', JSON.stringify(Todo))
    e.target.parentElement.remove()
  }
  console.log(Todo)
}

function update (e) {
  let { id } = e.target.dataset
  let ele = Todo.find(el => el.id.toString() === id)
  input.value = ele.text

  if (e.target.classList.contains('edit-todo')) {
    Todo = Todo.filter(el => el.id !== ele.id)
    localStorage.setItem('todo', JSON.stringify(Todo))
    e.target.parentElement.parentElement.remove()
  }
  for (let update of Todo) {
    console.log(update.id === ele.id)
    if (update.id === ele.id) {
      update.text = input.value
    }
  }
  localStorage.setItem('todo', JSON.stringify(Todo))
}
