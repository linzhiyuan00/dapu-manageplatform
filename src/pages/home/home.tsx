import React, { useEffect, useState } from 'react';
import styles from './home.less';
import { Menu, Icon, Dropdown } from 'antd';
import router from 'umi/router';
import { $http, API } from '@/common/http';
import { CommonMap } from '@/common/map';
import { connect } from 'dva';
import { menuConfig, menuMap } from './home.config'
import { IconFont } from '@/components';
import Item from 'antd/lib/list/Item';
import headerleft_svg from '../../assets/indexlogo1.svg';
import headerright_svg from '../../assets/header-right.svg';
const { SubMenu } = Menu;

const Home = (props: any) => {
  const [username, setUsername] = useState('admin');
  const [selectedKeys, setSelectedKeys] = useState(['simManage']);
  const [menuNumTip, setMenuNumTip] = useState<{ [key: string]: number }>({
    pendingRenewOrder: 0,
    remitInfoSubmitAudit: 0,
    invoiceApplyAduit: 0
  });

  // 菜单选中
  const menuSelect = (item: any) => {
    const curMenuItem = menuMap[item.key];
    const newSelectedKeys = [item.key];
    setSelectedKeys(newSelectedKeys);
    router.push(curMenuItem.routePath)
  }

  useEffect(() => {
    // 刷新页面更新菜单选中
    const curRoute = window.location.hash.split('/')[window.location.hash.split('/').length - 1];
    setSelectedKeys([curRoute]);

  }, [])

  const quitAccount = () => {
    router.replace('/login');
    localStorage.setItem('login_token', '')
  }

  const menu = (
    <Menu>
      <div className={styles.quitbox} onClick={quitAccount}>
        <IconFont style={{ fontSize: 20, marginRight: 14 }} type="icon-a-Iconxianxing2020jiantoutuichu" />
        <div>退出登录</div>
      </div>
    </Menu>
  );

  return (
    <div className={styles.pagebody} >
      <div className={styles.pagetop}>
        <div className={styles.pageTop_left}>
          <img src={headerleft_svg} alt="" />
          <div className={styles.logo}></div>
        </div>
        <div className={styles.pageTop_right}>
          <img src={headerright_svg} alt="" />
          <div className={styles.usertip}>欢迎回来，{username}</div>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className={styles.user}>
              <div className={styles.userimg}></div>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className={styles.content} id="pageContent">
        <Menu
          className={styles.menu_antd}
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={menuSelect}
        >
          {
            menuConfig.map((item) => {
              if (item.children) {
                return <SubMenu
                  key={item.key}
                  title={
                    <span>
                      <IconFont style={{ fontSize: 20 }} type={item.iconType}></IconFont>
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {
                    item.children.map((item1) => {
                      return (
                        <Menu.Item key={item1.key}>{item1.title}
                          {
                            menuNumTip[item1.key] > 0 && (
                              <div className={styles.num}>{menuNumTip[item1.key]}</div>
                            )
                          }
                        </Menu.Item>
                      )

                    })
                  }
                </SubMenu>
              }
              return (
                <Menu.Item key={item.key}>
                  <IconFont style={{ fontSize: 20 }} type={item.iconType}></IconFont>
                  <span>{item.title}</span>
                </Menu.Item>
              )
            })
          }
        </Menu>
        <div className={styles.page_content}>
          {props.children}
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
