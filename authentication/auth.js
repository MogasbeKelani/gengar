module.exports = {


    //ADD THESE MIDDLEWARE TO PROTECTED ROUTE 
    doAuth: (function (req, res, next) {

        if(req.isAuthenticated()) {
            return next(); 
        } else {
            /// dont know what the login page is
            res.redirect('/fail') //for now it will go to /fail
        }
    })

    

    
}