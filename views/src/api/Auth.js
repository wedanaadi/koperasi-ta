import axios from "../components/axiosApi";

export const apiLogin = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/login`,data)
  return res.data
}

export const apiLogout = async (token) => {
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/logout`,{},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
