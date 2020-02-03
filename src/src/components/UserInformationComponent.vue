<template>
	<div>
              <h4 class="card-title mt-3">{{user.name}}</h4>
              <p>{{user.aboutMe}}</p>
              <p>{{user.email}}</p>
              <p> <strong>{{user.posts.length}}</strong> Posts</p>
              <a :href="`/friend/list/followers/people/${user.id}`">
                <p><strong>{{user.followers.length}}</strong> Followers</p>
              </a>
              <a :href="`/friend/list/following/people/${user.id}`">
                <p><strong>{{user.following.length}}</strong> Following</p>
              </a>
    </div>

</template>


<script>
	export default{
		props:['user'],

	}

</script>