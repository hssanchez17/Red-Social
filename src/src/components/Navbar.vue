<template>
	<div class="hello">
	<b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/home">Red Social</b-navbar-brand>
      <b-navbar-brand> 
<!-- Aqui va el componente de busqueda-->
            </b-navbar-brand>

      <b-navbar-brand>
        <!--<button class="btn btn-lg btn-success" type="submit" @click="searchUser()">Search</button>-->
      </b-navbar-brand>


        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-navbar-brand href="/user/profile">Profile</b-navbar-brand>
            <b-navbar-brand href="/post/add">Create a post</b-navbar-brand>
            <b-navbar-brand @click="logOut">Log out</b-navbar-brand>
          </b-nav-form>
        </b-navbar-nav>
    </b-navbar>
   	</div>

</template>


<script>
  import axios from 'axios'
export default {
  data(){
    return{
//      user:''

    }
  },
  methods:{
    logOut(){
       this.axios.post('logout')
       .then(res => {
          this.$router.push({ path: `/` })
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
    }/*,
  searchUser(){
    console.log(this.user)
    this.$router.push({path: `/user/list/${this.user}`})
  }*/
  }
}
</script>
