import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api/axios.config'
import CookieServies from '../../../services/CookieServies'
import { createStandaloneToast } from '@chakra-ui/react'
const { toast } = createStandaloneToast()
const initialState = {

    loading: false,
    data: null,
    error: null
}

export const userLogin = createAsyncThunk("login/userLogin", async (user, thunkApi) => {
    const { rejectWhithValue } = thunkApi

    try {
        const { data } = await axiosInstance.post(`/api/auth/local`, user)
        return data
    } catch (error) {

        return rejectWhithValue(error)

    }
})

const loginSlice = createSlice({
    initialState,
    name: "login",
    reducers: {},
    extraReducers: {
        [userLogin.pending]: state => {
            state.loading = false
        },
        [userLogin.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
            const date = new Date()
            const IN_DAYS = 5
            const EXPIRE_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS
            date.setTime(date.getTime() + EXPIRE_IN_DAYS)
            const options = { path: "/", expires: date }
            CookieServies.set("jwt", action.payload.jwt, options)

            toast({
                title: 'Logged in successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setTimeout(() => {

            }, [3000])
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.payload
            toast({
                title: "Not Found password or yoyr Name",
                description: "We've created your account for you.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
})

export const selectLogin = ({ login }) => login
export default loginSlice.reducer