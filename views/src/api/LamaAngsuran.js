import { func } from "prop-types";
import axios from "../components/axiosApi.jsx"
import baseUrl from "../components/baseUrl.jsx";

export async function fetchDatas({queryKey}) {
  const [_, currentPage, onSearch, tokenLogin, setCurrentPage] = queryKey
  let url = `${baseUrl}/lamaangsuran?page=${currentPage}&perpage=${10}`;
    if (onSearch) {
      setCurrentPage(1);
      url += `&search=${onSearch}`;
    }
    const {data:res} = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      }
    })
    return res.data
}

export async function createData({newData, token}) {
  const res = await axios.post(`${baseUrl}/lamaangsuran`,JSON.stringify(newData),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function updateData({Data, token, id}) {
  const res = await axios.put(`${baseUrl}/lamaangsuran/${id}`,JSON.stringify(Data),{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function deleteData({id, token}) {
  const res = await axios.delete(`${baseUrl}/lamaangsuran/${id}`,{},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}
