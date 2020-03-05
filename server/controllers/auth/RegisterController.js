const model=require('../../models');
const bcrypt = require('bcryptjs');


module.exports={

    register(req,res){
        console.log(req.body)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) res.status(400).json('Error: ' + err)
                else{ 
                    let {body}=req
                    model.User.create(body)
                    .then(function(){ res.send(200,{message:'El usuario se ha creado correctamente'})})
                    .catch(err =>  res.send(400,{err:err}));
                }
            })
        })
    }
}