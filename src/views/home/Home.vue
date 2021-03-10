<!--  -->
<template>
<div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
    ref="tabControl1" class="tabControl" v-show="isTabFixed"></tab-control>
    <scroll class="content"
     ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true" @pullingUp="loadMore">
                <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
    ref="tabControl2" ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
</scroll>
<back-top @click.native="backClick" v-show="isShowBackTop"></back-top> 
<!-- 组件监听加.navtive -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//导入所有的子组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
//导入公共的组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
//导入其他
import{getHomeMultidata,
        getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
export default {
//import引入的组件需要注入到对象中才能使用
name:'Home',
components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
},
//这里存放数据,
data(){
    return {
    banners:[],
    recommends:[],
    goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
    },
    currentType:'pop',
    isShowBackTop:false,
    tabOffsetTop:0,
    isTabFixed:false,
    saveY: 0,
    ItemImgListener:null
}
},
//监听属性 类似于data概念
computed: {
    showGoods(){
        return this.goods[this.currentType].list
    }
},
//监控data中的数据变化
watch: {},
//方法集合

//生命周期 - 创建完成（可以访问当前this实例）
created() {
    //请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

},
methods: {

    //事件监听相关的
    tabClick(index){
        switch(index){
            case 0:
                this.currentType='pop';
                break;
            case 1:
                this.currentType='new';
                break;
            case 2:
                this.currentType='sell';
                break;
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
    },

    // 网络请求相关
        getHomeMultidata(){
            getHomeMultidata().then((res) => {
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
    }).catch((err) => {      
    });
        },
        getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{     
           this.goods[type].list.push(...res.data.list);
           this.goods[type].page+=1
           //完成加载更多
           this.$refs.scroll.finishPullUp()
    })
    },
    backClick(){
        this.$refs.scroll && this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
        //判断backtop是否显示
        this.isShowBackTop=-(position.y)>1000
        //决定tabcontrol是否吸顶(position:fixed)
        this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
        this.getHomeGoods(this.currentType)
    },
       //获取tabcontrol的offsetTop
    //所有的组件都有一个属性叫$el  用于获取组件的属性
    swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    }
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
     
    const refresh =debounce(this.$refs.scroll.refresh)
        //3监听item图片加载完成
        //对监听的事件进行保存
        this.ItemImgListener = ()=>{
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
         }
    this.$bus.$on('itemImageLoad',this.ItemImgListener)


},
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
        //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.ItemImgListener)
    },

beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {
    
}, //生命周期 - 销毁完成

}

</script>
<style scoped>
 #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>