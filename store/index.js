import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
     flag_id:""
  },
  mutations: {
      setFlagId(state,val){
            console.log(val,"设置全局flagid")
            state.flag_id = val;
      },
  
  }
})

export default store