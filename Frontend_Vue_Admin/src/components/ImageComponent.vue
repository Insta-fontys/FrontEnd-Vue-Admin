<template>
  <div>
    <img class="img" :src="post.image">
    <button @click="onClickDelete(post.id)">Delete</button>
  </div>
</template>

<script>
export default {
    name: 'PostItem',
    props: ['post'],
    emits:['delete'],
    methods:{
        onClickDelete(id){
            console.log("Post id = " + id)
            this.$emit('delete', id)
        }
    }
}
</script>

<style scoped>
    .img{
        display: block;
        max-width:200px;
        max-height:200px;
    }

</style>
