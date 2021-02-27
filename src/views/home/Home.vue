<!--  -->
<template>
<div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView'


import{getHomeMultidata} from 'network/home'

export default {
//import引入的组件需要注入到对象中才能使用
name:'Home',
components: {
    NavBar,
    HomeSwiper,
    RecommendView,
},
//这里存放数据
data(){
    return {
    banners:[],
    recommends:[]
}
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    //请求多个数据
    getHomeMultidata().then((res) => {
        console.log(res)
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
    }).catch((err) => {
        
    });
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        color: whitesmoke;
    }
</style>