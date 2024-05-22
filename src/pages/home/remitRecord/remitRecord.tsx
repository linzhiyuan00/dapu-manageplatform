import React, { useState, useRef, useEffect } from 'react';
import styles from './pendingRenewOrder.less';
import logosvg from '@/assets/sim.svg';
import { Button, Icon, Input, Modal, message, Drawer } from 'antd';
import { ComForm, FromConfig, ComTable, ComShowCard, CardConfig, ComShowInfo, ShowInfoConfig, ComFilter, ComStatus } from '@/components/index'
import { $http, API } from '@/common/http';
import { _showInfoConfig, _filterFormConfig, addEmit_fromConfig } from './remitRecord.config';
import { connect } from 'dva';
const { Search } = Input;
import { paramHandle } from '@/common/utils';
import { CommonMap } from '@/common/map';


const remitRecord = (props: { dispatch: any, state: any }) => {

  const queryRemitTotal = () => {
    props.dispatch({
      type: 'global/queryRemitTotal'
    });
  }

  const [cardListConfig, setCardListConfig] = useState([
    {
      title: '本月汇款笔数',
      content: 0,
      imgUrl: 'icon-a-Iconxianxing2020biaodan'
    },
    {
      title: '本月汇款金额(元)',
      content: '0.00',
      imgUrl: 'icon-a-Iconxianxing2020chongzhi'
    },
    {
      title: '累积汇款笔数',
      content: 0,
      imgUrl: 'icon-a-Iconxianxing2020biaodan'
    },
    {
      title: '累积汇款金额(元)',
      content: '0.00',
      imgUrl: 'icon-a-Iconxianxing2020chongzhi'
    },
  ]);

  const [filterFormConfig, SetFilterFormConfig] = useState<any>([]);

  const [data, SetData] = useState<any[]>([]);
  const [total, SetTotal] = useState(0);
  const [tableLoading, SetTableLoading] = useState(false);
  const [tableSearching, SetTableSearching] = useState(false);
  const [Param, SetParam] = useState<any>({
    page: 1,
    page_num: 10,
    remit_status: 2,
    wheres: {
      
    }
  });
  const columns: any[] = [
    {
      title: '账号',
      dataIndex: 'sanyi_account',
    },
    {
      title: '付款户名',
      dataIndex: 'remit_name',
    },
    {
      title: '汇款金额(元)',
      dataIndex: 'remit_amount',
      sorter: true
    },
    {
      title: '汇款时间',
      dataIndex: 'remit_time',
      sorter: true
    },
    {
      title: '联系号码',
      dataIndex: 'phone',
    },
    {
      title: '入账时间',
      dataIndex: 'handle_time',
      sorter: true
    },
    {
      title: '入账方式',
      dataIndex: 'entry_method',
      render: (_: any, record: any) => (
        <span>{CommonMap['entry_method'][record.entry_method]}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <a onClick={() => { setCurdata_1(record); setVisible_1(true); }}>查看详情</a>
        </div>
      ),
    },

  ];

  useEffect(() => {
    SetFilterFormConfig(_filterFormConfig);
    setFromConfig_2(addEmit_fromConfig);
    queryRemitTotal();
  }, [])

  useEffect(() => {
    const newcardListConfig = [...cardListConfig];
    newcardListConfig[0].content = props.state.global.RemitTotal?.month_remit_num;
    newcardListConfig[1].content = props.state.global.RemitTotal?.month_remit_sum;
    newcardListConfig[2].content = props.state.global.RemitTotal?.total_remit_num;
    newcardListConfig[3].content = props.state.global.RemitTotal?.total_remit_sum;
    setCardListConfig(newcardListConfig)
  }, [props])

  useEffect(() => {
    queryRemitList();
    if (Object.keys(Param).length > 4 || Object.keys(Param.wheres).length > 0) {
      SetTableSearching(true)
    } else {
      SetTableSearching(false)
    }
  }, [Param]);


  // 汇款订单列表 1
  const queryRemitList = () => {
    SetTableLoading(true);
    $http.post(API.queryRemitList, paramHandle(Param)).then((res: any) => {
      SetTotal(res.data.remit_count);
      SetData(res.data.remits)
      SetTableLoading(false);
    })
  }

  // 详情
  const [visible_1, setVisible_1] = useState(false);
  const [curData_1, setCurdata_1] = useState({});


  // 添加汇款
  const [visible_2, setVisible_2] = useState(false);
  const [fromConfig_2, setFromConfig_2] = useState<FromConfig[]>([]);
  const [model_2, SetModel_2] = useState({});
  const [addEmitLoading, SetAddEmitLoading] = useState(false);
  const fromRef_2: any = useRef();


  // 表格 onchange
  const tableOnchange = (pagination: any, filters: any, sorter: any) => {
    SetParam({
      ...Param,
      page: pagination.current,
      page_num: pagination.pageSize,
      sort: sorter?.order && [sorter.field, sorter.order]
    });
  }

  const onSearch = (e: any) => {
    SetParam({
      ...Param,
      fuzzy_search: e,
      page: 1,
    });
  }

  // 筛选
  const filterOk = (model: any) => {
    const wheres: any = {};
    const others: any = {};
    Object.keys(model).map((key) => {
      if (!key.includes('time')) {
        wheres[key] = model[key];
      } else {
        others[key] = model[key];
      }
    });
    SetParam({
      ...Param,
      page: 1,
      wheres: {
        ...Param.wheres,
        ...wheres
      },
      ...others
    });
  }

  // 手动添加汇款
  const addEmit = () => {
    if (fromRef_2.current.vaild()) {
      SetAddEmitLoading(true)
      const frommodel = fromRef_2.current._model;
      const param = {
        ...frommodel,
        remit_time: frommodel?.remit_time?.format('YYYY-MM-DD'),
        entry_method:2
      }
      $http.post(API.addEmit, param).then((res: any) => {
        SetAddEmitLoading(false)
        if (res.code === 200) {
          message.success(res.msg)
          setVisible_2(false)
          fromRef_2.current.clear();
          queryRemitList()
        } else {
          message.error(res.msg)
        }
      }, () => SetAddEmitLoading(false))


    }
  }

  return (
    <div className="com_page">
      <div className="com_page_title">汇款记录</div>
      <div className="com-card-list">
        {
          cardListConfig.map((item) => {
            return (
              <ComShowCard {...item} key={item.title}></ComShowCard>
            )
          })
        }
      </div>
      <div className="com_page_content">
        <div className="com_table_bar">
          <Button type='primary' onClick={() => { setVisible_2(true) }}><Icon type="plus-circle" />添加汇款</Button>
          <div className="com-right" style={{ display: 'flex' }}>
            <ComFilter buttonText="筛选记录" fromConfig={filterFormConfig} model={{ remit_time: undefined, entry_method: undefined, handle_time: undefined }} ok={filterOk}></ComFilter>
            <Search className='com_search' placeholder="请输入账号、付款户名进行搜索" onSearch={onSearch} enterButton />
          </div>
        </div>
        <ComTable searching={tableSearching} loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowKey="remit_id"></ComTable>
      </div>

      {/* 汇款记录详情 */}
      <Drawer
        title="汇款记录详情"
        placement="right"
        width={640}
        closable
        onClose={() => setVisible_1(false)}
        visible={visible_1}
        getContainer={() => document.getElementById('pageContent') as HTMLElement}
      >
        <ComShowInfo showInfoConfig={_showInfoConfig} data={curData_1}></ComShowInfo>
      </Drawer>


      <Modal
        title='手动添加汇款'
        visible={visible_2}
        width={640}
        onOk={addEmit}
        confirmLoading={addEmitLoading}
        onCancel={() => {setVisible_2(false);fromRef_2.current.clear();}}
      >
        <ComForm ref={fromRef_2} key="simedit" fromConfig={fromConfig_2} model={model_2}></ComForm>
      </Modal>

    </div>
  );
}

// export default PendingRenewOrder


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

export default connect(mapStateToProps, mapDispatchToProps)(remitRecord);
