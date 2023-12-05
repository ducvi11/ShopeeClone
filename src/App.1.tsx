import UseRouteElements from './useRouteElements.tsx'
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
