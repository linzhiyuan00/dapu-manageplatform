import React, { useState, useEffect } from 'react';
import styles from './orderRecord.less';
import { Button, Icon, Input, Drawer } from 'antd';
import { ComTable, ComShowCard, CardConfig, ComShowInfo, ShowInfoConfig, ComFilter, IconFont, ComStatus } from '@/components/index'
import { _showInfoConfig, _filterFormConfig } from './orderRecord.config';
import { CommonMap, mapToArr } from '@/common/map';
import { $http, API } from '@/common/http';
import { paramHandle } from '@/common/utils';
import { connect } from 'dva';
import { getPackageList } from '@/common/utils';
import { arrToOptions } from '@/common/map';
import Item from 'antd/lib/list/Item';
const { Search } = Input;

const OrderRecord = (props: { dispatch: any, state: any }) => {

    const queryOrderTotal = () => {
        props.dispatch({
          type: 'global/queryOrderTotal'
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

    const [filterFormConfig, SetFilterFormConfig] = useState<any>([]);

    const columns: any[] = [
        {
            title: '订单编号',
            dataIndex: 'order_id',
        },
        {
            title: '订单类型',
            dataIndex: 'order_type',
            render: (_: any, record: any) => (
                <span>{CommonMap.order_type[record.order_type]}</span>
            ),
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
            dataIndex: 'is_expired',
            render: (_: any, record: any) => (
                <ComStatus type="is_expired" value={record.is_expired}></ComStatus>
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
                    <a onClick={() => { setCurdata_1(record); setVisible_1(true); }}>查看详情</a>
                </div>
            ),
        },

    ];

    const [data, SetData] = useState<any[]>([]);
    const [total, SetTotal] = useState(0);
    const [tableLoading, SetTableLoading] = useState(false);
    const [tableSearching, SetTableSearching] = useState(false);
    const [selectedRowKeys, SetSelectedRowKeys] = useState<string[]>([]);
    const [fuzzy_search, SetFuzzy_search] = useState('');
    const [Param, SetParam] = useState<any>({
        page: 1,
        page_num: 10,
        order_status: 2,
        wheres: {
            
        }
    });

    const rowSelection = {
        onChange: (selectedRowKeys: string[]) => {
            SetSelectedRowKeys(selectedRowKeys);
        },
    };

    useEffect(() => {
        queryOrderTotal()
    },[])

    // 订单列表
    const queryOrderList = () => {
        SetTableLoading(true);
        $http.post(API.queryOrdersList, paramHandle(Param)).then((res: any) => {
            SetTableLoading(false)
            if (res.code === 200) {
                SetTotal(res.data.order_count);
                SetData(res.data.orders)
            }
        }, () => SetTableLoading(false))
    }

    const orderExport = () => {
        let exportdata: String[] = [];
        Object.keys(filterData).map((key: String, index) => {
            if (filterData[key] && index !== 0) {

                if (key === 'create_time') {
                    exportdata.push(key + '[]=' + filterData['create_time'][0].format('YYYY-MM-DD'))
                    exportdata.push(key + '[]=' + filterData['create_time'][1].format('YYYY-MM-DD'))
                    return
                }
                if (filterData[key]) {
                    exportdata.push(key + '=' + filterData[key])
                }

            }
        })
        fuzzy_search && exportdata.push('fuzzy_search=' + fuzzy_search)
        if (selectedRowKeys.length > 0) {
            let order_ids = '';
            selectedRowKeys.map((i, index) => {
                order_ids = 'order_ids[]=' + i;
                if (index < selectedRowKeys.length - 1) {
                    order_ids += '&';
                }
            });
            exportdata.push(order_ids)
        }
        console.log('orderExportUrl====','https://hongyun.hopechart.com:12343' + API.orderExport + '?' + exportdata.join('&'))
        window.open('https://hongyun.hopechart.com:12343' + API.orderExport + '?' + exportdata.join('&'), '_blank')
    }

    useEffect(() => {
        queryOrderList();
        if (Object.keys(Param).length > 4 || Object.keys(Param.wheres).length > 0) {
            SetTableSearching(true)
        } else {
            SetTableSearching(false)
        }
    }, [Param]);

    useEffect(() => {
        const newcardListConfig = [...cardListConfig];
        newcardListConfig[0].content = props.state.global.OrderTotal?.month_order_num;
        newcardListConfig[1].content = props.state.global.OrderTotal?.month_order_sum;
        newcardListConfig[2].content = props.state.global.OrderTotal?.total_order_num;
        newcardListConfig[3].content = props.state.global.OrderTotal?.total_order_sum;
        setCardListConfig(newcardListConfig)
    }, [props])

    useEffect(() => {
        setShowInfoConfig_1(_showInfoConfig);
        const newfilterConfig = [..._filterFormConfig];
        newfilterConfig.forEach((item) => {
            if (item.key === 'package_id') {
                item.templateOptions.options = arrToOptions(getPackageList(), 'package_name', 'package_id');
            }
        })
        SetFilterFormConfig(newfilterConfig)
    }, [])

    // 详情 1
    const [visible_1, setVisible_1] = useState(false);
    const [showInfoConfig_1, setShowInfoConfig_1] = useState<ShowInfoConfig[]>([]);
    const [curData_1, setCurdata_1] = useState({});

    const [filterData, SetFilterData] = useState<any>({});
    // 搜索
    const onSearch = (e: any) => {
        SetFuzzy_search(e);
        SetParam({
            ...Param,
            page: 1,
            fuzzy_search: e,
        });
    }

    // 筛选
    const filterOk = (model: any) => {
        SetFilterData(model);
        const wheres: any = {};
        const others: any = {};
        Object.keys(model).map((key) => {
            if (key === 'is_expired') {
                others[key] = model[key];
                return
            }
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
            sort: sorter?.order && [sorter.field, sorter.order]
        });
    }

    return (
        <div className="com_page">
            <div className="com_page_title">订单记录</div>
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
                    <ComFilter fromConfig={filterFormConfig} model={{ order_type: undefined, package_id: undefined, is_expired: undefined, pay_type: undefined, create_time: undefined }} ok={filterOk}></ComFilter>
                    <Button onClick={orderExport}><IconFont type="icon-a-Iconxianxing2020jiantoutuichu" style={{ transform: 'rotateZ(-90deg)' }} />导出订单</Button>
                    <Search className='com_search com-right' placeholder="请输入订单编号、付款账号进行搜索" onSearch={onSearch} enterButton />
                </div>
                <ComTable rowSelection={rowSelection} searching={tableSearching} loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowKey="order_id"></ComTable>
            </div>


            {/* 处理 详情 */}
            <Drawer
                title="订单详情"
                placement="right"
                width={640}
                closable
                onClose={() => setVisible_1(false)}
                visible={visible_1}
                getContainer={() => document.getElementById('pageContent') as HTMLElement}
            >
                <ComShowInfo showInfoConfig={showInfoConfig_1} data={curData_1}></ComShowInfo>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderRecord);
