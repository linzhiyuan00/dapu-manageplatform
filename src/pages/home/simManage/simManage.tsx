import React, { useState, useRef, useEffect } from 'react';
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

  const [uploadLoading, SetUploadLoading] = useState(false);
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
      title: '账号',
      dataIndex: 'sanyi_account',
      fixed: 'left'
    },
    {
      title: '整车编号',
      dataIndex: 'full_number',
    },
    {
      title: '设备号',
      dataIndex: 'device_number',
    },
    {
      title: 'ICCID（原）',
      dataIndex: 'origin_ICCID',
      width: '200px',
    },
    {
      title: 'ICCID（新）',
      dataIndex: 'ICCID',
      width: '200px',
    },
    {
      title: '套餐',
      dataIndex: 'package_name',
    },
    {
      title: '流量到期时间',
      dataIndex: 'expired_time',
      width: '240px',
      sorter: true,
    },
    {
      title: '销卡时间',
      dataIndex: 'cardcancel_time',
      width: '240px',
      sorter: true,
    },
    {
      title: '设备状态',
      dataIndex: 'device_status',
      render: (_: any, record: any) => (
        <ComStatus type="device_status" value={record.device_status}></ComStatus>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_: any, record: any) => (
        <div>
          <a onClick={() => { SetCurHandleData(record); setActionType_2('single'); setVisible_2(true);SetModel_2({
            ICCID: record.ICCID || record.origin_ICCID,
            package_id: record.package_id || undefined,
            expired_time:record.expired_time ? moment(record.expired_time) : undefined,
            cardcancel_time: record.cardcancel_time ? moment(record.cardcancel_time) : undefined
          }) }}>编辑</a>
        </div>
      ),
    },

  ]

  // sim列表
  const querySimList = () => {
    SetTableLoading(true);
    $http.post(API.querySimList, paramHandle(Param)).then((res: any) => {
      if (res.code === 200) {
        SetTotal(res.data.sim_count);
        SetData(res.data.sim)
        SetTableLoading(false);
      }

    })
  }


  useEffect(() => {
    querySimList();
    if (Object.keys(Param).length > 2) {
      SetTableSearching(true)
    } else {
      SetTableSearching(false)
    }
  }, [Param]);


  const [data_file, SetData_file] = useState<any[]>([]);
  const [total_file, SetTotal_file] = useState(0);
  const [tableLoading_file, SetTableLoading_file] = useState(false);
  const [Param_file, SetParam_file] = useState<any>({
    page: 1,
    page_num: 10,
  });


  // 文件导入记录
  const querySimFileList = () => {
    SetTableLoading_file(true);
    $http.post(API.querySimFileList, Param_file).then((res: any) => {
      if (res.code === 200) {
        SetTotal_file(res.data.file_count);
        SetData_file(res.data.file)
        SetTableLoading_file(false);
      }
    })
  }


  useEffect(() => {
    querySimFileList();
  }, [Param_file]);

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

  const tableOnchange_file = (pagination: any, filters: any, sorter: any) => {
    SetParam_file({
      ...Param,
      page: pagination.current,
      page_num: pagination.pageSize,
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

  const simExport = () => {
    let exportdata: String[] = [];
    fuzzy_search && exportdata.push('fuzzy_search=' + fuzzy_search);
    device_status && exportdata.push('device_status=' + device_status);
    if (selectedRowKeys.length > 0) {
      let sim_ids = '';
      selectedRowKeys.map((i, index) => {
        sim_ids += 'sim_ids[]=' + i
        if (index < selectedRowKeys.length - 1) {
          sim_ids += '&';
        }
      });
      exportdata.push(sim_ids);
    }
    console.log('simExportUrl====', 'https://hongyun.hopechart.com:12343' + API.simExport + '?' + exportdata.join('&'));
    window.open('https://hongyun.hopechart.com:12343' + API.simExport + '?' + exportdata.join('&'), '_blank')
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


  const uploadOnchange = (e: any) => {
    if (e.file.status === 'uploading ') {
      SetUploadLoading(true);
    }
    if (e.file.status === 'done') {
      SetUploadLoading(false);
      message.success('导入成功');
      querySimList();
      querySimFileList();
    }
  }

  return (
    <div className="com_page">
      <div className="com_page_title">SIM卡管理</div>
      <div className="com_page_content">
        <div className="com_table_bar">
          <Upload name='excel' action="https://hongyun.hopechart.com:12343/api/sim/import" showUploadList={false} onChange={uploadOnchange}>
            <Button type="primary" loading={uploadLoading}><IconFont type="icon-a-Iconxianxing2020jiantoudaoru" />导入</Button>
          </Upload>
          <Button style={{ marginLeft: 8 }} onClick={() => setVisible_1(true)}><IconFont type="icon-a-Iconxianxing2020jiantoujishiben" />导入记录</Button>
          <Button disabled={selectedRowKeys.length === 0} onClick={() => { setActionType_2('mult'); setVisible_2(true);SetModel_2({}) }}><IconFont type="icon-a-Iconxianxing2020xuanzeqi" />批量编辑</Button>
          <Button onClick={simExport}><IconFont type="icon-a-Iconxianxing2020jiantoutuichu" style={{ transform: 'rotateZ(-90deg)' }} />导出</Button>
          <div className="com-right" style={{ display: 'flex' }}>
            <div className="com-filter-item ">
              <div className="label">设备状态</div>
              <Select className='conactfilter' placeholder="全部状态" allowClear style={{ width: 120 }} onChange={(e) => {
                SetDevice_status(e);
                SetParam({
                  ...Param,
                  page: 1,
                  device_status: e,
                  wheres: {
                    ...Param?.wheres,
                  }
                })
              }}>
                {
                  mapToArr(CommonMap['device_status']).map((item) => {
                    return <Option key={item.value} value={item.value}>{item.label}</Option>
                  })
                }
              </Select>
            </div>
            <Search className='com_search' placeholder="请输入账号、ICCID进行搜索" onSearch={onSearch} enterButton />
          </div>

        </div>
        <ComTable searching={tableSearching} loading={tableLoading} onChange={tableOnchange} dataSource={data} total={total} columns={columns} rowSelection={rowSelection} rowKey="sim_id" scroll={{ x: 1600 }} ></ComTable>
      </div>

      <Modal
        title="文件导入记录"
        visible={visible_1}
        width={640}
        onCancel={() => { setVisible_1(false); SetModel_2({}) }}
        footer={null}
      >
        <ComTable loading={tableLoading_file} onChange={tableOnchange_file} dataSource={data_file} total={total_file} columns={columns_file} rowKey="file_id"></ComTable>
      </Modal>

      <Modal
        title={actionType_2 === 'single' ? 'SIM信息编辑' : 'SIM信息批量编辑'}
        visible={visible_2}
        width={640}
        onOk={handleOk_2}
        onCancel={() => { setVisible_2(false); fromRef_2.current.clear(); }}
      >
        <ComForm ref={fromRef_2} key="simedit" fromConfig={fromConfig_2} model={model_2}></ComForm>
      </Modal>
    </div >
  );
}

export default SimManage;
