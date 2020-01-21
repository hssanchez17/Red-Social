<template>
	<div class="app">
		<Navbar></Navbar>
  	<div class="container">
  		<div class="row row justify-content-md-center">
  			<div class="col-md-8">
  				<div class="card">

  					<div class="card-header d-flex justify-content-between align-items-center">
              <h2>{{post.title}}</h2>
              <button class="btn btn-danger" id="btn-delete" @click="destroyPost()">
                <i class="fa fa-times"></i> Delete
              </button>
            </div>


            <div class="card-body">
              <p>{{post.description}}</p>
              <div class="text-center">
                <img :src="post.imageUrl"class="img-fluid" id="image">
              </div>
            </div>


            <div class="card-footer d-flex justify-content-between align-items-center">
              <button class="btn btn-success" id="btn-like">
                <i class="fas fa-thumbs-up"></i> Like 
              </button>

              <p>
                <span class="likes-count">30</span>
                <i class="fas fa-heart"></i>
              </p>
                
              <p>
                <i class="fas fa-eye"></i> 20
              </p>
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
	    	post:{},
	    	 id:this.$route.params.id }
  	},

  	created(){
    	this.getPost();
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
	    },
      destroyPost(){
        this.axios.delete(`post/destroy/${this.id}`)
        .then(res => {
          alert('Se elimino el post correctamente')
          this.$router.push({ path: `/home` })
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      }
  	}

    	

    };

</script>

<style type="text/css">
  #image{
    width: 100%; 
    height: 600px;
  }
</style>