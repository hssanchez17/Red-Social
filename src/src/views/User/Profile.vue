<template>
<div class="app">
  <Navbar></Navbar>

  <div class="container" id="profile-info">
    <div class="row">
      <div class="col-md-3">
        
        <div class="card">
           <img src="https://scontent-mia3-2.xx.fbcdn.net/v/t31.0-8/s960x960/15800243_1378924182125785_3186974028727972417_o.jpg?_nc_cat=105&_nc_ohc=nDhh6znLXUkAX8S7OK3&_nc_ht=scontent-mia3-2.xx&_nc_tp=1002&oh=bc7952c964fb005af9f9b28c42b295b8&oe=5EDB22D5" class=" img-responsive" id="image"> 
          <div class="card-body">
            <h4 class="card-title mt-3">{{user.name}}</h4>
            <p>{{user.aboutMe}}</p>
            <p>{{user.email}}</p>
            <b-button class="btn-warning btn-sm mx-2" href="/user/update">Actualizar</b-button>
          </div>  
        </div> 
      </div>

      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h3><i class="far fa-images"></i>Publicaciones</h3>
          </div>  

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


<style scoped>
#profile-info{
  margin-top: 1.5%
}

#images{
  width: 100%; 
  height: 100%;
  background-color: black;

}

#image{
    height: 250px;
  }

</style>