import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/privateRoute"
import Listing from "./pages/Listing"
import UpdateListing from "./pages/UpdateListing"
import ListingDisplay from "./pages/ListingDisplay"


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/listing/:listId" element={<ListingDisplay/>} />
        <Route element={<PrivateRoute/>} >
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create-list" element={<Listing/>} />
          <Route path="/update-listing/:listId" element={<UpdateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
