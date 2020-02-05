<template>

	<b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="login()">

            <b-form-group>
              <b-form-input 
                placeholder="Ingrese su Email" 
                size="sm" 
                class="mr-sm-2" 
                id="emailLogin"     
                v-model.trim="userLogin.email">
              </b-form-input>


              <b-form-input  
                placeholder="Ingrese su Contraseña" 
                size="sm" 
                class="mr-sm-2" 
                id="passwordLogin"  
                v-model.trim="userLogin.password" 
                type="password">  
              </b-form-input>

            </b-form-group>

            <b-button size="sm" class="my-2 my-sm-0" type="submit">Iniciar Sesion</b-button>
          </b-nav-form>
        </b-navbar-nav>
    </b-collapse>

</template>



<script>
	export default{
		data(){
			return {
				userLogin:{
          			email:'',
          			password:'',
        		}
			}
		},
		methods:{
			login(){
        		this.axios.post('login', this.userLogin)
        		.then(res => {
                
                this.$cookie.set('user', this.userLogin, 1);
                console.log(this.$cookie.get('user'));


          			this.$router.push({ path: `/home` })
        		})
        		.catch( e => {
                alert('Password and email do not match')
          			console.log(e.response.data.error)
        		})
      		},
		}
	}

</script>