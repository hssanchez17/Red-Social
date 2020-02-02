<template>
	<div class="card">
          <div class="card-header bg-secondary text-white">
            <h3></i>Publicaciones</h3>
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
</template>

<script>
	export default{
		props:['posts']
	}
</script>

<style>
	
#images{
  width: 100%; 
  height: 100%;
  background-color: black;

}

#profilePicture{
    height: 250px;
  }
</style>