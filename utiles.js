import { LIST } from './data.js'

export function suggestionAPI (suggestion) {
  const results = LIST.filter(
    el =>
      el.slice(0, suggestion.length).toLowerCase() === suggestion.toLowerCase()
  )

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(results)
    }, 500)
  })
}
