import API from './axios'

export const getAllPosts = () => API.get('/posts')
export const getPost = (id) => API.get(`/posts/${id}`)
export const createPost = (data) => API.post('/posts', data)
export const updatePost = (id, data) => API.put(`/posts/${id}`, data)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const addComment = (id, data) => API.post(`/posts/${id}/comments`, data)