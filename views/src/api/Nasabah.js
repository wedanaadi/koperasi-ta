import axios from "../components/axiosApi";
import baseUrl from "../components/baseUrl";

export async function listSelectNasabah({ queryKey }) {
  const [_, token] = queryKey;
  const res = await axios.get(`${baseUrl}/nasabahForSelect`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export const findNasabah = async ({ idNasabah, token }) => {
  const res = await axios.get(`${baseUrl}/findNasabah/${idNasabah}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export async function createData({ newData, token }) {
  const res = await axios.post(`${baseUrl}/nasabah`, JSON.stringify(newData), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateData({ Data, token, id }) {
  const res = await axios.put(
    `${baseUrl}/nasabah/${id}`,
    JSON.stringify(Data),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteData({ id, token }) {
  const res = await axios.delete(
    `${baseUrl}/nasabah/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
