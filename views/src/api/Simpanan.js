import axiosApi from "../components/axiosApi"
import baseUrl from "../components/baseUrl"

export async function createData({newData, token}) {
  const res = await axiosApi.post(`${baseUrl}/simpanan`,JSON.stringify(newData),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function updateData({Data, token, id}) {
  const res = await axiosApi.put(`${baseUrl}/simpanan/${id}`,JSON.stringify(Data),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function deleteData({id, token, tipe}) {
  const res = await axiosApi.delete(`${baseUrl}/simpanan/${id}/${tipe}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
