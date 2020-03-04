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
};
export default mutations;
