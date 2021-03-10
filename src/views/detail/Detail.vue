<!--  -->
<template>
<div class='detail'>
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
            <detail-swiper :topImages="topImages" >
            </detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imgageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
            <goods-list :goods="recommends"></goods-list>
    </scroll>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import {debounce} from '../../common/utils'


import GoodsList from 'components/content/goods/GoodsList'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'



export default {
//import引入的组件需要注入到对象中才能使用
name:'Detail',
components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
},
data() {
//这里存放数据
return {
    iid:null,
    topImages:null,
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    itemImgListener:null
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    imageLoad(){
        this.$refs.scroll.refresh()
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
//保存传入的iid
    this.iid=this.$route.params.iid
    //2 根据iid请求数据
    getDetail(this.iid).then(res=>{
        //获取顶部图片的轮播数据
        const data=res.result;
        this.topImages=data.itemInfo.topImages
           //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
         // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailInfo=data.detailInfo
        //获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //取出评论信息
        if(data.rate.cRate!==0){
            this.commentInfo=data.rate.list[0];
        }
    })
    //3请求推荐数据
    getRecommend().then(res=>{
        // console.log(res)
       this.recommends=res.data.list
    })
},

//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    let refresh=debounce(this.$refs.scroll.refresh,100)

    this.itemImgListener=()=>{
        refresh()
    }
    this.$bus.$on('itemimgLoad',this.itemImgListener)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {
    this.$bus.$off('itemimgLoad',this.itemImgListener)
}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
    .detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>