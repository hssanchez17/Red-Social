<template>
<div class="hola">
	<div class="card mt-2">

    	<div class="card-header d-flex justify-content-between align-items-center">
         	<h3>Comments</h3>
        </div>

          
            <blockquote>
                <div class="form-group">
                	<textarea name="comment" 
                  class="form-control" 
                  rows="2" 
                  placeholder="Leave your Comment" 
                  v-model.trim="$v.comment.comment.$model"  
                  :class="{'is-invalid':$v.comment.comment.$error,'is-valid':!$v.comment.comment.$invalid}">
                   

                  </textarea>

                   <span class="invalid-feedback" v-if="$v.comment.comment">Este campo no puede ser vacio</span>
                </div>

                <div class="form-group">
                	<button class="btn btn-success" id="btn-comment" @click="addAComment(comment)"> Post</button>
                </div>   

            </blockquote>
          

            <ul class="list-group p-4" v-for="comment1 in comments">
              <li class="list-group-item">
                <div class="row">
                  <a :href="`/user/show/${comment1.userId}`" class="col text-center">
                    <img :src="post.imageUrl" id="images" width="120px" height="120px" class="img-circle" />
                  </a>

                  <blockquote class="col">
                    <a :href="`/comment/show/${comment1.id}`" class="col text-center">
                      <p class="lead">{{comment1.comment}}</p>
                    </a>

                    <footer class="blockquote-footer">{{comment1.user.email}}</footer>
                  </blockquote>
                </div>
              </li>
            </ul>


          </div>




</div>

	</template>
<script>
  import {required} from 'vuelidate/lib/validators'
		export default {

      props:['post','id'],
      
	data() {
	    return { 
        showComment:false,
        comments:{},
        comment:{comment:'',user:{email:''}},
      }
  	},

     validations:{
      comment:{
        comment: {
            required
          }
      }
     },




  	created(){
      this.getComments()
    },



  	methods:{

      showAddComment(){
        this.showComment=true
      },


      getComments(){
        this.axios.get(`/comment/show/${this.id}`)
        .then((response) => {
          this.comments=response.data
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },



      addAComment(comment){
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.axios.post(`comment/add/${this.id}`,comment)
          .then((response) => {
            alert('Se agrego el comentario exitosamente')
            comment.user.email=response.data.email
            this.comments.push(comment)
            this.comment.comment=''
            this.getComments()
          })
          .catch( e => {
            console.log(e.response.data.error)
          })
        }
      },

      showAllComments(){
        this.showMyComments=false
      }
  	}

    	

    };


	</script>