const model=require('../../models');
const bcrypt = require('bcryptjs');


module.exports={

    register(req,res){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) res.status(400).json('Error: ' + err)
                else{ 
                    model.User.create({ 
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        aboutMe: req.body.aboutMe,
                        profilePicture:'https://www.simplifai.ai/wp-content/uploads/2019/06/blank-profile-picture-973460_960_720-400x400.png'
                    })
                    .then(function(){ res.send(200,{message:'El usuario se ha creado correctamente'})})
                    .catch(err =>  res.send(400,{err:err}));
                }
            })
        })
    }
}