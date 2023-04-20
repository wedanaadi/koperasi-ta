import axiosApi from "../components/axiosApi"
import baseUrl from "../components/baseUrl"

export async function getSetting({queryKey}) {
  const [_, token] = queryKey
  const res = await axiosApi.get(`${baseUrl}/setting`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function updateData({Data, token, id}) {
  const res = await axiosApi.put(`${baseUrl}/setting/${id}`,JSON.stringify(Data),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
