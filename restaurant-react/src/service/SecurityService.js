import axios from 'axios'
import {BASE} from "../utils/RequestHandler";
import {TOKEN} from "../utils/RequestHandler";


class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${BASE}/employees/login`,
            {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        localStorage.setItem(TOKEN, this.createBasicAuthToken(username, password));
    }

    logout() {
        localStorage.removeItem(TOKEN);
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(TOKEN)
        if (user === null) return false;
        return true
    }
}

export default new AuthenticationService()