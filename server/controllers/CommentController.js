const model=require('../models');
module.exports={

	create(req,res){
        console.log(req.body)
		model.Comment.create({
			userId: req.user.id,
    		postId: req.params.id,
    		comment: req.body.comment
		})
		.then(function(){res.send(200,{email: req.user.email})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	update (req,res){
        model.Comment.update({    
            comment: req.body.comment
        }, 
        {where: {id: req.params.id}})
        .then(function(){ res.send(200,{message:'El usuario se ha modificado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));   
    },

    destroy(req,res){
        model.Comment.destroy({where: {id: req.params.id}})
        .then(function(){res.send(200,{message:'El like se ha eliminado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    getCommentWithOwnerPermission(req,res) {
        model.Comment.findAll({
            where:{id:req.params.id},
            include:['user']
        })
        .then(function(comment){
            let commentOwner=false
            if(req.user.id==comment[0].userId) commentOwner=true 
            res.send({comment:comment,commentOwner:commentOwner})


        })
        .catch(err => res.status(400).json('Error: ' + err));
    },

    getAlldCommentsFromAPost(req,res){
        model.Comment.findAll({
            where:{postId:req.params.id},
            include:['user']
        })
        .then(function(comments){res.send(comments)})
        .catch(err => res.status(400).json('Error: ' + err));
    },


    getCommentsFromUser(req,res){
        model.Comment.findAll({
            where:{
                postId:req.params.id,
                userId:req.user.id
            },
            include:['user']
        })
        .then(function(comments){res.send(comments)})
        .catch(err => res.status(400).json('Error: ' + err));
    }

}