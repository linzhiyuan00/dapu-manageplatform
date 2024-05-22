import React, { useState, useRef, useEffect } from 'react';
import styles from './pendingRenewOrder.less';
import logosvg from '@/assets/sim.svg';
import { Button, Tabs, Input, Modal, message, Drawer, DatePicker, Select } from 'antd';
import { ComForm, FromConfig, ComTable, ComShowCard, ComStatus, CardConfig, ComShowInfo, ShowInfoConfig } from '@/components/index'
import { $http, API } from '@/common/http';
import { _showInfoConfig1, _showInfoConfig2,_showInfoConfig2_fail } from './remitInfoSubmitAudit.config';
import { connect } from 'dva';
import { paramHandle } from '@/common/utils';
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;


const remitInfoSubmitAudit = (props: { dispatch: any, state: any }) => {

    const queryTodoTotal = () => {
        props.dispatch({
            type: 'global/queryRemitTodoTotal'
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
            title: '状态',
            dataIndex: 'remit_status',
            sorter: true,
            render: (_: any, record: any) => (
                <ComStatus type="remit_status" value={record.remit_status}></ComStatus>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <div>
                    <a onClick={() => {
                        setShowInfodata_2(record);
                        if (record.remit_status === 3) {
                            setShowInfoConfig2(_showInfoConfig2_fail); 
                        } else {
                            setShowInfoConfig2(_showInfoConfig2); 
                        };
                        
                        setVisible_2(true);
                    }}>查看详情</a>
                </div>
            ),
        },

    ];

    const [todoNum, SetTodoNum] = useState(0);
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
        remit_status: 1,
        wheres: {}
    });

    const [Param2, SetParam2] = useState<any>({
        page: 1,
        page_num: 10,
        remit_status: [2, 3],
        wheres: {}
    });
    const [confirmLoading, SetconfirmLoading] = useState(false);

    // 汇款订单列表 1
    const queryRemitList1 = () => {
        SetTableLoading1(true);
        $http.post(API.queryRemitList, paramHandle(Param1)).then((res: any) => {
            SetTotal1(res.data.remit_count);
            SetData1(res.data.remits)
            SetTableLoading1(false);
        })
    }

    // 汇款订单列表 2
    const queryRemitList2 = () => {
        SetTableLoading2(true);
        $http.post(API.queryRemitList, paramHandle(Param2)).then((res: any) => {
            SetTotal2(res.data.remit_count);
            SetData2(res.data.remits)
            SetTableLoading2(false);
        })
    }

    useEffect(() => {
        queryRemitList1();
        if (Object.keys(Param1).length > 4 || Object.keys(Param1?.wheres).length > 0) {
            SetTableSearching1(true)
        } else {
            SetTableSearching1(false)
        }
    }, [Param1]);

    useEffect(() => {
        queryRemitList2();
        if (Object.keys(Param2).length > 4 || Object.keys(Param2?.wheres).length > 0) {
            SetTableSearching2(true)
        } else {
            SetTableSearching2(false)
        }
    }, [Param2]);

    useEffect(() => {
        const newcardListConfig = [...cardListConfig];
        newcardListConfig[0].content = props.state.global.RemitTodoTotal?.todo_remit_num;
        newcardListConfig[1].content = props.state.global.RemitTodoTotal?.todo_remit_sum;
        SetTodoNum(props.state.global.RemitTodoTotal?.todo_remit_num || 0);
        setCardListConfig(newcardListConfig)
    }, [props])

    useEffect(() => {
        queryTodoTotal();
        setShowInfoConfig1(_showInfoConfig1);
    }, [])

    // 审核 1
    const [visible_1, setVisible_1] = useState(false);
    const [showInfoConfig1, setShowInfoConfig1] = useState<ShowInfoConfig[]>([]);
    const [showInfodata_1, setShowInfodata_1] = useState<any>({});
    const fromRef_1: any = useRef();
    const [visible_3, setVisible_3] = useState(false);
    const [visible_4, setVisible_4] = useState(false);
    const [remit_status, SetRemit_status] = useState(1);
    const [fromConfig_1, setFromConfig_1] = useState<FromConfig[]>([{
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
    const [model_1, SetModel_1] = useState({});

    // 详情 2
    const [visible_2, setVisible_2] = useState(false);
    const [showInfoConfig2, setShowInfoConfig2] = useState<ShowInfoConfig[]>([]);
    const [showInfodata_2, setShowInfodata_2] = useState({});

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
                fuzzy_search: e,
                page: 1,
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
            queryRemitList1();
            return;
        }
        queryRemitList2()
    }

    const handleOk_1 = () => {
        SetconfirmLoading(true);
        $http.post(API.remitHandle, paramHandle({
            remit_id: showInfodata_1.remit_id,
            remit_status: remit_status
        })).then((res: any) => {
            SetconfirmLoading(false);
            setVisible_1(false);
            setVisible_3(false);
            if (res.code === 200) {
                message.success(res.msg);
                queryRemitList1();
                queryTodoTotal();
            } else {
                message.error(res.msg)
            }
        })
    }

    const handleOk_2 = () => {
        if (fromRef_1.current.vaild()) {
            SetconfirmLoading(true);
            $http.post(API.remitHandle, paramHandle({
                remit_id: showInfodata_1.remit_id,
                remit_status: remit_status,
                note: fromRef_1.current._model.note
            })).then((res: any) => {
                SetconfirmLoading(false);
                setVisible_1(false);
                setVisible_4(false);
                if (res.code === 200) {
                    message.success(res.msg)
                    queryRemitList1();
                    queryTodoTotal();
                    fromRef_1.current.clear();
                } else {
                    message.error(res.msg)
                }
            })
        }

    }


    return (
        <div className="com_page">
            <div className="com_page_title" style={{ marginBottom: 8 }}>汇款信息提交审核</div>
            <Tabs defaultActiveKey="1" size='small' onChange={tabChange}>
                <TabPane tab={"待审核(" + todoNum + ')'} key="1">
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
                            <Search className='com_search' placeholder="请输入账号、付款户名进行搜索" onSearch={(e: any) => onSearch(e, 1)} enterButton />
                        </div>
                        <ComTable searching={tableSearching1} loading={tableLoading1} onChange={tableOnchange1} dataSource={data1} total={total1} columns={columns1} rowKey="remit_id"></ComTable>
                    </div>
                </TabPane>
                <TabPane tab="已审核" key="2">
                    <div className="com_page_content">
                        <div className="com_table_bar">
                            <div className="com-filter-item">
                                <div className="label">汇款时间</div>
                                <RangePicker className='conactfilter' style={{ width: 240 }} onChange={(e) => {
                                    SetParam2({
                                        ...Param2,
                                        page: 1,
                                        wheres: {
                                            ...Param2?.wheres,
                                            remit_time: e.length > 0 && e,
                                        }
                                    })
                                }} />
                            </div>
                            <div className="com-filter-item">
                                <div className="label">状态</div>
                                <Select className='conactfilter' placeholder="全部类型" allowClear style={{ width: 160 }} onChange={(e) => {
                                    SetParam2({
                                        ...Param2,
                                        page: 1,
                                        remit_status: e ? +e : [2,3],
                                    })
                                }}>
                                    <Option value="2">已入账</Option>
                                    <Option value="3">未通过</Option>
                                </Select>
                            </div>
                            <Search className='com_search com-right' placeholder="请输入账号、付款户名进行搜索" onSearch={(e: any) => onSearch(e, 2)} enterButton />
                        </div>
                        <ComTable searching={tableSearching2} loading={tableLoading2} onChange={tableOnchange2} dataSource={data2} total={total2} columns={columns2} rowKey="remit_id"></ComTable>
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
                <ComShowInfo showInfoConfig={showInfoConfig1} data={showInfodata_1}></ComShowInfo>
                <Button type="primary" size="large" style={{ marginLeft: 120, marginRight: 8, width: 176 }} onClick={() => { setVisible_3(true); SetRemit_status(2) }}>通过</Button>
                <Button className='danger' size="large" style={{ width: 176 }} onClick={() => { setVisible_4(true); SetRemit_status(3) }}>未通过</Button>
            </Drawer>

            {/* 审核通过确认 */}
            <Modal
                title='审核通过确认'
                visible={visible_3}
                width={640}
                onOk={handleOk_1}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible_3(false)}
            >
                <span>是否确认通过该审核，确认通过后该笔资金便入账账户({showInfodata_1.sanyi_account})中。</span>
            </Modal>

            {/* 审核未通过确认 */}
            <Modal
                title='审核未通过确认'
                visible={visible_4}
                width={640}
                onOk={handleOk_2}
                okType='danger'
                confirmLoading={confirmLoading}
                onCancel={() => { setVisible_4(false); fromRef_1.current.clear(); }}
            >
                <ComForm ref={fromRef_1} fromConfig={fromConfig_1} model={model_1}></ComForm>
            </Modal>

            {/* 详情 */}
            <Drawer
                title="订单详情"
                placement="right"
                closable
                width={640}
                onClose={() => setVisible_2(false)}
                visible={visible_2}
                getContainer={() => document.getElementById('pageContent') as HTMLElement}
            >
                <ComShowInfo showInfoConfig={showInfoConfig2} data={showInfodata_2}></ComShowInfo>
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

export default connect(mapStateToProps, mapDispatchToProps)(remitInfoSubmitAudit);
