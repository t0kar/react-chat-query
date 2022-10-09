import axios from 'axios';

const chatApi = axios.create({
  baseURL: 'https://ab8cc4db-44a5-4ab5-bb31-57c6bdfab351.mock.pstmn.io',
});

export const getMessages = async () => {
  const response = await chatApi.get('/chat');
  return response.data;
};

export const addMessage = async (message) => {
  return await chatApi.post('/chat', message);
};

export default chatApi;
