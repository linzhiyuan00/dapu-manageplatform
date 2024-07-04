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
              component: './home/contactUsManage/contactUsManage.tsx',
            },
            {
              path: '/home/contactUsManage',
              component: './home/contactUsManage/contactUsManage.tsx',
            },
            {
              path: '/home/applicationCases',
              component: './home/applicationCases/applicationCases.tsx',
            },
            {
              path: '/home/informationManagement',
              component: './home/informationManagement/informationManagement.tsx',
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
      title: '达普-官网管理平台',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      target: 'http://114.55.225.21:8097',
      secure: false,
      changeOrigin: true,
    }
  },
  devServer: {
    // https: true
    
  },
  theme: {
    "primary-color": "#0471E3",
  }
}

export default config;
