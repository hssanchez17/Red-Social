<template>
<div class="hola">
	<div class="card mt-2">

    	<div class="card-header d-flex justify-content-between align-items-center">
         	<h3>Comments</h3>
            <button class="btn btn-success" id="btn-toggle-comment" @click="showMyComments2()"> Show All Comments</button>
            <button class="btn btn-success" id="btn-toggle-comment" @click="showAllComments()"> My comments</button>
        </div>

          
            <blockquote>
                <div class="form-group">
                	<textarea name="comment" class="form-control" rows="2" placeholder="Leave your Comment" v-model="comment.comment"></textarea>
                </div>

                <div class="form-group">
                	<button class="btn btn-success" id="btn-comment" @click="addAComment(comment)"> Post</button>
                </div>   

            </blockquote>
          

            <ul class="list-group p-4" v-for="comment1 in comments" v-if="showMyComments">
              <li class="list-group-item">
                <div class="row">
                  <a :href="`/user/show/${comment1.userId}`" class="col text-center">
                    <img :src="post.imageUrl" id="images" width="120px" height="120px" class="img-circle" />
                  </a>

                  <blockquote class="col">
                    <p class="lead">{{comment1.comment}}</p>
                    <footer class="blockquote-footer">{{comment1.user.email}}</footer>
                  </blockquote>
                </div>
              </li>
            </ul>


            <ul class="list-group p-4" v-for="comment2 in myComments" v-if="!showMyComments">
              <li class="list-group-item">
                <div class="row">
                  <a :href="`/user/show/${comment2.userId}`" class="col text-center">
                    <img :src="post.imageUrl" id="images" width="120px" height="120px" class="img-circle" />
                  </a>-

                  <blockquote class="col">
                    <p class="lead">{{comment2.comment}}</p>
                    <footer class="blockquote-footer">{{comment2.user.email}}</footer>
                  </blockquote>
                </div>
              </li>
            </ul>


          </div>




</div>

	</template>
<script>
		export default {

      props:['post','id'],
      
	data() {
	    return { 
        showComment:false,
        comments:{},
        comment:{comment:'',user:{email:''}},
        showMyComments:false,
        myComments:{}
      }
  	},

  	created(){
      this.getComments(),
      this.getCommentsFromUser()
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

      getCommentsFromUser(){
        this.axios.get(`/comment/from/user/${this.id}`)
        .then((response) => {
          console.log(response.data)
          this.myComments=response.data
        })
        .catch((e)=>{
          console.log('error' + e);
        })

      },


      addAComment(comment){
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
      },

      showMyComments2(){
        this.showMyComments=true
        console.log(this.showMyComments)
      },


      showAllComments(){
        this.showMyComments=false
      }
  	}

    	

    };


	</script>