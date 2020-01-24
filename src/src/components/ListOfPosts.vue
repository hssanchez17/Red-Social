<template>

<div class="hello">

	<div class="card-body">
    	<div class="row row justify-content-md-center">
        	<div class="col-md-10 text-center" v-for="post in posts">
            	<a :href="'/post/show/'+ post.id">
                	<img :src="post.imageUrl" id="images" class="img-thumbnail"/>
                </a>
            </div>
        </div>
    </div>

</div>



</template>


<script>
	export default {
  data() {
    return {
      user:{},
      posts:[]
    };
  },

  created(){
    this.getProfile();
  },

  methods:{
    getProfile(){
      this.axios.get('profile', { credentials: true })
      .then((response) => {
        this.user= response.data[0];
        this.posts=this.user.posts
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
  }
};
	</script>


<style type="text/css">
#images{
  width: 100%; 
  height: 100%;
  background-color: black;

}
</style>