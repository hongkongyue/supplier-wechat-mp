import * as types from './mutations-type';

const mutations = {
  // 设置 state 中 addressInfo
  [types.ADDRESS_INFO](state, addressInfo) {
    state.addressInfo = addressInfo;
  },
  // 设置 state 中 tempAddress
  [types.TEMP_ADDRESS](state, tempAddress) {
    state.tempAddress = tempAddress;
  },
  [types.INCREASE_INDEX](state,item){
    console.log(item,'9090')
    state.indexList.push(item)
  },
  [types.DECREASE_INDEX](state,item){
    state.indexList.splice(1,item)
   },
};
export default mutations;
