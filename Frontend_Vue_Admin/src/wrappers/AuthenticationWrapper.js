import axios from "axios";

var baseUrl = "http://localhost:43085"

export default {
    async signIn(data){
        var response;
        console.log(data)
        try{
            response = await axios.post(`${baseUrl}/api/Login/authenticateAdmin`, data)
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