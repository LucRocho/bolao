import http from "./../http-common";
import Util from './helper/util';


class dsUser {
  //ok
  get(id) {
    return http.get(`/users/${id}`);
  }

  //ok
  getAll(){
    return http.get(`/users`);
  }

  //ok
  save(data) {
    return http.post("/users", data);
  }


  //ok
  login(data){
    return http.post("/users/login", data);
  }

  //ok
  delete(id) {
    return http.delete(`/users/${id}`);
  }

  
  //ok
  findByName(name) {
    return http.get(`/users?name=${name}`);
  }

  //ok
  getSelected(params){
    return http.get(`/users?${Util.paramsToQueryString(params)}`);
  }

  //ok
  changePassword(data){
    return http.post("/users/changePassword", data);
  }  
}

export default new dsUser();
