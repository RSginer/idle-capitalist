import config from "../config"


export async function initGame() {
  return await axios.post(config.serverUrl + '/login', {})
   /*  .then(res => {
      dispatch(initSuccess(res.data));
    })
    .catch(err => {
      dispatch(initError(err.message));
    }); */
}