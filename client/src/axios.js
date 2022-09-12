import axios from 'axios';

export const server = 'https://supplychain20.herokuapp.com/';

const instance = axios.create({
  baseURL: server,
});

export default instance;