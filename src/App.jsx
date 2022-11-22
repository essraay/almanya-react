import { useRoutes } from 'react-router-dom'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/style.scss'
import './assets/css/app.css'
import './assets/css/icons.min.css'


export default function App() {
  return useRoutes(routes)
}
