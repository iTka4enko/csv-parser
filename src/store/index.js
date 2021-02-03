import { createStore } from 'vuex'

import Papa from 'papaparse'

export default createStore({
  state: {
    users: [],
    fileExt: ''
  },
  mutations: {
    SAVE_USERS(state, data){
      state.users = data
    },
    GET_EXT(state, ext){
      state.fileExt = ext
    }
  },
  actions: {
    GET_EXT({commit}, fileName){
      let ext = fileName.split('.').pop();
      commit('GET_EXT', ext)

      return String(ext).toLowerCase()
    },
    PARSE_CSV({commit}, file){

        Papa.parse(file, {
            download: true,
            header: true,
            complete: function(result){
              const data = result.data.map((item, index) => {
                item = {"ID": index+1, ...item, "Duplicate with": ''}
                return item
              })
              commit('SAVE_USERS', data)
            }
        })

    }
  },
  modules: {
  }
})
