const authentication = async (req, res, next) => {
    // let id = 145; /*danish kp*/
     let id = 139;  /*archana*/
    const prefix = "7757_";  /*web123@gmail.com*/
    // const prefix = "8012_";     /*free@gmail.com*//

    // const token = req.headers["access-token"];
    //   if (!token) {
    //     return res.status(403).send("A token is required for authentication");
    //   }
    //   jwt.verify(token, process.env.TOKEN_KEY,async (err)=>{
    //       if (err) {  
    //         return res.status(406).json({ message: 'Unauthorized access-token' });
    //       }
    //       else{
    //         let id = jwt_decode(token).id;
    //    let prefix = jwt_decode(token).prefix;
    
    // let details = await UserDetails(id, prefix);
    // req.user_id = JSON.stringify(details['userDetails']['user_id']);
    // req.time_zone = JSON.stringify(details['userDetails']['time_zone']);
    // req.user_type = details['user_type'];
    // req.role_id = JSON.stringify(details['role_id']);
    // req.prefix = prefix;
    // req.email = details['email'];
    // req.name = details['user_name'];
    // req.tracking_based_on =JSON.stringify( details['userDetails']['tracking_based_on'])
    req.id = id;
    return next();
    //     }
    // });
};

module.exports = authentication;
