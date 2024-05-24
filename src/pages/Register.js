import LoadingPage from "../components/LoadingPage";
import fetchData from "../helpers/fetchData";
import raiseToast from "../helpers/raiseToast";
import { useNavigate } from "react-router"
import { useEffect, useState } from "react";
import DateField from "../components/DateField";

export default function Register({ occupation, gender }) {
  const registerInitialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobilePrefix: '',
    mobileNumber: '',
    occupation: '',
    dateOfBirth: '',
    gender: '',
    city: ''
  }
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(registerInitialState)
  const [formattedDate, setFormattedDate] = useState('')
  const [cityList, setCityList] = useState([
    {
      id: 154,
      name: 'Jakarta Selatan'
    },
    {
      id: 155,
      name: 'Jakarta Timur'
    },
    {
      id: 156,
      name: 'Jakarta Pusat'
    },
    {
      id: 157,
      name: 'Jakarta Barat'
    },
    {
      id: 158,
      name: 'Jakarta Utara'
    },
    {
      id: 181,
      name: 'Kota Bekasi'
    },
    {
      id: 182,
      name: 'Kota Depok'
    },
    {
      id: 177,
      name: 'Kota Bogor'
    },
    {
      id: 159,
      name: 'Kab. Bogor'
    },
    {
      id: 271,
      name: 'Kota Tangerang Selatan'
    },
    {
      id: 268,
      name: 'Kota Tangerang'
    },
    {
      id: 266,
      name: 'Kab. Tangerang'
    }
  ])
  const [occupationList, setOccupationList] = useState([])
  const [genderList, setGenderList] = useState([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const occupationResponse = await fetchData('/api/masterdata/mr_occupation', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
    
        const genderResponse = await fetchData('/api/masterdata/mr_gender', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
    
        setOccupationList(occupationResponse?.data)
        setGenderList(genderResponse?.data)
      } catch (error) {
        console.log('An error has occured:', error)
        raiseToast('error', 'An error occurred. Please try again later.')
      }
    }

    fetchOptions()
  }, [])

  useEffect(() => {
    setFormData({ ...formData, dateOfBirth: formattedDate})
  }, [occupation, gender, formattedDate])

  const handleDateChange = (date) => {
    setFormattedDate(date)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      mobilePrefix: {
        id: 1,
        name: null
      },
      mobileNumber: formData.mobileNumber,
      occupation: {
        id: parseInt(formData.occupation),
        name: null
      },
      dateOfBirth: formData.dateOfBirth,
      gender: {
        id: parseInt(formData.gender),
        name: null
      },
      city: {
        id: parseInt(formData.city),
        name: null
      }
    }

    try {
      setIsLoading(true)
      const response = await fetchData('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      raiseToast('success', 'Registration success, please check your email to verify the account.')
      setFormData(registerInitialState)
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
      } else {
        raiseToast('error', 'An error occurred. Please try again later.')
      }
    }
  }

  return (
    <section>
      <div className="pb-10 pt-5">
        { isLoading ? <LoadingPage /> : <></> }
        <div className="flex flex-col items-center px-6 py-8 mx-auto h-fit">
          <div className="p-6 space-y-4">
              <h1 className="text-2xl font-black leading-tight tracking-tight text-gray-900">
                  Register
              </h1>
              <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                    <input type="text" name="firstName" id="firstName" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="John" required="" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                    <input type="text" name="lastName" id="lastName" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="Doe" required="" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="player@mail.com" required="" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" required="" />
                    <p className="pt-1 text-xs">Password should contain a letter and a number.</p>
                  </div>
                  <div>
                    <label htmlFor="mobilePrefix" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <div className="flex space-x-3">
                      <select name="mobilePrefix" id="mobilePrefix" value={1} onChange={handleChange} className="bg-gray-50 border text-gray-900 rounded-lg text-center w-fit p-2">
                        <option value="1" disabled={true}>+62</option>
                      </select>
                      <input type="text" name="mobileNumber" id="mobileNumber" placeholder="81232131231" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 w-full" required="" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="occupation" className="block mb-2 text-sm font-medium text-gray-900">Occupation</label>
                    <select name="occupation" id="occupation" placeholder="Occupation" onChange={handleChange} className="bg-gray-50 w-full border text-gray-900 rounded-lg text-center p-2">
                      <optgroup label="Occupation">
                        <option value="" hidden>Occupation</option>
                        {
                          occupationList?.map((occupation) => (
                            <option key={occupation.id} value={occupation.id}>
                              {occupation.name}
                            </option>
                          ))
                        }
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
                    <div className="flex space-x-3">
                      <DateField onDateChange={handleDateChange} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                    <select name="gender" id="gender" onChange={handleChange} placeholder="Gender" className="bg-gray-50 w-full border text-gray-900 rounded-lg text-center p-2">
                      <optgroup label="Gender">
                        <option value=""  hidden>Gender</option>
                        {
                          genderList?.map((gender) => (
                            <option key={gender.id} value={gender.id}>
                              {gender.name}
                            </option>
                          ))
                        }
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                    <select name="city" id="city" placeholder="City" onChange={handleChange} className="bg-gray-50 w-full border text-gray-900 rounded-lg text-center p-2">
                      <optgroup label="City">
                        <option value="" hidden>City</option>
                        {
                          cityList?.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))
                        }
                      </optgroup>
                    </select>
                  </div>
                  <div className="pt-5">
                    <button type="submit" className="w-full text-white bg-black font-medium tracking-wider rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps() {
  try {
    const occupationResponse = await fetchData('/api/masterdata/mr_occupation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const genderResponse = await fetchData('/api/masterdata/mr_gender', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return {
      props: {
        occupation: occupationResponse.data,
        gender: genderResponse.data
      }
    }
  } catch (error) {
    console.error('Error:', error);

    return {
      props: {
        occupation: [],
        gender: []
      }
    }
  }
}