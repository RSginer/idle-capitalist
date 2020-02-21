import config from "../config"
import axios from 'axios';

export async function fetchInit() {
  return await axios.post(config.serverUrl + '/login', {});
}