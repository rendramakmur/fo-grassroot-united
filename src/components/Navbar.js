import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import raiseToast from "../helpers/raiseToast"
import { useSelector, useDispatch } from "react-redux"
import { setIsLogin, setAccessToken, setUser } from "../store/atuhSlice"
import { persistor } from "../store"

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const authData = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuClick = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    const userInitialState = {
      "userId": null,
      "userType": null,
      "userNumber": null,
      "email": null,
      "firstName": null,
      "lastName": null,
      "emailStatus": null,
      "issuedAt": null,
      "expiredAt": null
    }
    persistor.pause()
    persistor.flush().then(() => {
      return persistor.purge()
    })
    
    setIsOpen(false)
    dispatch(setIsLogin(false))
    dispatch(setAccessToken(null))
    dispatch(setUser(userInitialState))
    raiseToast('success', 'User logged out')
    navigate('/')
  }
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                  <img src="/logo-navbar.svg" width={50} height={50} alt="grassroot united fc logo" priority="true"></img>
                </Link>

                {/* Burger Icon */}
                <div className="block">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
                        {
                          isOpen ?
                          <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6"/>
                          </svg>
                          :
                          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                          </svg>
                        }
                    </button>
                </div>
            </div>

            {/* Dropdown Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'}`}>
                <ul className="text-gray-800">
                    {
                      authData?.isLogin ?
                      <>
                        <li className="py-2 text-center"><Link to="/" className="block px-4 py-2" onClick={handleMenuClick}>Home</Link></li>
                        <li className="py-2 text-center"><Link to={`/profile/${authData?.user?.userNumber}`} className="block px-4 py-2" onClick={handleMenuClick}>Profile</Link></li>
                        <li className="block px-4 py-4 text-center text-red-500" onClick={handleLogout}>Logout</li>
                      </>
                      :
                      <>
                        <li className="py-2 text-center"><Link to="/" className="block px-4 py-2" onClick={handleMenuClick}>Home</Link></li>
                        <li className="py-2 text-center"><Link to="/login" className="block px-4 py-2" onClick={handleMenuClick}>Sign in</Link></li>
                        <li className="py-2 text-center"><Link to="/register" className="block px-4 py-2" onClick={handleMenuClick}>Register</Link></li>
                      </>
                    }
                </ul>
            </div>
        </div>
    </nav>
  )
}