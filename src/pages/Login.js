import { useState } from "react"
import fetchData from "../helpers/fetchData"
import raiseToast from "../helpers/raiseToast"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setIsLogin, setAccessToken, setUser } from "../store/atuhSlice"
import { Link } from "react-router-dom"

export default function Login() {
  const loginInitialState = {
    email: '',
    password: ''
  }
  const navigate = useNavigate()
  const [formData, setFormData] = useState(loginInitialState)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestBody = {
      email: formData.email,
      password: formData.password
    }

    try {
      setIsLoading(true)
      const response = await fetchData('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      raiseToast('success', 'Login success')
      localStorage.setItem('accessToken', response?.data?.token)
      localStorage.setItem('loggedInUser', JSON.stringify(response?.data?.payload))
      setFormData(loginInitialState)

      dispatch(setUser(response?.data?.payload))
      dispatch(setAccessToken(response?.data?.token))
      dispatch(setIsLogin(true))

      setIsLoading(false)
      navigate('/')
    } catch (error) {
      setIsLoading(false)
      if (error.error && typeof error.error === 'object') {
        Object?.values(error.error).map((errors, fieldName) => (
            errors.map((errorMessage, index) => (
              raiseToast('error', errorMessage)
            ))
        ))
      } else if (error.error) {
        raiseToast('error', error.error)
      } else {
        raiseToast('error', 'An error occurred. Please try again later.')
      }
    }
  }

  return (
    <section>
      <div className="">
        <div className="flex flex-col items-center px-6 py-8 mx-auto h-screen">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 py-10">
              <p>Logo</p>
              {/* <Image src="/logo-img.png" width={100} height={100} alt="grassroot united fc logo" priority="true"></Image> */}
            </Link>
            <div className="px-10 space-y-4 w-full">
                <h1 className="text-2xl font-black leading-tight tracking-tight text-gray-900">
                    Sign in
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="player@mail.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                    </div> */}
                    <button type="submit" className="w-full text-white bg-black font-medium tracking-wider rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    <p className="text-sm font-light text-gray-500">
                        Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}