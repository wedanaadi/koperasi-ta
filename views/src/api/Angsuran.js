import axiosApi from "../components/axiosApi"
import baseUrl from "../components/baseUrl"

export async function getRincian({id, token}) {
  const res = await axiosApi.get(`${baseUrl}/angsuranprofil/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function createData({newData, token}) {
  const res = await axiosApi.post(`${baseUrl}/angsuran`,JSON.stringify(newData),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function updateData({Data, token, id}) {
  const res = await axiosApi.put(`${baseUrl}/angsuran/${id}`,JSON.stringify(Data),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function deleteData({id, token}) {
  const res = await axiosApi.delete(`${baseUrl}/angsuran/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
