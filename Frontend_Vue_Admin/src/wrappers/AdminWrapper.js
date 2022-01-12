import axios from "axios";

var baseUrl = "http://localhost:43085"

var apiConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
}

export default {
    async getFans(){
        var response;

        try{
            response = await axios.get(`${baseUrl}/api/Admin/fans`, apiConfig)
        }
        catch(error){
            return error.response
        }
        return response.data
    },

    async getCreators(){
        var response;

        try{
            response = await axios.get(`${baseUrl}/api/Admin/creators`, apiConfig)
        }
        catch(error){
            return error.response
        }
        return response.data
    },

    async getPosts(){
        var response;

        try{
            response = await axios.get(`${baseUrl}/api/Admin/posts`, apiConfig)
        }
        catch(error){
            return error.response
        }
        return response.data
        
    },

    async deletePost(id){
        var response;
        
        try{
            response = await axios.delete(`${baseUrl}/api/Admin/post/${id}`, apiConfig)
        }
        catch(error){
            return error.response
        }
        return response.data
    },

    async deleteFan(username){
        var response;

        try{
            response = await axios.delete(`${baseUrl}/api/Admin/fan/${username}`, apiConfig)
        }
        catch(error){
            return error.response
        }
        return response.data
    },

    async deleteCreator(username){
        var response;

        try{
            response = await axios.delete(`${baseUrl}/api/Admin/creator/${username}`, apiConfig)
        }
        catch(error){
            return error.response
        }
        return response.data
    }
}