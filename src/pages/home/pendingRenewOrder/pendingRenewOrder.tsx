import React, { useState, useRef, useEffect } from 'react';
import styles from './pendingRenewOrder.less';
import logosvg from '@/assets/sim.svg';
import { Button, Icon, Input, Modal, message, Drawer } from 'antd';
import { ComForm, FromConfig, ComTable, ComShowCard, ComStatus, CardConfig, ComShowInfo, ShowInfoConfig, IconFont } from '@/components/index'
import { $http, API } from '@/common/http';
import { _showInfoConfig } from './pendingRenewOrder.config';
import { connect } from 'dva';
import { CommonMap } from '@/common/map';
import { paramHandle } from '@/common/utils';
const { Search } = Input;


const PendingRenewOrder = (props: { dispatch: any, state: any }) => {

  const queryTodoTotal = () => {
    props.dispatch({
      type: 'global/queryTodoTotal'
    });
  }

  const [cardListConfig, setCardListConfig] = useState([
    {
      title: '待审核订单笔数',
      content: 0,
      imgUrl: 'icon-a-Iconxianxing2020biaodan'
    },
    {
      title: '待审核订单金额(元)',
      content: '0.00',
      imgUrl: 'icon-a-Iconxianxing2020chongzhi'
    },

  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns: any[] = [
    {
      title: '订单编号',
      dataIndex: 'order_id',
    },
    {
      title: '套餐',
      dataIndex: 'package.package_name',
    },
    {
      title: '套餐价格',
      dataIndex: 'package.package_price',
      render: (_: any, record: any) => (
        <span>{record.package.package_price}元/年</span>
      ),
    },
    {
      title: '付款账号',
      dataIndex: 'account_id',
    },
    {
      title: '支付方式',
      dataIndex: 'pay_type',
      render: (_: any, record: any) => (
        <span>{CommonMap.pay_type[record.pay_type]}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'order_status',
      render: (_: any, record: any) => (
        <ComStatus type="order_status" value={record.order_status}></ComStatus>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <a onClick={() => { setCurdata_1(record); setVisible_2(true); }}>处理</a>
        </div>
      ),
    },

  ];

  const [data, SetData] = useState<any[]>([]);
  const [total, SetTotal] = useState(0);
  const [tableLoading, SetTableLoading] = useState(false);
  const [tableSearching,SetTableSearching] = useState(false);
  const [Param, SetParam] = useState<any>({
    page: 1,
    page_num: 10,
    wheres: {
      order_status: 1
    }
  });
  const [confirmLoading, SetconfirmLoading] = useState(false);


  useEffect(() => {
    // console.log('pr:', props)
    const newcardListConfig = [...cardListConfig];
    newcardListConfig[0].content = props.state.global.TodoTotal?.todo_order_num;
    newcardListConfig[1].content = props.state.global.TodoTotal?.todo_order_sum;
    setCardListConfig(newcardListConfig)
  }, [props])

  useEffect(() => {
    setShowInfoConfig_2(_showInfoConfig);
  }, [])

  useEffect(() => {
    queryOrderList();
    if(Object.keys(Param).length > 3 || Object.keys(Param.wheres).length > 1) {
      SetTableSearching(true)
    } else {
      SetTableSearching(false)
    }
  }, [Param]);


  // 订单列表
  const queryOrderList = () => {
    SetTableLoading(true);
    $http.post(API.queryOrdersList, paramHandle(Param)).then((res: any) => {
      SetTotal(res.data.order_count);
      SetData(res.data.orders)
      SetTableLoading(false);
    })
  }

  const onSelectChange = (newSelectedRowKeys: []) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 开通 1
  const [visible_1, setVisible_1] = useState(false);
  const [actionType_1, setActionType_1] = useState<'single' | 'mult'>('single');
  const [curData_1, setCurdata_1] = useState<any>({});
  const [fromConfig_1, setFromConfig_1] = useState<FromConfig[]>([{
    type: 'date',
    label: '开通时间',
    key: 'time',
    required: true
  }]);
  const [model_1, SetModel_1] = useState({});
  const fromRef_1: any = useRef();
  const handleOk_1 = () => {
    if (fromRef_1.current.vaild()) {
      SetconfirmLoading(true);
      $http.post(API.orderHandle, {
        order_ids: actionType_1 === 'single' ? [curData_1.order_id] : selectedRowKeys,
        open_time: fromRef_1.current._model.time.format('YYYY-MM-DD')
      }).then((res: any) => {
        SetconfirmLoading(false);
        message.success(res.msg)
        setVisible_1(false)
        if (res.code === 200) {
          setVisible_2(false);
          queryOrderList();
          fromRef_1.current.clear()
        }
      })
    }
  }


  // 详情 2
  const [visible_2, setVisible_2] = useState(false);
  const [showInfoConfig_2, setShowInfoConfig_2] = useState<ShowInfoConfig[]>([]);

  const onSearch = (e: any) => {
    SetParam({
      ...Param,
      page: 1,
      fuzzy_search: e,
    });
  }

  const tableOnchange = (pagination: any, filters: any, sorter: any) => {
    SetParam({
      ...Param,
      page: pagination.current,
      page_num: pagination.pageSize,
      sort: sorter?.order && [sorter.field, sorter.order]
    });
  }


  return (
    <div className="com_page">
      <div className="com_page_title">待处理套餐续费订单</div>
      <div className="com-card-list">
        {
          cardListConfig.map((item) => {
            return (
              <ComShowCard key={item.title} {...item}></ComShowCard>
            )
          })
        }
      </div>
      <div className="com_page_content">
        <div className="com_table_bar">
          <Button disabled={selectedRowKeys.length === 0} onClick={() => { setActionType_1('mult'); setVisible_1(true) }}><IconFont style={{ fontSize: 20 }} type="icon-a-Iconxianxing2020xuanzeqi" />批量处理</Button>
          <Search className='com_search com-right' style={{ width: 320 }} placeholder="请输入订单编号、付款账号进行搜索" onSearch={onSearch} enterButton />
        </div>
        <ComTable searching={tableSearching} loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowSelection={rowSelection} rowKey="order_id"></ComTable>
      </div>

      {/* 开通 */}
      <Modal
        title={actionType_1 === 'single' ? '确认开通' : '批量开通处理'}
        visible={visible_1}
        width={640}
        onOk={handleOk_1}
        confirmLoading={confirmLoading}
        onCancel={() => {setVisible_1(false);fromRef_1.current.clear()}}
      >
        <ComForm ref={fromRef_1} fromConfig={fromConfig_1} model={model_1}></ComForm>
      </Modal>

      {/* 处理 详情 */}
      <Drawer
        title="订单详情"
        placement="right"
        width={640}
        closable
        onClose={() => setVisible_2(false)}
        visible={visible_2}
        getContainer={() => document.getElementById('pageContent') as HTMLElement}
      >
        <ComShowInfo showInfoConfig={showInfoConfig_2} data={curData_1}></ComShowInfo>
        <div className="com-xcenter">
          <Button style={{ width: 360 }} size="large" type="primary" onClick={() => { setActionType_1('single'); setVisible_1(true); }}>确认开通</Button>
        </div>
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(PendingRenewOrder);
