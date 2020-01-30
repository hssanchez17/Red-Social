const model=require('../models');
module.exports={
	create(req,res){

		model.Fried.create({
			userId: req.user.id,
    		friendId: req.params.id
		})
		.then(function(){res.send(200,{email: req.user.email})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	destroy(req,res){
		model.Fried.destroy({
			where:{
				userId: req.user.id,
    			friendId: req.params.id
			}
		})
		.then(function(){res.send(200,{message:'El follower se ha eliminado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	doIFollowYou(req,res){
		model.Fried.findAll({
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

    getAllFriends(req,res){
    	model.Fried.findAll({
    		where:{
    			userId:req.params.id
    		},
    		include:['friend']
    	})
    	.then(function(friends){
			res.send(friends)
		})
        .catch(err => res.status(400).json('Error: ' + err));
    }
}
