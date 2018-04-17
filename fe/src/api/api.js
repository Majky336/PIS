import Axios from 'axios';

//http://localhost:53564
export const api = Axios.create({
  baseURL: 'http://pisapi.azurewebsites.net/',
});
