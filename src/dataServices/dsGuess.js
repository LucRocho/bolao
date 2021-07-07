import http from "./../http-common";
import Util from './helper/util';

class dsGuess {
  
  //
  get(id) {
    return http.get(`/guess/${id}`);
  }

  getSelected(params){
    
    return http.get(`/guess?${Util.paramsToQueryString(params)}`);
  }

  updateGuess(params){
    return http.get(`/updateGuess?${Util.paramsToQueryString(params)}`);
  }

  getRanking(idGame) {
    return http.get(`/ranking/${idGame}`);
  }

}
export default new dsGuess();