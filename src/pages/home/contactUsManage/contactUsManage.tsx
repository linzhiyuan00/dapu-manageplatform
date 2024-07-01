import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './simManage.less';
import { Button, Icon, Input, Modal, message, Upload, Select } from 'antd';
import { ComForm, FromConfig, ComTable, IconFont, ComStatus } from '@/components/index'
import { $http, API, ResponseData } from '@/common/http';
import { fromConfig_2_single, fromConfig_2_mult } from './simManage.config';
import { getPackageList, paramHandle } from '@/common/utils';
import { arrToOptions, CommonMap, mapToArr } from '@/common/map';
import moment from 'moment';
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
  const [fuzzy_search, SetFuzzy_search] = useState('');
  const [device_status, SetDevice_status] = useState<any>();
  const [Param, SetParam] = useState<any>({
    page: 1,
    page_num: 10
  });
  const columns: any[] = [
    {
      title: '姓名',
      dataIndex: 'sanyi_account',
      fixed: 'left'
    },
    {
      title: '手机号',
      dataIndex: 'full_number',
    },
    {
      title: '创建时间',
      dataIndex: 'device_number',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_: any, record: any) => (
        <div>
          <a onClick={() => {
            SetCurHandleData(record); setActionType_2('single'); setVisible_2(true); SetModel_2({
              ICCID: record.ICCID || record.origin_ICCID,
              package_id: record.package_id || undefined,
              expired_time: record.expired_time ? moment(record.expired_time) : undefined,
              cardcancel_time: record.cardcancel_time ? moment(record.cardcancel_time) : undefined
            })
          }}>查看</a>
        </div>
      ),
    },

  ]

  // sim列表
  const querySimList = useCallback(() => {
    SetTableLoading(true);
    $http.post(API.querySimList, paramHandle(Param)).then((res: any) => {
      if (res.code === 200) {
        SetTotal(res.data.sim_count);
        SetData(res.data.sim)
        SetTableLoading(false);
      }

    })
  })


  useEffect(() => {
    querySimList();
    if (Object.keys(Param).length > 2) {
      SetTableSearching(true)
    } else {
      SetTableSearching(false)
    }
  }, [Param, querySimList]);


  const [Param_file, SetParam_file] = useState<any>({
    page: 1,
    page_num: 10,
  });



  const queryList = useCallback(() => {
    $http.post(API.queryContactUsList, Param_file).then((res: any) => {
      if (res.code === 200) {
        SetTotal_file(res.data.file_count);
        SetData_file(res.data.file)
      }
    })
  })


  useEffect(() => {
    queryList();
  }, [Param_file, queryList]);

  const onSelectChange = (newSelectedRowKeys: []) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (e: any) => {
    SetFuzzy_search(e);
    SetParam({
      ...Param,
      fuzzy_search: e,
      page: 1,
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


  // 文件导入记录 1
  const [visible_1, setVisible_1] = useState(false);
  const columns_file = [
    {
      title: '文件名称',
      dataIndex: 'file_name',
    },
    {
      title: '导入时间',
      dataIndex: 'create_time',
    },
    {
      title: '操作账号',
      dataIndex: 'admin_account',
    },
  ];

  // SIM信息编辑 2
  const [visible_2, setVisible_2] = useState(false);
  const [curHandleData, SetCurHandleData] = useState<any>({});
  const [actionType_2, setActionType_2] = useState<'single' | 'mult'>('single');
  const [fromConfig_2, setFromConfig_2] = useState<FromConfig[]>([]);
  const [model_2, SetModel_2] = useState({});
  const fromRef_2: any = useRef();
  const handleOk_2 = () => {
    if (fromRef_2.current.vaild()) {
      const frommodel = fromRef_2.current._model;
      const param = {
        sim_ids: actionType_2 === 'single' ? [curHandleData.sim_id] : selectedRowKeys,
        ...frommodel,
        expired_time: frommodel.expired_time && frommodel.expired_time.format('YYYY-MM-DD'),
        cardcancel_time: frommodel?.cardcancel_time && frommodel?.cardcancel_time.format('YYYY-MM-DD')
      }
      $http.post(API.simHandle, param).then((res: any) => {
        if (res.code === 200) {
          message.success(res.msg)
          setVisible_2(false)
          fromRef_2.current.clear();
          querySimList();
        } else {
          message.error(res.msg)
        }
      })


    }
  }

  useEffect(() => {
    let newconfig: any[] = [];
    if (actionType_2 === 'single') {
      newconfig = [...fromConfig_2_single];

    } else if (actionType_2 === 'mult') {
      newconfig = [...fromConfig_2_mult];
    }
    newconfig.forEach((item) => {
      if (item.key === 'package_id') {
        item.templateOptions.options = arrToOptions(getPackageList(), 'package_name', 'package_id');
      }
    })
    setFromConfig_2(newconfig)
  }, [actionType_2])


  return (
    <div className="com_page">
      <div className="com_page_title">SIM卡管理</div>
      <div className="com_page_content">
        <div className="com_table_bar">
          <Search className='com_search' placeholder="请输入姓名或手机号进行搜索" onSearch={onSearch} enterButton />
        </div>
        <ComTable searching={tableSearching} loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowSelection={rowSelection} rowKey="sim_id" scroll={{ x: 1600 }} ></ComTable>
      </div>
    </div >
  );
}

export default SimManage;
