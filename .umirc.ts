import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'hash',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/testEditor/',
          component: './testEditor/index.tsx',
        },
        {
          path: '/',
          component: './login/login.tsx',
        },
        {
          path: '/login/',
          component: './login/login.tsx',
        },
        {
          path: '/home/',
          component: './home/home.tsx',
          routes: [
            {
              path: '/home/',
              component: './home/simManage/simManage.tsx',
            },
            {
              path: '/home/simManage',
              component: './home/simManage/simManage.tsx',
            },
            // {
            //   path: '/home/pendingRenewOrder',
            //   component: './home/pendingRenewOrder/pendingRenewOrder.tsx',
            // },
            {
              path: '/home/orderRecord',
              component: './home/orderRecord/orderRecord.tsx',
            },
            {
              path: '/home/remitInfoSubmitAudit',
              component: './home/remitInfoSubmitAudit/remitInfoSubmitAudit.tsx',
            },
            {
              path: '/home/remitRecord',
              component: './home/remitRecord/remitRecord.tsx',
            },
            {
              path: '/home/invoiceApplyAduit',
              component: './home/invoiceApplyAduit/invoiceApplyAduit.tsx',
            },
            {
              path: '/home/invoiceRecord',
              component: './home/invoiceRecord/invoiceRecord.tsx',
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'hongyun-manageplatform',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  // proxy: {
  //   "/api": {
  //     target: 'https://hongyun.hopechart.com:12343/api',
  //     secure: false,
  //     changeOrigin: true,
  //   }
  // },
  // devServer: {
  //   https: true
  // },
  theme: {
    "primary-color": "#0471E3",
  }
}

export default config;
