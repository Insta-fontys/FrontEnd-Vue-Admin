<template>
<div>
    <div class="panel">
        <div class="menu">
            <h1>sidemenu</h1>
            <button @click="showFans">fans</button>
            <button @click="showCreator">creators</button>
            <button @click="showPosts">posts</button>
            <button @click="logout">Logout</button>
        </div>
        <div class="content">
            <div v-if="selectFans">
                <div v-for="fan in fans" :key="fan.id" class="content-item">
                    <span>Username: {{fan.username}}</span>
                    <span>Email: {{fan.email}}</span>
                    <span>Tokens: {{fan.tokens}}</span>
                    <button @click="deleteFan(fan.username)">delete</button>
                </div>
            </div>
            <div v-if="selectCreators">
                <div>creators</div>
                <div v-for="creator in creators" :key="creator.id" class="content-item">
                    <span>Username: {{creator.username}}</span>
                    <span>Email: {{creator.email}}</span>
                    <span>Tokens: {{creator.tokens}}</span>
                    <button @click="deleteCreator(creator.username)">delete</button>
                </div>
            </div>
            <div v-if="selectPosts" class="images">
                <div v-for="post in posts" :key="post.id">
                    <ImageComponent :post="post" @delete="deletePost"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import api from '../wrappers/AdminWrapper.js'
import ImageComponent from '../components/ImageComponent.vue'

export default{
    components:{
        ImageComponent
    },
    data(){
        return{
            fans:[],
            creators:[],
            posts: [],
            selectFans: true,
            selectCreators: false,
            selectPosts: false
        }
    },
    async created(){
        this.fans = await api.getFans()
        this.creators = await api.getCreators();
        this.posts = await api.getPosts();
    },
    methods:{
        showFans(){
            this.deselectAll();
            this.selectFans = true;
        },
        showCreator(){
            this.deselectAll();
            this.selectCreators = true;
        },
        showPosts(){
            this.deselectAll();
            this.selectPosts = true
        },
        deselectAll(){
            this.selectFans = false
            this.selectCreators = false
            this.selectPosts = false
        },
        logout(){
            localStorage.removeItem('jwt')
            this.$router.push('login')
        },
        async deleteFan(username){
            var response = await api.deleteFan(username)
            if(response)
                alert("Fan has been deleted")
        },
        async deleteCreator(username){
            var response = await api.deleteCreator(username)
            if(response)
                alert("Creator has been deleted")
        },
        async deletePost(e){
            var response = await api.deletePost(e)
            if(response)
                alert("Post has been deleted")
        }
    }
}
</script>

 <style scoped>

    .panel{
        position: absolute;
        min-width: 700px;
        width: 70vw;
        height: 70vh;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: rgb(255, 0, 0);
        box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        flex-direction: column;
        align-items: center;
        display: grid;
        margin: auto;

        grid-template-rows: 20% 80%;
        grid-template-columns: 20% 80%;
    }

    .menu{
        display: flex;
        flex-direction: column;
    }

    .content{
        margin-top: 0;
        height: 100%;
    }
    
    .content-item{
        display: grid;
        
        grid-template-columns: 30% 30% 30% 10%;

        align-items: start;
    }

    .span{
        width: 50px;
        height: 50px;
        align-items: left;
        background: black;
    }
    
    .images{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
    }

 </style>