import http from "./../http-common";

class dsChat {
  
  
  //ok
  save(data) {
    return http.post("/chats", data);
  }

  //ok
  delete(id) {
    return http.delete(`/chats/${id}`);
  }

  
  getAll(idGame){
    return http.get(`/chats/${idGame}`);
  }

  
}

export default new dsChat();
