<template>
  <div id="app">
      <router-view />
      <footer-nav v-if="showFooter" :activeNavIndex="activeNavIndex"></footer-nav>
      <!-- <van-tabbar v-model="active">
          <van-tabbar-item icon="home-o" >标签</van-tabbar-item>
          <van-tabbar-item icon="search" >标签</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
     </van-tabbar> -->
  </div>
</template>
<script>
  import FooterNav from '@/components/FooterNav';
  export default {
    name: 'App',
    provide () {
      return {
      }
    },
  components: { FooterNav },
    data() {
      return {
        showFooter: false, // 是否显示底部导航 Tab
        activeNavIndex: 0, // 底部导航激活下标
        isRouterAlive: true, // 用于刷新页面用
        navTabs: ['Home', 'Category', 'Cart', 'Me'] // 底部导航
      };
    },
    watch: {
      $route(to, from) {
          console.log(to,'9999')
          this.showFooter= to.meta.showFooter
          const { navTabs } = this.$data;
          const toName = to.name;
          const fromName = from.name;
          switch (toName) {
            case 'Home': this.activeNavIndex = 0; break;
            case 'Category': this.activeNavIndex = 1; break;
            case 'Cart': this.activeNavIndex = 2; break;
            case 'Me': this.activeNavIndex = 3; break;
          }
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    #view {
      width: 100%;
      height: 100%;
    }
  }
</style>
