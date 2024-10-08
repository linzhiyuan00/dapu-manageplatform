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
            {
              path: '/home/editor',
              component: './home/editor/editor.tsx',
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
      target: 'http://47.96.189.4:8097',
      secure: false,
      changeOrigin: true,
    },
    "/file": {
      target: 'http://47.96.189.4:8097',
      secure: true,
      changeOrigin: true,
    }
  },
  devServer: {
    // https: true
    
  },
  theme: {
    "primary-color": "#0215C1",
  }
}

export default config;
