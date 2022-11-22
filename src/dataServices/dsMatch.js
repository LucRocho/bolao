import http from "./../http-common";
import Util from './helper/util';
import { format } from 'date-fns'

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

  getTodayMatches(){
    let today=format(Date.now(),'yyyy-MM-dd')
    return http.get(`/match?startDate=${today}&endDate=${today}`);
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