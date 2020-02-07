<template>
	
</template>


<script>

	export default {
 
  beforeMount(){
    this.ensureAuthenticated()
  },

  methods:{
    ensureAuthenticated(){
     /* this.axios.get('ensureAuthenticated')
      .then((response) => {
        console.log(response)
        if(response.data.error==true){
        	alert('Please log in to view that resource')
        	this.$router.push({ path: `/` })
        }
        else console.log('funciona fino')
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }*/
  }
}
};
</script>