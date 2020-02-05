const model=require('../models');
const cloudinary = require('../middlewares/cloudinary');


module.exports={

    profile(req,res){
        model.User.findAll({
            where: {id: req.user.id},
            include:['posts','followers','following']
        })
        .then(function(user){res.send(user)})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    update (req,res){
        const promise=new Promise((resolve,reject)=>{
            let profilePicture=req.user.profilePicture
            if(req.file!=undefined) {
                cloudinary.uploadImage(req.file)
                .then(function(result){
                    profilePicture= result.url
                    resolve(profilePicture)
                })
            }
            else resolve(profilePicture)
        })

        promise.then((profilePicture)=>{
            model.User.update({    
                name:req.body.name,
                //email:req.body.email,
                aboutMe: req.body.aboutMe,
                //password:hash,
                profilePicture: profilePicture
            }, {where: {id: req.user.id}})
            .then(function(){ res.send(200,{message:'El usuario se ha modificado exitosamente'})})
            .catch(err => res.status(400).json('Error: ' + err));
            })

        promise.catch(err => res.status(400).json('Error: ' + err));
    },

    show(req,res){
        model.User.findAll({
            where: {id: req.params.id},
             include:['posts','followers','following']
        })
        .then(function(user){res.send(user)})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    searchProfiles(req,res){
        model.User.findAll({})
        .then(function(users){ res.send(users)})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    getAll(req,res){
        model.User.findAll({
            include:['followers','posts','following']
        })
        .then(function(users){ res.send({users,userId:req.user.id})})
        .catch(err => res.status(400).json('Error: ' + err));

    }

}