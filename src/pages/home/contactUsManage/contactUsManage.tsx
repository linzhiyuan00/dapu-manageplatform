import React, { useState, useEffect, useCallback } from 'react';
import { Input, Drawer, Select } from 'antd';
import { ComShowInfo, ShowInfoConfig, ComTable } from '@/components/index'
import { $http, API } from '@/common/http';
import moment from 'moment';

const _showInfoConfig: ShowInfoConfig[] = [
  {
    key: 'name',
    label: '姓名'
  },
  {
    key: 'phone',
    label: '手机号'
  },
  {
    key: 'email',
    label: '邮箱',
    divider: true
  },
  {
    key: 'company',
    label: '企业'
  },
  {
    key: 'post',
    label: '职称',
    divider: true
  },
  {
    key: 'requirement',
    label: '需要服务',
  },
  {
    key: 'remark',
    label: '备注',
    divider: true
  },
  {
    key: 'createTime',
    label: '创建时间'
  },
];

const { Search } = Input;
const { Option } = Select;

const SimManage = (props: any) => {

  useEffect(() => {
    // console.log('props:', props)
  }, [props])

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, SetData] = useState<any[]>([]);
  const [total, SetTotal] = useState(0);
  const [tableLoading, SetTableLoading] = useState(false);
  const [tableSearching, SetTableSearching] = useState(false);
  const [searchKey, SetSearchKey] = useState('');
  const [device_status, SetDevice_status] = useState<any>();
  const [Param, SetParam] = useState<any>({
    pageNum: 1,
    pageSize: 10
  });
  const columns: any[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (time: number) => <span>
        {time}
        {/* {moment(time).format('YYYY-MM-DD HH:mm:ss')} */}
      </span>,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_: any, record: any) => (
        <div>
          <a
            onClick={() => {
              setVisible_2(true);
              SetModel_2({
                ...record,
                createTime: record.createTime
                //  moment(record?.createTime).format('YYYY-MM-DD HH:mm:ss')
              })
            }}>查看</a>
        </div>
      ),
    },

  ]

  // sim列表
  const queryList = useCallback(() => {
    SetTableLoading(true);
    $http.get(API.contactList + `?pageNum=${Param.pageNum}&pageSize=${Param.pageSize}` + (searchKey ? `&searchKey=${searchKey}` : '')).then((res: any) => {
      console.log('res::', res)
      if (res.code === 200) {
        SetTotal(res.total);
        SetData(res.rows)
        SetTableLoading(false);
      }

    })
  }, [Param.pageNum, Param.pageSize, searchKey])


  useEffect(() => {
    queryList();
  }, [Param, queryList]);


  const onSearch = (e: any) => {
    SetSearchKey(e);
    SetParam({
      ...Param,
      searchKey: e,
      pageNum: 1,
    });
  }

  const tableOnchange = (pagination: any, filters: any, sorter: any) => {
    SetParam({
      ...Param,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      sort: sorter?.order && [sorter.field, sorter.order]
    });
  }

  // 信息查看
  const [visible_2, setVisible_2] = useState(false);
  const [model_2, SetModel_2] = useState({});



  return (
    <div className="com_page">
      <div className="com_page_title">联系我们管理</div>
      <div className="com_page_content">
        <div className="com_table_bar">
          <Search className='com_search' placeholder="请输入姓名或手机号进行搜索" onSearch={onSearch} enterButton />
        </div>
        <ComTable loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowKey="sim_id" ></ComTable>
      </div>

      {/* 处理 详情 */}
      <Drawer
        title="详情"
        placement="right"
        width={640}
        closable
        onClose={() => setVisible_2(false)}
        visible={visible_2}
      // getContainer={() => document.getElementById('pageContent') as HTMLElement}
      >
        <ComShowInfo showInfoConfig={_showInfoConfig} data={model_2}></ComShowInfo>
      </Drawer>
    </div >
  );
}

export default SimManage;
