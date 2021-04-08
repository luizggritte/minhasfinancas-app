import axios from "axios";

const httpCLient = axios.create({
    baseURL: "http://localhost:8080"
})

export default class ApiService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    get(url) {
        return httpCLient.get(`${this.apiUrl}${url}`);
    }

    post(url, objeto) {        
        return httpCLient.post(`${this.apiUrl}${url}`, objeto);
    }
    
    put(url, objeto) {
        return httpCLient.put(`${this.apiUrl}${url}`, objeto);
    }
    
    delete(url) {
        return httpCLient.delete(`${this.apiUrl}${url}`);
    }
}
