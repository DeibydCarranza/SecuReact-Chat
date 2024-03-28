import io from 'socket.io-client'
const socketClient  = io('/')
export function App(){
  return(
    <>
      <h1>Secure Message Protocol</h1>
    </>
  )
}