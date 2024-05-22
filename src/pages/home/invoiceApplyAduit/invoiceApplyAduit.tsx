import React, { useState, useRef, useEffect } from 'react';
import styles from './pendingRenewOrder.less';
import logosvg from '@/assets/sim.svg';
import { Button, Tabs, Input, Modal, message, Drawer, Select } from 'antd';
import { ComForm, FromConfig, ComTable, ComShowCard, ComStatus, CardConfig, ComShowInfo, ShowInfoConfig } from '@/components/index'
import { $http, API } from '@/common/http';
import { _showInfoConfig1, _showInfoConfig2, _openInvoiceFromConfig } from './invoiceApplyAduit.config';
import { connect } from 'dva';
import { paramHandle } from '@/common/utils';
import { CommonMap, mapToArr } from '@/common/map';
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;



const invoiceApplyAduit = (props: { dispatch: any, state: any }) => {

    const queryTodoTotal = () => {
        props.dispatch({
            type: 'global/queryInvoiceTodoTotal'
        });
    }

    const [cardListConfig, setCardListConfig] = useState([
        {
            title: '待审核汇款笔数',
            content: 0,
            imgUrl: 'icon-a-Iconxianxing2020biaodan'
        },
        {
            title: '待审核汇款金额(元)',
            content: '0.00',
            imgUrl: 'icon-a-Iconxianxing2020chongzhi'
        },

    ]);

    const columns1: any[] = [
        {
            title: '账号',
            dataIndex: 'sanyi_account',
        },
        {
            title: '开票金额(元)',
            dataIndex: 'invoice_amount',
            sorter: true
        },
        {
            title: '开票账单',
            dataIndex: 'invoice_month',
        },
        {
            title: '开票类型',
            dataIndex: 'invoice_type',
            render: (_: any, record: any) => (
                <span>{CommonMap['invoice_type'][record.invoice_type]}</span>
            ),
        },
        {
            title: '提交时间',
            dataIndex: 'create_time',
            sorter: true
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <div>
                    <a onClick={() => { setShowInfodata_1(record); setVisible_1(true); }}>审核</a>
                </div>
            ),
        },

    ];

    const columns2: any[] = [
        {
            title: '账号',
            dataIndex: 'sanyi_account',
        },
        {
            title: '开票金额(元)',
            dataIndex: 'invoice_amount',
            sorter: true
        },
        {
            title: '开票账单',
            dataIndex: 'invoice_month',
        },
        {
            title: '开票类型',
            dataIndex: 'invoice_type',
            render: (_: any, record: any) => (
                <span>{CommonMap['invoice_type'][record.invoice_type]}</span>
            ),
        },
        {
            title: '提交时间',
            dataIndex: 'create_time',
            sorter: true
        },
        {
            title: '状态',
            dataIndex: 'invoice_status',
            sorter: true,
            render: (_: any, record: any) => (
                <ComStatus type="invoice_status" value={record.invoice_status}></ComStatus>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <div>
                    <a onClick={() => { setShowInfodata_2(record); setVisible_2(true); }}>查看详情</a>
                </div>
            ),
        },

    ];

    const [data1, SetData1] = useState<any[]>([]);
    const [data2, SetData2] = useState<any[]>([]);
    const [total1, SetTotal1] = useState(0);
    const [total2, SetTotal2] = useState(0);
    const [tableLoading1, SetTableLoading1] = useState(false);
    const [tableLoading2, SetTableLoading2] = useState(false);
    const [tableSearching1, SetTableSearching1] = useState(false);
    const [tableSearching2, SetTableSearching2] = useState(false);
    const [Param1, SetParam1] = useState<any>({
        page: 1,
        page_num: 10,
        invoice_status: 1,
        wheres: {
            
        }
    });

    const [Param2, SetParam2] = useState<any>({
        page: 1,
        page_num: 10,
        invoice_status: [2, 3],
        wheres: {
            
        }
    });
    const [confirmLoading, SetconfirmLoading] = useState(false);

    // 汇款订单列表 1
    const queryInvoiceList1 = () => {
        SetTableLoading1(true);
        $http.post(API.invoiceList, paramHandle(Param1)).then((res: any) => {
            SetTotal1(res.data.invoice_count);
            SetData1(res.data.invoice)
            SetTableLoading1(false);
        })
    }

    // 汇款订单列表 2
    const queryInvoiceList2 = () => {
        SetTableLoading2(true);
        $http.post(API.invoiceList, paramHandle(Param2)).then((res: any) => {
            SetTotal2(res.data.invoice_count);
            SetData2(res.data.invoice)
            SetTableLoading2(false);
        })
    }

    useEffect(() => {
        queryInvoiceList1();
        if (Object.keys(Param1).length > 4  || Object.keys(Param1.wheres).length > 0) {
            SetTableSearching1(true)
          } else {
            SetTableSearching1(false)
          }
    }, [Param1]);

    useEffect(() => {
        queryInvoiceList2();
        if (Object.keys(Param2).length > 4  || Object.keys(Param2.wheres).length > 0) {
            SetTableSearching2(true)
          } else {
            SetTableSearching2(false)
          }
    }, [Param2]);

    useEffect(() => {
        const newcardListConfig = [...cardListConfig];
        newcardListConfig[0].content = props.state.global.InvoiceTodoTotal?.todo_invoice_num;
        newcardListConfig[1].content = props.state.global.InvoiceTodoTotal?.todo_invoice_sum;
        setCardListConfig(newcardListConfig)
    }, [props])

    useEffect(() => {
        queryTodoTotal();
        setFromConfig_1(_openInvoiceFromConfig)
        setShowInfoConfig1(_showInfoConfig1);
        setShowInfoConfig2(_showInfoConfig2);
    }, [])

    // 审核 1
    const [visible_1, setVisible_1] = useState(false);
    const [showInfoConfig1, setShowInfoConfig1] = useState<any>([]);
    const [showInfodata_1, setShowInfodata_1] = useState<any>({});
    const [visible_3, setVisible_3] = useState(false);
    const [visible_4, setVisible_4] = useState(false);
    const [invoice_status, Setinvoice_status] = useState(1);
    // 开票通过
    const [fromConfig_1, setFromConfig_1] = useState<FromConfig[]>([]);
    const [model_1, SetModel_1] = useState({});
    const fromRef_1: any = useRef();

    // 开票拒绝
    const [fromConfig_2, setFromConfig_2] = useState<FromConfig[]>([{
        type: 'textArea',
        label: '未通过原因',
        key: 'note',
        required: true,
        templateOptions: {
            placeholder: '请输入未通过原因',
            style: {
                width: '360px'
            }
        }
    }]);
    const [model_2, SetModel_2] = useState({});
    const fromRef_2: any = useRef();

    // 详情 2
    const [visible_2, setVisible_2] = useState(false);
    const [showInfoConfig2, setShowInfoConfig2] = useState<any>({ 1: { 2: [], 3: [] }, 2: { 2: [], 3: [] } });
    const [showInfodata_2, setShowInfodata_2] = useState<any>({});

    const onSearch = (e: any, tab: number) => {
        if (tab === 1) {
            SetParam1({
                ...Param1,
                page: 1,
                fuzzy_search: e,
            });
        } else {
            SetParam2({
                ...Param2,
                page: 1,
                fuzzy_search: e,
            });
        }
    }

    // 表格 onchange
    const tableOnchange1 = (pagination: any, filters: any, sorter: any) => {
        SetParam1({
            ...Param1,
            page: pagination.current,
            page_num: pagination.pageSize,
            sort: sorter?.order && [sorter.field, sorter.order]
        });
    }

    // 表格 onchange
    const tableOnchange2 = (pagination: any, filters: any, sorter: any) => {
        SetParam2({
            ...Param2,
            page: pagination.current,
            page_num: pagination.pageSize,
            sort: sorter?.order && [sorter.field, sorter.order]
        });
    }

    const tabChange: any = (key: string) => {
        if (key === '1') {
            queryInvoiceList1();
            return;
        }
        queryInvoiceList2();
    }

    // 开票通过
    const openInvaiceok = () => {
        if (fromRef_1.current.vaild()) {
            const frommodel = fromRef_1.current._model;
            const param = {
                invoice_id: showInfodata_1.invoice_id,
                invoice_status: 2,
                ...frommodel,
                invoice_time: frommodel?.invoice_time?.format('YYYY-MM-DD hh:mm:ss')
            }
            SetconfirmLoading(true);
            $http.post(API.invocieHandle, param).then((res: any) => {
                SetconfirmLoading(false);
                setVisible_1(false);
                setVisible_3(false);
                if (res.code === 200) {
                    message.success(res.msg);
                    queryInvoiceList1();
                    queryTodoTotal();
                    fromRef_1.current.clear();
                } else {
                    message.error(res.msg)
                }
            })


        }
    }

    // 开票拒绝
    const openInvaiceokreject = () => {
        if (fromRef_2.current.vaild()) {
            const frommodel = fromRef_2.current._model;
            const param = {
                invoice_id: showInfodata_1.invoice_id,
                invoice_status: 3,
                ...frommodel
            }
            SetconfirmLoading(true);
            $http.post(API.invocieHandle, param).then((res: any) => {
                SetconfirmLoading(false);
                setVisible_1(false);
                setVisible_4(false);
                if (res.code === 200) {
                    message.success(res.msg)
                    queryInvoiceList1();
                    queryTodoTotal();
                    fromRef_2.current.clear();
                } else {
                    message.error(res.msg)
                }
            })
        }

    }


    return (
        <div className="com_page">
            <div className="com_page_title" style={{ marginBottom: 8 }}>开票申请已提交审核</div>
            <Tabs defaultActiveKey="1" size='small' onChange={tabChange}>
                <TabPane tab={"待审核(" + props.state.global.InvoiceTodoTotal?.todo_invoice_num + ')'} key="1">
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
                            <div className="com-filter-item">
                                <div className="label">发票类型</div>
                                <Select className='conactfilter' placeholder="全部类型" allowClear style={{ width: 240 }} onChange={(e) => {
                                    SetParam1({
                                        ...Param1,
                                        page: 1,
                                        wheres: {
                                            ...Param1?.wheres,
                                            invoice_type: e,
                                        }
                                    })
                                }}>
                                    {
                                        mapToArr(CommonMap['invoice_type']).map((item) => {
                                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <Search className='com_search com-right' placeholder="请输入账号进行搜索" onSearch={(e: any) => onSearch(e, 1)} enterButton />
                        </div>
                        <ComTable searching={tableSearching1} loading={tableLoading1} onChange={tableOnchange1} dataSource={data1} total={total1} columns={columns1} rowKey="invoice_id"></ComTable>
                    </div>
                </TabPane>
                <TabPane tab="已审核" key="2">
                    <div className="com_page_content">
                        <div className="com_table_bar">
                            <div className="com-filter-item">
                                <div className="label">票据类型</div>
                                <Select className='conactfilter' placeholder="全部类型" allowClear style={{ width: 240 }} onChange={(e) => {
                                    SetParam2({
                                        ...Param2,
                                        page: 1,
                                        wheres: {
                                            ...Param2?.wheres,
                                            invoice_type: e,
                                        }
                                    })
                                }}>
                                    {
                                        mapToArr(CommonMap['invoice_type']).map((item) => {
                                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="com-filter-item">
                                <div className="label">状态</div>
                                <Select className='conactfilter' placeholder="全部类型" allowClear style={{ width: 160 }} onChange={(e) => {
                                    SetParam2({
                                        ...Param2,
                                        page: 1,
                                        invoice_status: +e || [2, 3],
                                    })
                                }}>
                                    <Option value="2">已开票</Option>
                                    <Option value="3">未通过</Option>
                                </Select>
                            </div>
                            <Search className='com_search com-right' placeholder="请输入账号进行搜索" onSearch={(e: any) => onSearch(e, 2)} enterButton />
                        </div>
                        <ComTable searching={tableSearching2} loading={tableLoading2} onChange={tableOnchange2} dataSource={data2} total={total2} columns={columns2} rowKey="invoice_id"></ComTable>
                    </div>
                </TabPane>
            </Tabs>

            {/* 审核 */}
            <Drawer
                title="汇款信息审核"
                placement="right"
                width={640}
                closable
                onClose={() => setVisible_1(false)}
                visible={visible_1}
                getContainer={() => document.getElementById('pageContent') as HTMLElement}
            >
                <ComShowInfo showInfoConfig={showInfoConfig1[showInfodata_1.invoice_type]} data={showInfodata_1}></ComShowInfo>
                <Button type="primary" size="large" style={{ marginLeft: 120, marginRight: 8, width: 176 }} onClick={() => { setVisible_3(true); Setinvoice_status(1) }}>开票</Button>
                <Button className='danger' size="large" style={{ width: 176 }} onClick={() => { setVisible_4(true); Setinvoice_status(2) }}>拒绝</Button>
            </Drawer>

            {/* 开票 */}
            <Modal
                title='开票通过'
                visible={visible_3}
                width={640}
                onOk={openInvaiceok}
                confirmLoading={confirmLoading}
                onCancel={() => {setVisible_3(false);fromRef_1.current.clear();}}
            >
                <ComForm ref={fromRef_1} fromConfig={fromConfig_1} model={model_1}></ComForm>
            </Modal>

            {/* 拒绝开票 */}
            <Modal
                title='开票未通过确认'
                visible={visible_4}
                width={640}
                okType="danger"
                onOk={openInvaiceokreject}
                confirmLoading={confirmLoading}
                onCancel={() => {setVisible_4(false);fromRef_2.current.clear();}}
            >
                <ComForm ref={fromRef_2} fromConfig={fromConfig_2} model={model_2}></ComForm>
            </Modal>

            {/* 详情 */}
            <Drawer
                title="开票申请详情"
                placement="right"
                closable
                width={640}
                onClose={() => setVisible_2(false)}
                visible={visible_2}
                getContainer={() => document.getElementById('pageContent') as HTMLElement}
            >
                <ComShowInfo showInfoConfig={showInfoConfig2[showInfodata_2?.invoice_type || '1'][showInfodata_2?.invoice_status || '2']} data={showInfodata_2}></ComShowInfo>
            </Drawer>
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


export default connect(mapStateToProps, mapDispatchToProps)(invoiceApplyAduit);
