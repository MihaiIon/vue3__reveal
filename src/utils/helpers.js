export const getClientWidth = () => {
  let clientWidth = window.innerWidth
  clientWidth = clientWidth || document.documentElement.clientWidth
  clientWidth = clientWidth || document.body.clientWidth

  return clientWidth
}
