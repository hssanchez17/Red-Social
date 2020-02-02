const model=require('../models');
const cloudinary = require('../middlewares/cloudinary');

module.exports={

    
    store(req,res) {
        cloudinary.uploadImage(req.file)
        .then(function(result){
            model.Post.create({
                userId:req.user.id,
                likes:0,
                views:0,
                description:req.body.description,
                imageUrl: result.url,
                public_id: result.public_id,
                title: req.body.title
            })
        })
        .then(function(){res.send(200,{message:'El post se ha creado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    show(req,res){
        model.Post.findAll({
            where: {id:req.params.id},
            include:['like','comments']
        })
        .then(function(post){
            if(post[0]==null) res.status(400).json('Error: No existe este post')
            else res.send(post)
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
    
    update(req,res){
        model.Post.update({    
            title:req.body.title,
            description:req.body.description
            }, 
            {where: {userId: req.user.id, id:req.params.id}})
        .then(function(post){
            if(post==0) res.status(400).json('Error: usted no puede modificar este post' )
            else res.send(200,{message:'Se ha actualizado el proyecto correctamente'})
         })
        .catch(err => res.status(400).json('Error: ' + err));
    },

    destroy(req,res){
        model.Post.destroy({where: {id: req.params.id}})
        .then(function(){res.send(200,{message:'El post se ha eliminado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    getAllPosts(req,res){
        model.Post.findAll()
        .then(function(posts){ res.send(posts)})
        .catch(err => res.status(400).json('Error: ' + err));
    },
    
    ensurePostOwner(req,res,next){
        model.Post.findAll({where: {id: req.params.id}})
        .then(function(post){
            if(post[0].userId==req.user.id) res.send(200,{postOwner:true})
            else res.send(200,{postOwner:false})
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }

}