<!--  -->
<template>
<div class="wrapper">
<ul class="content">
    <button @click="btnClick">按钮</button>
    <li>分类1</li>
    <li>分类2</li>
    <li>分类3</li>
    <li>分类4</li>
    <li>分类5</li>
    <li>分类6</li>
    <li>分类7</li>
    <li>分类8</li>
    <li>分类9</li>
    <li>分类10</li>
    <li>分类11</li>
    <li>分类12</li>
    <li>分类13</li>
    <li>分类14</li>
    <li>分类15</li>
    <li>分类16</li>
    <li>分类17</li>
    <li>分类18</li>
    <li>分类19</li>
    <li>分类20</li>
    <li>分类21</li>
    <li>分类22</li>
    <li>分类23</li>
    <li>分类24</li>
    <li>分类25</li>
    <li>分类26</li>
    <li>分类27</li>
    <li>分类28</li>
    <li>分类29</li>
    <li>分类30</li>
    <li>分类31</li>
    <li>分类32</li>
    <li>分类33</li>
    <li>分类34</li>
    <li>分类35</li>
    <li>分类36</li>
    <li>分类37</li>
    <li>分类38</li>
    <li>分类39</li>
    <li>分类40</li>
    <li>分类41</li>
    <li>分类42</li>
    <li>分类43</li>
    <li>分类44</li>
    <li>分类45</li>
    <li>分类46</li>
    <li>分类47</li>
    <li>分类48</li>
    <li>分类49</li>
    <li>分类50</li>
    <li>分类51</li>
    <li>分类52</li>
    <li>分类53</li>
    <li>分类54</li>
    <li>分类55</li>
    <li>分类56</li>
    <li>分类57</li>
    <li>分类58</li>
    <li>分类59</li>
    <li>分类60</li>
    <li>分类61</li>
    <li>分类62</li>
    <li>分类63</li>
    <li>分类64</li>
    <li>分类65</li>
    <li>分类66</li>
    <li>分类67</li>
    <li>分类68</li>
    <li>分类69</li>
    <li>分类70</li>
    <li>分类71</li>
    <li>分类72</li>
    <li>分类73</li>
    <li>分类74</li>
    <li>分类75</li>
    <li>分类76</li>
    <li>分类77</li>
    <li>分类78</li>
    <li>分类79</li>
    <li>分类80</li>
    <li>分类81</li>
    <li>分类82</li>
    <li>分类83</li>
    <li>分类84</li>
    <li>分类85</li>
    <li>分类86</li>
    <li>分类87</li>
    <li>分类88</li>
    <li>分类89</li>
    <li>分类90</li>
    <li>分类91</li>
    <li>分类92</li>
    <li>分类93</li>
    <li>分类94</li>
    <li>分类95</li>
    <li>分类96</li>
    <li>分类97</li>
    <li>分类98</li>
    <li>分类99</li>
    <li>分类100</li>
</ul>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from 'better-scroll'

export default {
//import引入的组件需要注入到对象中才能使用
name:'Category',
components: {},
data() {
//这里存放数据
return {
    scroll:null
};  
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    btnClick(){
        console.log('点击')
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.scroll=new BScroll(document.querySelector('.wrapper'),{    
        probeType:3,
        pullUpLoad:true,
    })
    this.scroll.on('scroll',(position)=>{
        console.log(position)
    })
    this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多')
    })
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
    .wrapper{
        height: 150px;
        background-color: red;

        overflow-y: scroll;
    }
</style>