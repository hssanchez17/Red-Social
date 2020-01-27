<template>
	<div class="hello">

	<ul class="list-group p-4" v-for="comment in comments">
        <li class="list-group-item">
            <div class="row">
                <a :href="`/user/show/${comment.userId}`" class="col text-center">
                	<img :src="post.imageUrl" id="images" width="120px" height="120px" class="img-circle" />
                </a>-

                <blockquote class="col">
                	<p class="lead">{{comment.comment}}</p>
                    <footer class="blockquote-footer">{{comment.user.email}}</footer>
                </blockquote>
            </div>
        </li>
   </ul>
</div>


</template>


<script>

	export default {

    props:['post','comments'],

    data(){
    	return{
    		comment:{comment:'',user:{email:''}},
    	}
    }

}
</script>