import Axios from 'axios';

//https://www.turing.sk/api/tetris
export const api = Axios.create({
  baseURL: 'http://localhost:53564',
});
