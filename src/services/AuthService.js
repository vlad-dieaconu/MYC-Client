import axios from 'axios'

class AuthService {

    login(username, password) {
        return axios
            .post("/api/auth/signin",{
                username,
                password
            })
            .then(response => {
                localStorage.setItem("USER", JSON.stringify(response.data));
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("USER");
        window.location.reload();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('USER'));;
    }

}

export default new AuthService();