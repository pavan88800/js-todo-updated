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
// export function throttling (fn, delay) {
//   let isExecutable = true
//   return function () {
//     let args = arguments
//     if (isExecutable) {
//       fn.apply(this, args)
//       isExecutable = false
//       setTimeout(() => {
//         isExecutable = true
//       }, delay)
//     }
//   }
// }
