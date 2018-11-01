function login() {
  const token = document.getElementById('token-input').value
  if (window.iosocket) {
    window.iosocket.close()
  }
  const socket = window.iosocket = createWs()

  socket.emit('hello', { token })
  addHistory(true, 'hello', { token })
}

function createWs() {
  const socket = io.connect('ws://localhost:3001', {
    transports: ['websocket']
  })
  wsCb(socket)
  return socket
}

function wsCb(socket) {
  const evs = ['hi', 'new-chat-res', 'pull-message', 'server-received', 'forbidden', 'invalid-param','token-missing']
  evs.forEach(i => {
    socket.on(i, data => {
      addHistory(false, i, data)
    })
  })
}

function emit() {
  const ev = document.getElementById('event-input').value
  let data = document.getElementById('data-input').value
  data = JSON.parse(data)
  window.iosocket.emit(ev, data)
  addHistory(true, ev, JSON.stringify(data))
}

function addHistory(out, ev, msg) {
  const historyEle = document.getElementById('history')
  if (typeof msg !== 'string') {
    msg = JSON.stringify(msg)
  }
  const node = document.createElement('div')
  node.innerText = `${out?'Send':'Recv'}[${ev}]: ${msg}`
  node.style.textAlign = out ? 'right' : 'left'
  node.style.borderTop = 'solid #CCC 1px'
  historyEle.appendChild(node)
}
