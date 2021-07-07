import http from "./../http-common";
import Util from './helper/util';

class dsGame {
  
  //
  get(id) {
    return http.get(`/game/${id}`);
  }

  //
  save(data) {
    return http.post("/game", data);
  }

  //
  delete(id) {
    return http.delete(`/game/${id}`);
  }

  //ok
  findByName(teamName) {
    return http.get(`/game?name=${teamName}`);
  }

  getAll(){
    return http.get(`/game`); 
  }

  //
  getSelected(params){
    
    return http.get(`/game?${Util.paramsToQueryString(params)}`);
  }

  //ok
  getUsers(id) {
    return http.get(`/game/users/${id}`);
  }

  getActiveGamesUser(id) {
    return http.get(`/user/games/${id}`);
  }

  getTeams(id) {
    return http.get(`/game/teams/${id}`);
  }

  getOtherUsers(id) {
    return http.get(`/game/otherusers/${id}`);
  }

  getValues(id){
    return http.get(`/game/values/${id}`);
  }

  saveUsersGame(data) {
    return http.post("/game/users", data);
  }

  setGamePaid(data) {
    return http.post("/game/paid", data);
  }

  toogleGamePaid(id) {
    return http.post(`/game/paid/${id}`);
  }

}
export default new dsGame();