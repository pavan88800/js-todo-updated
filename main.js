import { suggestionAPI } from './utiles.js'

const inputBox = document.getElementById('suggestionText')
const suggestionBox = document.querySelector('.suggestionWrapper')

const { getState, setState } = (() => {
  let state = { data: [] }

  const getState = () => {
    return state.data
  }

  const setState = updatedData => {
    state = { data: updatedData }
  }

  return {
    getState,
    setState
  }
})()
const resetState = () => {
  suggestionBox.classList.remove('suggestion-visible')
  setState([])
}

const renderDropItem = () => {
  const state = getState()
  let suggestionFragment = document.createDocumentFragment()
  state.forEach(el => {
    const divEl = document.createElement('div')
    divEl.innerHTML = el
    divEl.classList.add('dropdown-item')
    suggestionFragment.appendChild(divEl)
  })
  suggestionBox.innerHTML = ''
  suggestionBox.appendChild(suggestionFragment)
}

const handleSearches = async keyword => {
  let result = await suggestionAPI(keyword)

  if (result.length) {
    suggestionBox.classList.add('suggestion-visible')
    setState(result)
    renderDropItem()
  }
}

const handleInputChange = ({ target }) => {
  const value = target.value.trim()
  if (value) {
    handleSearches(value)
  } else {
    resetState()
  }
}

;(() => {
  inputBox.addEventListener('input', handleInputChange)
})()
