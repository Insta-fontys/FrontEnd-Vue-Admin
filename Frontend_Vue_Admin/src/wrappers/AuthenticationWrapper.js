import axios from "axios";

var baseUrl = "http://localhost:33371"

export default {
    async signIn(data){
        var response;

        try{
            response = await axios.post(`${baseUrl}/api/Login/authenticate`, data)
        }
        catch(error){
            response = error.response
        }

        console.log(response.data);

        return{
            token: response.data
        }
    }
}