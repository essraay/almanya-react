import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

const MainLayout = () => {
  return (
    <>
      <div
        className="d-flex flex-column min-vh-100"
        style={{ backgroundColor: '#DDDDDD' }}
      >
        <Header />
        <div className="flex flex-grow-1">
          <div className="flex-shrink-0">
            <Navbar />
          </div>
          <div className="flex-1 pr-8 pt-12">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default MainLayout
