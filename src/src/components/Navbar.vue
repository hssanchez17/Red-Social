<template>
	<div class="hello">
	<b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/home">Red Social</b-navbar-brand>

       <b-navbar-nav > 
              <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search for a user by name" v-model="user">
          </b-navbar-nav >

      <b-navbar-nav>
        <button class="btn btn-lg btn-success" type="submit" @click="searchUser()">Search</button>
      </b-navbar-nav>


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
      user:''

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
    },
    searchUser(){
      this.$router.push({path:`/user/list`})
            window.location.reload()
    }
  }
}
</script>
