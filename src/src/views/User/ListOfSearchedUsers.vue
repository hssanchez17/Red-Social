<template>
	<div class="app">

		<Navbar></Navbar>

    <div class="container">

      <div class="toSearch">
        <input type="text" placeholder="Search.." name="search" v-model="search">
        <button type="submit" @click="searchUser()">Search</button>
      </div>

      <div class="row" id="listOfSearchedUsers">
        <div class="col-md-4"  v-for="user in listOfFilteredUsers">
          
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
  import axios from 'axios'
  import Navbar from '@/components/Navbar.vue'
  export default {
  components: {
    Navbar
  },

  data(){
  	return {
  		listOfUsers:[],
  		search:'',
      listOfFilteredUsers:[]

  	}
  },

  mounted(){
  	this.getListOfSearchedUsers()
  },

  methods:{

  	getListOfSearchedUsers(){
        this.axios.get(`user/list/${this.name}`)
        .then((response) => {
          this.listOfUsers= response.data;
          this.listOfFilteredUsers=this.listOfUsers
        })
        .catch((e)=>{
          console.log('error' + e);
        })
    },

  	searchUser(){
        this.listOfFilteredUsers=[]
        this.listOfFilteredUsers=this.listOfUsers.filter(user => {
          return user.name.toLowerCase().includes(this.search.toLowerCase())
        })
  	}

  }
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
.toSearch{
  margin-top: 20px;
  margin-bottom: 20px;
}
/* Style the search field */
.toSearch input[type=text] {

  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

/* Style the submit button */
.toSearch button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}

.toSearch button:hover {
  background: #0b7dda;
}

/* Clear floats */
.toSearch::after {
  content: "";
  clear: both;
  display: table;
}
</style>