<template>
<div class="app">
        <Navbar></Navbar>

  <div class="container">
    <div class="row row justify-content-md-center">

    <div class="col-md-8">
        <div class="card">

          <div class="card-header bg-secondary">
              <h3 class="card-title text-white">Editar Perfil</h3>
          </div>

          <div class="card-body text-center">

          	<b-form>

          		<b-form-group>
		          <b-form-input placeholder="Ingrese su nombre"  id="name"  v-model.trim="$v.user.name.$model" :class="{'is-invalid':$v.user.name.$error,'is-valid':!$v.user.name.$invalid}" ></b-form-input>

		          <span  class="valid-feedback" >Su nombre es valido</span>
		          <span  class="invalid-feedback"   v-if="$v.user.name.$error">Ingrese su nombre</span>  
		        </b-form-group>

		        <b-form-group>
		          	<b-form-input 
				        placeholder="Ingrese su Email" 
				        v-model.trim="$v.user.email.$model" 
				        :class="{'is-invalid':$v.user.email.$error,'is-valid':!$v.user.email.$invalid}"
				        v-on:keyup="submitEmail=false">
		        	</b-form-input>

			        <span  class="valid-feedback" >Su email es valido</span>

			        <span class="invalid-feedback" v-if="$v.user.email.required && !submitEmail " >Ingrese un email valido</span> 

			        <span class="invalid-feedback" v-if="$v.user.email.email && !submitEmail">Este campo no puede ser vacio</span>
			          
			        <span class="invalid-feedback" v-if="!$v.user.email.isUnique">Ya se encuentra en el sistema</span>
        		</b-form-group>


		        <b-form-group>
		          <b-form-input placeholder="Ingrese su Descripcion"  
		          id="aboutMe"  
		          v-model.trim="user.aboutMe" 
		          ></b-form-input>

		        </b-form-group>

                <div class="progress">
  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>

          	</b-form>

            <div class="form-group">
              <button class="btn btn-success" @click="updateProfile()">Editar Perfil</button>
            </div>

    
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 
</template>



<script>
  import { required, minLength, between, email,sameAs} from 'vuelidate/lib/validators'


  import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },  
    data() {
      return {
        user:{
          name:'',
          aboutMe:'',
          email:''
        },
        originalEmail:'',
        submitEmail: false,
        contador:0
        
      }
    },

    validations:{
       user:{
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
      }
    },

    created(){
    this.getProfile();
  },

    methods:{
    	
    	getProfile(){
    		this.axios.get('profile', { credentials: true })
      		.then((response) => {
        		this.user= response.data[0];
        		this.originalEmail=response.data[0].email
      		})
      		.catch((e)=>{
        		console.log('error' + e);
      		})
    	},

      updateProfile(){
        this.axios.put('profile/edit',this.user,{
          onUploadProgress:uploadEvent=>{
            console.log("Upload progress:"+ Math.round(uploadEvent.loaded/uploadEvent.total*100+'%'))
          }
        })
         .then(res => {
          alert('Se actualizo el usuario correctamente')
          this.$router.push({ path: `/user/profile` })
        })
        .catch( e => {
          console.log(e.response.data.error)
        })

      }

    	

    },


  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
        margin-top: 1.5%
}
</style>