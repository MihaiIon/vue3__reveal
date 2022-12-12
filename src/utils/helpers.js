export const getWindowHeight = () => {
  let windowHeight = window.innerHeight
  windowHeight = windowHeight || document.documentElement.clientHeight
  windowHeight = windowHeight || document.body.clientHeight

  return windowHeight
}

export const getWindowWidth = () => {
  let windowWidth = window.innerWidth
  windowWidth = windowWidth || document.documentElement.clientWidth
  windowWidth = windowWidth || document.body.clientWidth

  return windowWidth
}
