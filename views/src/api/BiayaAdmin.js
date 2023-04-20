import axiosApi from "../components/axiosApi"
import baseUrl from "../components/baseUrl"

export const getBiayaAdmin = async ({queryKey}) => {
  const [_, id, token] = queryKey
  const res = await axiosApi.get(`${import.meta.env.VITE_BACKEND_API}/biayaadmin/${id}`,{},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function updateData({Data, token, id}) {
  const res = await axiosApi.put(`${baseUrl}/biayaadmin/${id}`,JSON.stringify(Data),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
