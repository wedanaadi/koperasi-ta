import axios from "../components/axiosApi"
import baseUrl from "../components/baseUrl"

export async function listSelectJenisSimpanan({queryKey}) {
  const [_, token] = queryKey
  const res = await axios.get(`${baseUrl}/jenisSimpananForSelect`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function createData({newData, token}) {
  const res = await axios.post(`${baseUrl}/jenissimpanan`,JSON.stringify(newData),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function updateData({Data, token, id}) {
  const res = await axios.put(`${baseUrl}/jenissimpanan/${id}`,JSON.stringify(Data),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function deleteData({id, token}) {
  const res = await axios.delete(`${baseUrl}/jenissimpanan/${id}`,{},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
