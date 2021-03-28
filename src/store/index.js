import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store =new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCart(state,payload){
            // let oldProduct=null
            // //payload 新添加的商品
            // for(let item of state.cartList){
            //     if(item.iid === payload,iid){
            //         oldProduct=item
            //     }
            // }
            //查找之前数组中是否有该商品
            let oldProduct = state.cartList.find(item=>item.iid === payload.iid)
            //判断oldProduct
            if(oldProduct){
                oldProduct.count+-1
            }else{
                payload.count=1
                state.cartList.push(payload)
            }
            
        }
    }
})
//挂载到vue实例上
export default store