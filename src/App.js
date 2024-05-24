import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux"
import { store, persistor } from './store'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from "redux-persist/integration/react"
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="mx-auto md:max-w-md h-screen w-screen">
          <Router>
            <Navbar />
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App;
