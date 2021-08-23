const jwt = require('jsonwebtoken');


module.exports = (credentials = []) => {
    return (req, res, next) => {
        // Allow for a string OR array
        if(typeof credentials === "string"){
            credentials = [credentials];
        }

        //find JWT in header
        const token = req.headers["authorization"];
        
        if(!token){
            return res.status(401).send("Error: Access denied -> No token");
        }else{
            //Validate JWT 
            // Bearer eyJhbGciOiJIUzI1N...
            const tokenBody = token.slice(7);
            jwt.verify(tokenBody, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if(err){
                    console.log(`JWT Error: ${err}`);
                    return res.status(401).send("Error: Access denied -> Invalid token");
                }
               
                next();
            });
            
        }
        
    }
}