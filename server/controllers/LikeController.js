const model=require('../models');
module.exports={

	create(req,res){
		model.Like.create({
			userId: req.user.id,
    		postId: req.params.id
		})
		.then(function(){res.send(200,{message:'El like se ha creado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	didYouLeaveTheLike(req,res){
		model.Like.findAll({
			where:{
				userId:req.user.id,
				postId:req.params.id
			}
		})
		.then(function(user){
			if(user[0]==null) res.send(200,{leaveTheLike:false})
			else res.send(200,{leaveTheLike:true})
		})
		.catch(err => res.status(400).json('Error: ' + err));
	},

	destroy(req,res){
		model.Like.destroy({
		 	where:{
				userId:req.user.id,
				postId:req.params.id
			},
		})
        .then(function(){res.send(200,{message:'El like se ha eliminado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	getFromPost(req,res){
		model.Like.findAll({
			where:{
				postId:req.params.id
			}
		})
		.then(function(likes){res.send(likes)})
        .catch(err => res.status(400).json('Error: ' + err))
	}



}
