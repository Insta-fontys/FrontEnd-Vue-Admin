<template>
    <div class="item">
        <div>{{this.username}}</div>
        <div>Hello</div>
        <div>{{this.email}}</div>
        <div>{{this.token}}</div>
        <button @click="Delete(fan.username)">delete</button>
    </div>
</template>

<script>
export default{
    name: "User",
    props:{
        username: String,
        email: String,
        tokens: Number, 
    },
    methods:{
        Delete(){

        }
    }
}
</script>

<style scoped>
    .item{
        display: flex;
    }
</style>
