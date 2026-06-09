import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((res) => res.data);
};

const del = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(() => console.log(`${id} has been deleted`));
};

export default { getAll, create, update, del };
