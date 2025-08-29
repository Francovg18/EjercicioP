import axios from "axios";

const API = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => (await axios.get(`${API}/posts`)).data;
export const getUsers = async () => (await axios.get(`${API}/users`)).data;
export const getPostById = async (id) => (await axios.get(`${API}/posts/${id}`)).data;
export const getCommentsByPost = async (postId) =>
  (await axios.get(`${API}/posts/${postId}/comments`)).data;
