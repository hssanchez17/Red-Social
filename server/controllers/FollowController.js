const model=require('../models');
module.exports={
	create(req,res){

		model.Follow.create({
			userId: req.user.id,
    		friendId: req.params.id
		})
		.then(function(){res.send(200,{email: req.user.email})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	destroy(req,res){
		model.Follow.destroy({
			where:{
				userId: req.user.id,
    			friendId: req.params.id
			}
		})
		.then(function(){res.send(200,{message:'El follower se ha eliminado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	doIFollowYou(req,res){
		model.Follow.findAll({
			where:{
				userId:req.user.id,
				friendId:req.params.id
			}
		})

		.then(function(permission){
			if(permission[0]==null) res.send(200,{doIFollowYou: false})
			else res.send(200,{doIFollowYou: true})
		})
        .catch(err => res.status(400).json('Error: ' + err));
    },

    getAllFollowing(req,res){

    	model.Follow.findAll({
    		where:{
    			userId:req.params.id
    		},
    		include:['friend']
    	})
    	.then(function(friends){
			res.send(friends)
		})
        .catch(err => res.status(400).json('Error: ' + err));
    },
    getAllFollowers(req,res){

    	model.Follow.findAll({
    		where:{
    			friendId:req.params.id
    		},
    		include:['user']
    	})
    	.then(function(friends){
			res.send(friends)
		})
        .catch(err => res.status(400).json('Error: ' + err));
    }
}
