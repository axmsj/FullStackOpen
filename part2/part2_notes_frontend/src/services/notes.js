import axios from 'axios';
const baseURL = 'http://localhost:3001/notes';

const getAll = () => {
  const request = axios.get(baseURL);
  const nonExisting = {
    id: 1000,
    content: 'This note is not saved to the server',
    important: true,
  };
  return request.then((res) => res.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((res) => res.data);
};

export default { getAll, create, update };
