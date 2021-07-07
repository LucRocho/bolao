import http from "./../http-common";
import Util from './helper/util';

class dsMatch {
  
  //
  get(id) {
    return http.get(`/match/${id}`);
  }

  //
  save(data) {
    return http.post("/match", data);
  }

  //
  delete(id) {
    return http.delete(`/match/${id}`);
  }

  //ok
  findByName(teamName) {
    return http.get(`/match?teamName=${teamName}`);
  }

  getAll(){
    return http.get(`/match`); 
  }

  //
  getSelected(params){
    
    return http.get(`/match?${Util.paramsToQueryString(params)}`);
  }

  updateScore(params){
    return http.get(`/updateScore?${Util.paramsToQueryString(params)}`);
  }

}
export default new dsMatch();