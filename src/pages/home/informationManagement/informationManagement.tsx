import React, { useState, useEffect, useCallback } from 'react';
import { Button, Pagination } from 'antd';
import { CardList } from '@/components/index'
import { $http, API } from '@/common/http';
import router from 'umi/router';
import { getLangType } from '@/common/utils';
import { connect } from 'dva';


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

const InformationManagement = connect(mapStateToProps, mapDispatchToProps)((props: any) => {
  const { state: { global: { langType } } } = props;


  const [data, SetData] = useState<any[]>([]);
  const [total, SetTotal] = useState(0);
  const [tableLoading, SetTableLoading] = useState(false);
  const [Param, SetParam] = useState<any>({
    pageNum: 1,
    pageSize: 10
  });

  // 案例列表
  const queryList = useCallback(() => {
    SetTableLoading(true);
    $http.get(API.newsList + `?pageNum=${Param.pageNum}&pageSize=${Param.pageSize}&langType=${getLangType()}`).then((res: any) => {
      console.log('res::', res)
      if (res.code === 200) {
        SetTotal(res.total);
        SetData(res.rows.map((i) => {
          return {
            ...i,
            eyeCount: i.viewership
          }
        }))
        SetTableLoading(false);
      }
    })
  }, [Param])


  useEffect(() => {
    queryList();
  }, [Param, langType, queryList]);


  const onShowSizeChange = (current: number, pageSize: number) => {
    if (pageSize !== Param.pageSize) {
      current = 1;
    }
    SetParam({
      ...Param,
      pageNum: current,
      pageSize
    })
  }



  return (
    <div className="com_page">
      <div className="com_page_title">资讯管理</div>
      <div className="com_page_content">
        <div className="com_table_bar">
          <Button type='primary' icon='plus-circle' onClick={() => router.push({
            pathname: '/home/editor',
            query: {
              type: 'news',
              action: 'add'
            }
          })}> 添加资讯</Button>
        </div>
        <CardList list={data} type='news' loading={tableLoading} onChange={() => {
          queryList()
        }}></CardList>
        <Pagination style={{ textAlign: 'right', marginTop: 16 }}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={onShowSizeChange}
          current={Param.pageNum}
          pageSize={Param.pageSize}
          total={total}
        />
      </div>
    </div >
  );
})

export default InformationManagement;
