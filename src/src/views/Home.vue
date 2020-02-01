<template>
	<div class="app">

    <Navbar></Navbar>
		

 <div class="container" id="profile-info">
      <div class="row row justify-content-md-center">
		    <div class="col-md-8">
		      <div class="card">
            <div class="card-header bg-secondary text-white">
              <h3><i class="far fa-images"></i>Publicaciones</h3>
            </div>

            <div class="card-body text-center">
               <div class="row row justify-content-md-center">
                <div class="col-md-10 text-center" v-for="post in posts">
                    <a :href="'/post/show/'+ post.id">
                      <img :src="post.imageUrl" id="images" class="img-thumbnail" />
                    </a>

              </div>

            </div>
          </div>
      </div>
    </div>
  </div>
  </div>






	</div>

</template>

<script>
  import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },

  data() {
    return {
      posts:[],
      users:[]
    };
  },

  created(){
    this.getAllPosts(),
    this.getAllUsers();
  },

  methods:{
    getAllPosts(){
      this.axios.get('post/all')
      .then((response) => {
        this.posts=response.data
        //console.log(this.posts)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },

    getAllUsers(){
      this.axios.get('user/all')
      .then((response) => {
        this.users=response.data.users
        console.log(this.users)

        for(var i = this.users.length - 1; i >= 0; i--) {
          if(this.users[i].followers.userId.id != response.data.id) {
        array.splice(i, 1);
          }
        }
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
