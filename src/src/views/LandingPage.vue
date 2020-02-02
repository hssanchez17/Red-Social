<template>
<div id="app" >

  <b-navbar toggleable="lg" type="dark" variant="dark">

      <b-navbar-brand href="#">Red Social</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <LoginComponent></LoginComponent>

  </b-navbar>




<b-container>
  
  <b-row>
    <b-col id="leftColumn" class="d-none d-lg-block">
      <img :src="introImage">
    </b-col>

    <b-col id="rightColumn">
      <h1>Registro</h1>

      <RegisterComponent></RegisterComponent>
    </b-col>

  </b-row>
  
</b-container>




</div> 
</template>

<script>
  import LoginComponent from '@/components/LoginComponent.vue'
  import RegisterComponent from '@/components/RegisterComponent.vue'

  export default {
    components: {
      LoginComponent,RegisterComponent
    },
    data(){
      return {
       introImage:'https://3cero.com/wp-content/uploads/2016/06/Rock-App-Roll-la-primera-red-social-para-descargar-aplicaciones.jpg'
      }
    },
  }
</script>



<style scoped>

#app{
  
  width:100%;
  min-height: 100vh;
  background: url(https://i2.wp.com/wmdance.com/wp-content/uploads/2013/02/Black-Background-Metal-1080P-hd-wallpapers-hd-wallpaper-1920x1440-13-507f977a064c7-8556.jpg?fit=1920%2C1440&ssl=1);
   }



h1{
  color:gray
}

h3 {
  margin: 40px 0 0;
}

#leftColumn{
  width:80%;  
  height: auto;
  padding: 20px;
}

#leftColumn img{
  width:100%;
  height:auto;
}

#rightColumn{
  padding: 20px;
}
</style>