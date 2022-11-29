import http from "./../http-common";
import Util from './helper/util';

class dsChat {
  
  
  //ok
  save(data) {
    return http.post("/chats", data);
  }

  //ok
  delete(id) {
    return http.delete(`/chats/${id}`);
  }

  //
  get(id) {
    return http.get(`/chats/chat/${id}`);
  }

  
  getAll(params){
    return http.get(`/chats?${Util.paramsToQueryString(params)}`);
    
  }

  getNewMessage(params){
    return http.get(`/chats/newmessage?${Util.paramsToQueryString(params)}`);
    
  }

  
}

export default new dsChat();
