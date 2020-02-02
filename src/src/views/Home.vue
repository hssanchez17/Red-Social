<template>
	<div class="app">

    <Navbar></Navbar>
		

  <div class="container" id="profile-info">
      <div class="row row justify-content-md-center">
		    <div class="col-md-8">
		      <div class="card">
            <PostList :posts="posts"></PostList>
          </div>
        </div>
      </div>
  </div>






	</div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import PostList from '@/components/PostListComponent.vue'
export default {
  components: {Navbar,PostList},

  data() {
    return {
      posts:[]    
    };
  },

  created(){
    this.getAllPosts()
  },

  methods:{
    getAllPosts(){
      this.axios.get('post/all')
      .then((response) => {
        this.posts=response.data
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
  },
};
</script>

<style type="text/css">
  #images{
  width: 100%; 
  height: 100%;
  background-color: black;

}
</style>
