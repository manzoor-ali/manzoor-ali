import http from "./Api";

class APIServices {
  // Peoples data from api
  getPeoplesData(val) {
    return http.get(`api/people/?page=${val}`);
  }
  //   Peoples data from api endeds
}

export default new APIServices();
