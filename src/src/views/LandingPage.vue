<template>
<div id="app" >

<b-navbar toggleable="lg" type="dark" variant="dark">

    <b-navbar-brand href="#">Red Social</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-form @submit.prevent="login(userLogin)">
          <b-form-group>
            <b-form-input placeholder="Ingrese su Email"      size="sm" class="mr-sm-2" id="emailLogin"     v-model.trim="userLogin.email"></b-form-input>
            <b-form-input  placeholder="Ingrese su Contraseña" size="sm" class="mr-sm-2" id="passwordLogin"  v-model.trim="userLogin.password" type="password"></b-form-input>
          </b-form-group>

          <b-button size="sm" class="my-2 my-sm-0" type="submit">Iniciar Sesion</b-button>
        </b-nav-form>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>




<b-container class="bv-example-row">
  
  <b-row >
    <b-col id="column1" class="d-none d-lg-block">
      <img src="https://3cero.com/wp-content/uploads/2016/06/Rock-App-Roll-la-primera-red-social-para-descargar-aplicaciones.jpg">
    </b-col>

    <b-col id="column2">

      <h1>Registro</h1>
      
      <b-form @submit.prevent="register(userRegister)">

        
        <b-form-group>
          <b-form-input placeholder="Ingrese su nombre"  id="name"  v-model.trim="$v.userRegister.name.$model" :class="{'is-invalid':$v.userRegister.name.$error,'is-valid':!$v.userRegister.name.$invalid}" ></b-form-input>
          <span  class="valid-feedback" >Su nombre es valido</span>
          <span  class="invalid-feedback"   v-if="$v.userRegister.name.$error">Ingrese su nombre</span>  
        </b-form-group>



        <b-form-group>
          <b-form-input 
            placeholder="Ingrese su Email" 
            id="emailRegister" 
            v-model.trim="$v.userRegister.email.$model" 
            :class="{'is-invalid':$v.userRegister.email.$error,'is-valid':!$v.userRegister.email.$invalid}" v-on:keyup="submitEmail=false">
          </b-form-input>

          <span  class="valid-feedback" >Su email es valido</span>

          <span 
            class="invalid-feedback" 
            v-if="$v.userRegister.email.required && !submitEmail ">
          Ingrese un email valido

          </span> 
          <span class="invalid-feedback" v-if="$v.userRegister.email.email && !submitEmail">Este campo no puede ser vacio</span>
          <span class="invalid-feedback" v-if="!$v.userRegister.email.isUnique">Ya se encuentra en el sistema</span>
        </b-form-group>

        <b-form-group>
          <b-form-input type="password" id="passwordRegister" placeholder="Ingrese su Contraseña"  v-model.trim="$v.userRegister.password.$model" :class="{'is-invalid':$v.userRegister.password.$error,'is-valid':!$v.userRegister.password.$invalid}"></b-form-input>
          <span  class="valid-feedback" >Su contraseña coinciden</span>
          <span  class="invalid-feedback"  v-if="!$v.userRegister.password.minLength">La contraseña debe de ser minimo de 6</span> 
          <span  class="invalid-feedback"  v-if="!$v.userRegister.password.required">La contraseña no puede ser vacio</span> 
          <span  class="invalid-feedback"  v-if="!$v.userRegister.password.sameAsPassword">La contraseñas deben de ser iguales</span> 
       </b-form-group>


        <b-form-group>
          <b-form-input type="password" id="input-horizontal" placeholder="Repita su contraseña" v-model.trim="$v.userRegister.repeatPassword.$model" :class="{'is-invalid':$v.userRegister.repeatPassword.$error,
          'is-valid':(userRegister.password!='') ? !$v.userRegister.repeatPassword.$invalid:''}"></b-form-input>
          <span  class="valid-feedback" >Su contraseña coinciden</span>
          <span  class="invalid-feedback" v-if="!$v.userRegister.repeatPassword.sameAsPassword">La contraseñas deben de ser iguales</span> 
        
        </b-form-group>

      <b-button  type="submit" variant="primary">Registrarse</b-button>
      </b-form>
    </b-col>


  </b-row>
  
</b-container>




</div> 
</template>

<script>
  import { required, minLength, between, email,sameAs} from 'vuelidate/lib/validators'


  export default {
    data() {
      return {
        userRegister:{
           image: { backgroundImage: "url(../../public/fondo.jpg)" },
          name:'',
          email:'',
          password:'',
          repeatPassword:'',
        },

        userLogin:{
          email:'',
          password:'',
        },
        
        submitEmail: false,
        color:'#673AB7'
      }
    },

    validations:{
       userRegister:{
         name: {
          required
        },
        email:{
          required,
          email,
          isUnique(){
            
            if(this.submitEmail)return false
            else return true
          }
        },

        password:{
          required,
          minLength:minLength(6),
          sameAsPassword:sameAs('repeatPassword')
        },
        repeatPassword:{
          required,
          sameAsPassword:sameAs('password')
        }
      }
    },

    methods:{
      register(userRegister){

        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.axios.post('register', userRegister)
          .then(res => {
            this.$router.push({ path: `/home` })
            console.log(res)
          })
          .catch( e => {
            this.submitEmail=true   
            //console.log(e.response.data.err.errors)
          })
        }    
      },

      login(userLogin){
        this.axios.post('login', userLogin)
        .then(res => {
          console.log(res)
          this.$router.push({ path: `/home` })
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      
      },
    },


  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
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

#column1{
  width:80%;  
  height: auto;
  padding: 20px;
}

#column1 img{
  width:100%;
  height:auto;
}

#column2{
  padding: 20px;
}
</style>