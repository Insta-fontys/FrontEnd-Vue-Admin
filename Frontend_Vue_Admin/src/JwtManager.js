export default{

//Get claims from JWT
    parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    },
    
    //Check expiration date of JWT
    checkExpiration (exp) {
        const expDate = new Date(exp * 1000)
        const currentDate = new Date()
    
        return expDate.getTime() <= currentDate.getTime();
    },

    //Get Role from JWT
    getRole(){
        const claims = this.parseJwt(localStorage.getItem("jwt"))
        const role = claims["Role"]
        return role
    },

    getName(){
        const claims = this.parseJwt(localStorage.getItem("jwt"))
        const name = claims["Name"]
        return name
    }
  
}