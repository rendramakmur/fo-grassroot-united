import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    "userId": null,
    "userType": null,
    "userNumber": null,
    "email": null,
    "firstName": null,
    "lastName": null,
    "emailStatus": null,
    "issuedAt": null,
    "expiredAt": null
  },
  isLogin: false,
  accessToken: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  }
})

export const { setUser, setIsLogin, setAccessToken } = authSlice.actions
export default authSlice.reducer