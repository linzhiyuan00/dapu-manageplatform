import React, { useState } from 'react';
import styles from './login.less';
import Applogo from '../../assets/logo.svg';
import accountIcon from '../../assets/account.png';
import passwordIcon from '../../assets/password.png';
import { Input, Button, message } from 'antd';
import { $http, API } from '@/common/http';
import router from 'umi/router';

export default function (props: any) {
  const [errorTip, SetErrorTip] = useState('');
  const [account, SetAccount] = useState('');
  const [password, SetPassword] = useState('');
  const [accountError, SetAccountError] = useState(false);
  const [passwordError, SetPasswordError] = useState(false);
  const [loginloading, SetLoginloading] = useState(false)


  const login = () => {
    if (account.trim() === '' && password.trim() === '') {
      SetAccountError(true);
      SetPasswordError(true);
      SetErrorTip('账号和密码未填')
      return;
    } else if (account.trim() === '') {
      SetAccountError(true);
      SetErrorTip('账号未填');
      return;
    } else if (password.trim() === '') {
      SetPasswordError(true);
      SetErrorTip('密码未填');
      return;
    }
    SetLoginloading(true);
    $http.post(API.login, { username: account, password }).then((res: any) => {
      SetLoginloading(false);
      if (res.code === 200) {
        message.success('登录成功');
        router.push('/home/contactUsManage');
      } else {
        SetErrorTip(res.msg)
      }
    }, (err) => { console.log(err); SetLoginloading(false); SetErrorTip('对不起，网络繁忙，请稍后重试') })
  }


  const enterLogin = (key: string) => {
    if (key === 'Enter') {
      login();
    }
  }

  return (
    <div className={styles.loginpage}>
      <div className={styles.content}>
        <div className={styles.centerbox}>
          <div className={styles.left}>
            <img src={Applogo} alt="" />
            <div className={styles.textcontent}>
              <div className={styles.maintitle}>达普生物</div>
              <div className={styles.destitle}>欢迎登录达普生物官网管理平台</div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.loginbox}>
              <div className={styles.loginTip}>请登录您的账户</div>
              <div className={styles.errorTip}>{errorTip}</div>
              <div className={accountError ? styles.inputItem + ' ' + styles.error : styles.inputItem}>
                <img src={accountIcon} alt="" />
                <Input onKeyUp={(e) => enterLogin(e.key)} value={account} placeholder="账号" onChange={(e) => { SetAccount(e.currentTarget.value); SetErrorTip(''); SetAccountError(false) }} size="large"></Input>
              </div>
              <div className={passwordError ? styles.inputItem + ' ' + styles.error : styles.inputItem}>
                <img src={passwordIcon} alt="" />
                <Input onKeyUp={(e) => enterLogin(e.key)} value={password} placeholder="密码" onChange={(e) => { SetPassword(e.currentTarget.value); SetErrorTip(''); SetPasswordError(false) }} size="large"></Input>
              </div>
              <div className={styles.loginfooter}>
                <Button loading={loginloading} type="primary" size="large" onClick={login}>登录</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        Copyright © 2017-2024 浙江达普生物科技有限公司
      </div>
    </div>
  );
}
