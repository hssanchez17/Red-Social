const model=require('../models');
module.exports={

	create(req,res){
        console.log(req.body)
		model.Comment.create({
			userId: req.user.id,
    		postId: req.params.id,
    		comment: req.body.comment
		})
		.then(function(){res.send(200,{message:'El comentario se ha creado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
	},

	update (req,res){
        model.Comment.update({    
        	comment: req.body.comment
        }, {where: {id: req.body.id}})
        .then(function(){ res.send(200,{message:'El usuario se ha modificado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));   
    },

     destroy(req,res){
        model.Comment.destroy({where: {id: req.params.id}})
        .then(function(){res.send(200,{message:'El like se ha eliminado exitosamente'})})
        .catch(err => res.status(400).json('Error: ' + err));
    },

}