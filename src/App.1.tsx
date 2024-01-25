import UseRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'

export function App() {
  const routeElements = UseRouteElements()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}
