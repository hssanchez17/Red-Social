<template>
  <div>

    <div class="container">
     <div class="row" id="listOfUsers">
        <div class="col-md-4"  v-for="user in listOfUsers">
          
          <div class="card">
            <a :href="'/user/show/'+ user.id">
              <img :src="user.profilePicture"  id="profilePicture">
              <div class="card-body">
                <h5 class="card-title"> {{user.name}}</h5>
              </div>
            </a>
          </div>
        </div>
      </div> 
  </div>  

  </div>
</template>



<script>
export default{
    props:['listOfUsers'],
  }



</script>

<style>
      #profilePicture{
    width: 100%; 
    height: 300px;
},
* {
  box-sizing: border-box;
}
</style>
