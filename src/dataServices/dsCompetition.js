import http from "./../http-common";
import Util from './helper/util';

class dsCompetition {
  
  //ok
  get(id) {
    return http.get(`/competitions/${id}`);
  }

  //ok
  getTeams(id) {
    return http.get(`/competitions/teams/${id}`);
  }

  getOtherTeams(id) {
    return http.get(`/competitions/otherteams/${id}`);
  }

  //ok
  save(data) {
    return http.post("/competitions", data);
  }

  saveTeamsCompetition(data) {
    return http.post("/competitions/teams", data);
  }

  //ok
  delete(id) {
    return http.delete(`/competitions/${id}`);
  }

  
  //ok
  findByName(name) {
    return http.get(`/competitions?name=${name}`);
  }

  //ok
  getSelected(params){
    return http.get(`/competitions?${Util.paramsToQueryString(params)}`);
  }

  getAll(){
    return http.get(`/competitions`); 
  }

  getActiveCompetition(){
    return http.get(`/activeCompetition`);
  }
}
export default new dsCompetition();