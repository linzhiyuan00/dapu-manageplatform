import React, { useState, useEffect, useRef } from 'react';
import styles from './invoiceRecord.less';
import { Button, Icon, Input, Drawer, Modal, Tabs, message } from 'antd';
import { ComTable, ComShowCard, CardConfig, ComShowInfo, ShowInfoConfig, ComFilter, IconFont, ComForm, FromConfig } from '@/components/index'
import { _showInfoConfig, _filterFormConfig, addinvoice_fromConfig } from './invoiceRecord.config';
import { CommonMap, mapToArr } from '@/common/map';
import { $http, API } from '@/common/http';
import { paramHandle } from '@/common/utils';
import { connect } from 'dva';
const { Search } = Input;

const { TabPane } = Tabs;


const invoiceRecord = (props: { dispatch: any, state: any }) => {

  const queryInvoiceTotal = () => {
    props.dispatch({
        type: 'global/queryInvoiceTotal'
    });
}

  const [cardListConfig, setCardListConfig] = useState([
    {
      title: '本月订单笔数',
      content: 0,
      imgUrl: 'icon-a-Iconxianxing2020biaodan'
    },
    {
      title: '本月订单金额(元)',
      content: '0.00',
      imgUrl: 'icon-a-Iconxianxing2020chongzhi'
    },
    {
      title: '累积订单笔数',
      content: 0,
      imgUrl: 'icon-a-Iconxianxing2020biaodan'
    },
    {
      title: '累积订单金额(元)',
      content: '0.00',
      imgUrl: 'icon-a-Iconxianxing2020chongzhi'
    },
  ]);

  const columns: any[] = [
    {
      title: '账号',
      dataIndex: 'sanyi_account',
    },
    {
      title: '开票金额（元）',
      dataIndex: 'invoice_amount',
    },
    {
      title: '开票类型',
      dataIndex: 'invoice_type',
      render: (_: any, record: any) => (
        <span>{CommonMap['invoice_type'][record.invoice_type]}</span>
      ),
    },
    {
      title: '发票代码',
      dataIndex: 'invoice_code',
    },
    {
      title: '发票号码',
      dataIndex: 'invoice_num',
    },
    {
      title: '开票时间',
      dataIndex: 'invoice_time',
      sorter: true
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

  const [exportLoading, SetExportLoading] = useState(false);

  const [data, SetData] = useState<any[]>([]);
  const [total, SetTotal] = useState(0);
  const [tableLoading, SetTableLoading] = useState(false);
  const [tableSearching, SetTableSearching] = useState(false);
  const [Param, SetParam] = useState<any>({
    page: 1,
    page_num: 10,
    invoice_status: 2,
    wheres: {
      
    }
  });

  // 开票列表
  const invoiceList = () => {
    SetTableLoading(true);
    $http.post(API.invoiceList, paramHandle(Param)).then((res: any) => {
      SetTotal(res.data.invoice_count);
      SetData(res.data.invoice)
      SetTableLoading(false);

    }, () => SetTableLoading(false))
  }


  useEffect(() => {
    invoiceList();
    if (Object.keys(Param).length > 4 || Object.keys(Param.wheres).length > 0) {
      SetTableSearching(true)
    } else {
      SetTableSearching(false)
    }
  }, [Param]);

  useEffect(() => {
    const newcardListConfig = [...cardListConfig];
    newcardListConfig[0].content = props.state.global.InvoiceTotal?.month_invoice_num;
    newcardListConfig[1].content = props.state.global.InvoiceTotal?.month_invoice_sum;
    newcardListConfig[2].content = props.state.global.InvoiceTotal?.total_invoice_num;
    newcardListConfig[3].content = props.state.global.InvoiceTotal?.total_invoice_sum;
    setCardListConfig(newcardListConfig)
  }, [props])

  useEffect(() => {
    queryInvoiceTotal();
    setShowInfoConfig_1(_showInfoConfig);
    setAddInvoice_fromConfig(addinvoice_fromConfig);
  }, [])

  // 详情 1
  const [visible_1, setVisible_1] = useState(false);
  const [showInfoConfig_1, setShowInfoConfig_1] = useState<any>([]);
  const [showInfodata_1, setShowInfodata_1] = useState({});
  const [curData_1, setCurdata_1] = useState<any>({});

  // 添加发票
  const [addInvoiceShow, SetAddInvoiceShow] = useState(false);
  const [addInvoiceLoading, SetAddInvoiceLoading] = useState(false);
  const [addInvoice_fromConfig, setAddInvoice_fromConfig] = useState<{ 1: FromConfig[], 2: FromConfig[] }>({ 1: [], 2: [] });
  const [addInvoice_model, SetAddInvoice_model] = useState({});
  const [curAddInvoiceType, SetCurAddInvoiceType] = useState<'1' | '2'>('2');
  const addInvoiceFromRef: any = useRef();


  // 添加汇款
  const addInvoice = () => {
    if (addInvoiceFromRef.current.vaild()) {
      SetAddInvoiceLoading(true)
      const frommodel = addInvoiceFromRef.current._model;
      const param = {
        ...frommodel,
        invoice_time: frommodel.invoice_time?.format('YYYY-MM-DD'),
        invoice_type: +curAddInvoiceType,
        entry_method: 2
      }
      $http.post(API.addInvoice, param).then((res: any) => {
        SetAddInvoiceLoading(false)
        if (res.code === 200) {
          message.success(res.msg)
          SetAddInvoiceShow(false)
          addInvoiceFromRef.current.clear();
          invoiceList();
        } else {
          message.error(res.msg)
        }
      }, () => SetAddInvoiceLoading(false))


    }
  }

  // 搜索
  const onSearch = (e: any) => {
    SetParam({
      page: 1,
      ...Param,
      fuzzy_search: e,
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

  // 表格 onchange
  const tableOnchange = (pagination: any, filters: any, sorter: any) => {
    SetParam({
      ...Param,
      page: pagination.current,
      page_num: pagination.pageSize,
    });
  }


  const addInvoiceTabTitle = () => {
    return (
      <Tabs onChange={(e) => SetCurAddInvoiceType(e as '1' | '2')}>
        <TabPane tab="企业普票" key="2"></TabPane>
        <TabPane tab="个人普票" key="1"></TabPane>
      </Tabs>
    )
  }

  return (
    <div className="com_page">
      <div className="com_page_title">开票记录</div>
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
          <Button loading={exportLoading} type="primary" onClick={() => { SetAddInvoiceShow(true) }}>
            {/* <IconFont type="icon-a-Iconmianxing2424daiquancuohao" /> */}
            <Icon type="plus-circle" />
            添加发票</Button>
          <div className='com-right' style={{ display: 'flex' }}>
            <ComFilter fromConfig={_filterFormConfig} model={{ invoice_type: undefined, handle_time: undefined }} ok={filterOk}></ComFilter>
            <Search className='com_search' placeholder="请输入账号进行搜索" onSearch={onSearch} enterButton />
          </div>
        </div>
        <ComTable searching={tableSearching} loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowKey="invoice_id"></ComTable>
      </div>


      {/* 发票详情 */}
      <Drawer
        title="发票详情"
        placement="right"
        width={640}
        closable
        onClose={() => setVisible_1(false)}
        visible={visible_1}
        getContainer={() => document.getElementById('pageContent') as HTMLElement}
      >
        <ComShowInfo showInfoConfig={showInfoConfig_1[curData_1.invoice_type]} data={curData_1}></ComShowInfo>
      </Drawer>



      <Modal
        className='addInvoiceModal'
        title={addInvoiceTabTitle()}
        visible={addInvoiceShow}
        width={640}
        onOk={addInvoice}
        confirmLoading={addInvoiceLoading}
        onCancel={() => {SetAddInvoiceShow(false);addInvoiceFromRef.current.clear();}}
      >
        <ComForm ref={addInvoiceFromRef} fromConfig={addInvoice_fromConfig[curAddInvoiceType]} model={addInvoice_model}></ComForm>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(invoiceRecord);
