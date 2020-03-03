import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('@/pages/Home')
const Category = () => import('@/pages/Category')
const Cart = () => import('@/pages/Cart')
const User = () => import('@/pages/User')
const GoodsDetails = () => import('@/pages/GoodsDetails')
const City = () => import('@/pages/City')
const Collection = () => import('@/pages/Collection')
const BrowseHistory = () => import('@/pages/BrowseHistory')
const CommentCenter = () => import('@/pages/CommentCenter')
const CommentGoods = () => import('@/pages/CommentGoods')
const CommentDetails = () => import('@/pages/CommentDetails')
const OrderManage = () => import('@/pages/OrderManage')
const Login = () => import('@/pages/Login')
const OrderPayment = () => import('@/pages/OrderPayment')
const AddressManage = () => import('@/pages/AddressManage')
const AddressEdit = () => import('@/pages/AddressEdit')
Vue.use(Router);
const router =  new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: { name: 'Home' }},
    { path: '/home', name: 'Home', component: Home, meta: { keepAlive: true,showFooter:true,}}, 
    { path: '/category', name: 'Category', component: Category, meta: { showFooter:true, } },
    { path: '/cart', name: 'Cart', component: Cart, meta: { showFooter:true, } },
    { path: '/me', name: 'Me', component: User, meta: { showFooter:true, } },
    { path: '/city', name: 'City', component: City, meta: { keepAlive: true, index: 5 } }, 
    { path: '/collection', name: 'Collection', component: Collection, meta: { index: 6 } },
    { path: '/browseHistory', name: 'BrowseHistory', component: BrowseHistory, meta: { index: 7 } },
    { path: '/orderManage', name: 'OrderManage', component: OrderManage, meta: { showFooter:true, } },
    { path: '/commentCenter', name: 'CommentCenter', component: CommentCenter, meta: { index: 9 } },
    { path: '/commentGoods', name: 'CommentGoods', component: CommentGoods, props: route => ({ goodsId: route.query.goodsId, order_id: route.params.order_id, orderNum: route.params.orderNum }), meta: { index: 10 } }, 
    { path: '/commentDetails', name: 'CommentDetails', component: CommentDetails, props: route => ({ commentId: route.query.commentId }), meta: { index: 11 } }, 
    { path: '/orderPayment', name: 'OrderPayment', component: OrderPayment, meta: { index: 12 } }, 
    { path: '/addressManage', name: 'AddressManage', component: AddressManage, meta: { index: 13 } },
    { path: '/addressEdit', name: 'AddressEdit', component: AddressEdit, meta: { index: 14 } },
    { path: '/goodsDetails', name: 'GoodsDetails', component: GoodsDetails, props: route => ({ goodsId: route.query.goodsId }), meta: { index: 19 } }, 
    { path: '/login', name: 'Login', component: Login, meta: { index: 20 } }, // 登录、注册
    { path: '*', redirect: { name: 'Home' } }
  ]
});
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.name
  next();
});

export default router;