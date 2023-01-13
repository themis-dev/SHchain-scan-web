import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import MainLayout from '../views/layout/MainLayout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/', redirect: '/home', hidden: true },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'Home',
    children: [{
      name: 'home',
      path: 'index',
      component: () => import('@/views/home/index')
    }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    // hidden: true,
    children: [{
      name: 'account',
      path: '/accounts/:pageSize/:pageNo',
      component: () => import('@/views/account/index')
    },
    {
      name: 'blocks',
      path: '/blocks/:pageSize/:pageNo',
      component: () => import('@/views/blocks/index')
    },
    {
      name: '/txs',
      path: '/txs/:pageSize/:pageNo',
      component: () => import('@/views/transations/index')
    },
    {
      name: 'tx',
      path: '/tx/:id',
      component: () => import('@/views/transations/detail')
    },
    {
      name: 'blockDetail',
      path: '/block/:id',
      component: () => import('@/views/blocks/detail')
    },
    {
      path: '/address/:id',
      name: 'address',
      component: () => import('@/views/address/index')
    },
    {
      path: '/validatorset/snapshot/:id',
      component: () => import('@/views/validatorset/snapshot')
    },
    {
      path: '/contractsVerified/:pageSize/:pageNo',
      component: () => import('@/views/contracts/index')
    },
    {
      path: '/verifyContract',
      component: () => import('@/views/contracts/verify')
    },
    {
      path: '/verifyContract-solc',
      component: () => import('@/views/contracts/verifyContract-solc')
    },
    {
      path: '/verifyContract-solc-multiple',
      component: () => import('@/views/contracts/verifyContract-solc-multiple')
    },
    {
      path: '/validators/:pageSize/:pageNo',
      component: () => import('@/views/validators/index')
    },
    {
      path: '/validatorset/:pageSize/:pageNo',
      component: () => import('@/views/validatorset/index')
    },
    {
      name: 'token',
      path: '/token/:id/:pageSize/:pageNo',
      component: () => import('@/views/token/detail')
    },
    {
      path: '/tokentxns/:pageSize/:pageNo',
      component: () => import('@/views/token/erc20')
    },
    {
      path: '/tokentxns-nft/:pageSize/:pageNo',
      component: () => import('@/views/token/erc720')
    },
    {
      path: '/tokentxns-nft1155/:pageSize/:pageNo',
      component: () => import('@/views/token/erc1155')
    },
    {
      path: '/nodes',
      component: () => import('@/views/nodes')
    },
    {
      path: '/node-candidate',
      component: () => import('@/views/nodes/nodeCandidate')
    },
    {
      path: '/nft/:id',
      component: () => import('@/views/token/nftDetail')
    },
  ]
  }
]

// 测试网路由，比主网多一个水龙头
const testnetRouters = [
  {
    path: '/faucet',
    component: () => import('@/views/faucet')
  },
  {
    path: '/error',
    component: () => import('@/views/500')
  },
  { path: '*', component: () => import('@/views/404'), hidden: true }
];

// 正式网路由
const mainnetRouters = [
  {
    path: '/error',
    component: () => import('@/views/500')
  },
  { path: '*', component: () => import('@/views/404'), hidden: true }
]

const currentRouters = process.env.NETWORK === 'mainnet' ? mainnetRouters : testnetRouters;
const routerList = constantRouterMap.concat(currentRouters);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routerList
})
