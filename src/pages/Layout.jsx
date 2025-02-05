import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

function Layout() {
  return (
    <>
        <Navbar/> {/* The navbar is the shared UI across all the pages */}
        <Outlet/> {/* The actual page which will be rendered along with the navbar */}
    </>
  )
}

export default Layout