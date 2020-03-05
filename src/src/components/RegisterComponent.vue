<template>
	<b-form @submit.prevent="register()">

    	  <b-form-group id="NameInput">
          <b-form-input placeholder="Ingrese su nombre"  id="name"  v-model.trim="$v.userRegister.name.$model" :class="{'is-invalid':$v.userRegister.name.$error,'is-valid':!$v.userRegister.name.$invalid}">
          </b-form-input>
          <span  class="valid-feedback" >Su nombre es valido</span>
          <span  class="invalid-feedback"   v-if="$v.userRegister.name.$error">Ingrese su nombre</span>  
        </b-form-group>

        <b-form-group id="EmailInput">
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


          <span 
          class="invalid-feedback" 
          v-if="$v.userRegister.email.email && !submitEmail">
            Este campo no puede ser vacio
          </span>

          <span 
          class="invalid-feedback" 
          v-if="!$v.userRegister.email.isUnique">
            Ya se encuentra en el sistema
          </span>
        </b-form-group>

        <b-form-group id="PasswordInput">
          <b-form-input 
          type="password" 
          id="passwordRegister" 
          placeholder="Ingrese su Contraseña"  
          v-model.trim="$v.userRegister.password.$model" 
          :class="{'is-invalid':$v.userRegister.password.$error,'is-valid':!$v.userRegister.password.$invalid}">
          </b-form-input>


          <span  class="valid-feedback">Su contraseña coinciden</span>
          <span  class="invalid-feedback"  
          v-if="!$v.userRegister.password.minLength">
            La contraseña debe de ser minimo de 6
          </span> 
          <span  
          class="invalid-feedback"  
          v-if="!$v.userRegister.password.required">
            La contraseña no puede ser vacio
          </span> 
          <span  class="invalid-feedback"  v-if="!$v.userRegister.password.sameAsPassword">La contraseñas deben de ser iguales</span> 
       	</b-form-group>

        <b-form-group id="PasswordValidationInput">
          <b-form-input type="password" id="input-horizontal" placeholder="Repita su contraseña" v-model.trim="$v.userRegister.repeatPassword.$model" :class="{'is-invalid':$v.userRegister.repeatPassword.$error,
          'is-valid':(userRegister.password!='') ? !$v.userRegister.repeatPassword.$invalid:''}"></b-form-input>
          <span  class="valid-feedback" >Su contraseña coinciden</span>
          <span  class="invalid-feedback" v-if="!$v.userRegister.repeatPassword.sameAsPassword">La contraseñas deben de ser iguales</span> 
        </b-form-group>

        <b-button  type="submit" variant="primary">Registrarse</b-button>
    </b-form>

</template>


<script>
	import { required, minLength, between, email,sameAs} from 'vuelidate/lib/validators'
	export default{
		data(){
			return {
				userRegister:{
          			name:'',
          			email:'',
          			password:'',
          			repeatPassword:'',
        		},
        		submitEmail: false,
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
			register(){
		        this.$v.$touch()
		        if (!this.$v.$invalid) {
		          this.axios.post('register', this.userRegister)
		          .then(res => {
		          	alert('Successful registration can login')
		            this.userRegister.name=''
                this.userRegister.email=''
                this.userRegister.password=''
                this.userRegister.repeatPassword=''
		          })
		          .catch( e => {
		            this.submitEmail=true   
		            console.log(e.response.data.err.errors)
		          })
		        }    
		      }
		}
	}

</script>