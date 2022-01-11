import Axios from 'axios';
import { API_HOST } from 'Constants';

// 이렇게 되면 API_HOST를 매번 지정할 필요 X
const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

export { axiosInstance };
