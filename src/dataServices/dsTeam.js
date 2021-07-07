import http from "./../http-common";
import Util from './helper/util';


class dsTeam {
  
  //ok
  get(id) {
    return http.get(`/teams/${id}`);
  }

  //ok
  save(data) {
    return http.post("/teams", data);
  }

  //ok
  delete(id) {
    return http.delete(`/teams/${id}`);
  }

  
  //ok
  findByName(name) {
    return http.get(`/teams?name=${name}`);
  }

  //ok
  getSelected(params){
    return http.get(`/teams?${Util.paramsToQueryString(params)}`);
    //return http.get(`/teams`);
  }

  getAll(){
    return http.get(`/teams`);
  }

  
}

export default new dsTeam();
