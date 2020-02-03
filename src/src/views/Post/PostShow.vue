<template>
	<div class="app">

		<Navbar></Navbar>

  	<div class="container">
  		<div class="row row justify-content-md-center">
  			<div class="col-md-8">

          <PostData :post="post" :id="id"></PostData>

          <Comments :post="post" :id="id"></Comments>
         


        </div>
	     </div>
	   </div>
    </div>

</template>


<script>
  import Navbar from '@/components/Navbar.vue'
  import PostData from '@/components/PostShow/PostData.vue'
  import Comments from '@/components/PostShow/Comments.vue'

export default {
  components: {
    Navbar,
    PostData,
    Comments
  },
	data() {
     return {
      post:{
        like:{}
      },
      id:this.$route.params.id,
    }
  },

  mounted(){
      this.getPost()
  },

  methods:{
      getPost(){
        this.axios.get(`post/show/${this.id}`)
        .then((response) => {
          this.post= response.data[0];
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      }
    }
  }

</script>

<style type="text/css">
  #image{
    width: 100%; 
    max-width:600px; /*ancho de tu imagen*/
    height: 590px;
    background: black;
  }
</style>