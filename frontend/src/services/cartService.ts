import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCart(token: string) {
  const res = await axios.get(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateCartQuantity(token: string, id: string, quantity: number) {
  const res = await axios.patch(
    `${API_URL}/cart/${id}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function removeCartItem(token: string, id: string) {
  const res = await axios.delete(`${API_URL}/cart/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
