const model=require('../models');

module.exports={

    profile(req,res){
        model.User.findAll({
            where: {id: req.user.id},
            include:['posts']
        })
        .then(function(user){res.send(user)})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    update (req,res){
        model.User.update({    
            name:req.body.name,
            //email:req.body.email,
            userName:req.body.userName,
            aboutMe: req.body.aboutMe,
            //password:hash,
        }, {where: {id: req.user.id}})
        .then(function(){ res.send(200,{message:'El usuario se ha modificado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));   
    },

    show(req,res){
        model.User.findAll({
            where: {id: req.params.id},
            include:['posts']
        })
        .then(function(user){res.send(user)})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    searchProfiles(req,res){
        const Sequelize = require('sequelize');
        const Op = Sequelize.Op;

        console.log(req.params.name)

        model.User.findAll({
            where: {
                    [Op.or]: [
                        {
                          name: {
                            [Op.iLike]: `%${req.params.name}%`
                          }
                        }
                        
                    ],
                },


        })
        .then(function (resultado) {
                    console.log(resultado) 
             res.status(200).send(resultado) 
        })
        .catch(err => res.status(400).json('Error: ' + err));


    }

}