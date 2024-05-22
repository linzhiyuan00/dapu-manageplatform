import { CommonMap, mapToArr, arrToOptions } from "@/common/map";
import { ShowInfoConfig, FromConfig } from "@/components"
const _showInfoConfig: ShowInfoConfig[] = [
    {
        type: 'text',
        key: 'sanyi_account',
        label: '充值账号'
    },
    {
        type: 'money',
        key: 'remit_amount',
        label: '汇款金额'
    },
    {
        type: 'text',
        key: 'remit_time',
        label: '汇款时间'
    },
    {
        type: 'text',
        key: 'phone',
        label: '联系号码',
        divider: true
    },
    {
        type: 'text',
        key: 'remit_name',
        label: '付款户名'
    },
    {
        type: 'text',
        key: 'remit_account',
        label: '汇款账户'
    },
    {
        type: 'text',
        key: 'doposit_bank',
        label: '开户银行',
        divider: true
    },
    {
        type: 'text',
        key: 'create_time',
        label: '提交时间'
    },
    {
        type: 'status',
        key: 'remit_status',
        maptype: 'order_type',
        label: '状态',
        divider: true
    },
    {
        type: 'text',
        key: 'entry_method',
        maptype: 'entry_method',
        label: '入账方式'
    },
    {
        type: 'text',
        key: 'admin_info.admin_account',
        label: '操作账号'
    },
    {
        type: 'text',
        key: 'handle_time',
        label: '操作时间',
        divider: true
    },
];

const _filterFormConfig: FromConfig[] = [
    {
        type: 'rangeDate',
        key: 'remit_time',
        label: '汇款时间',
    },
    {
        type: 'select',
        key: 'entry_method',
        label: '入账方式',
        templateOptions: {
            options: mapToArr(CommonMap.entry_method),
            placeholder: '全部方式',
        }
    },
    {
        type: 'rangeDate',
        key: 'handle_time',
        label: '入账时间'
    },
];

const addEmit_fromConfig: FromConfig[] = [
    {
        type: 'text',
        label: '充值账户',
        key: 'sanyi_account',
        required: true,
        templateOptions: {
            placeholder: '请输入要充值的账号',
            style: {
                width: ' 360px',
                marginBottom: '16px',
            }
        }
    },
    {
        type: 'text',
        label: '付款户名',
        key: 'remit_name',
        templateOptions: {
            placeholder: '请输入付款人户名',
            style: {
                width: ' 240px'
            }
        }
    },
    {
        type: 'text',
        label: '付款账号',
        key: 'remit_account',
        templateOptions: {
            placeholder: '请输入付款人账号',
            style: {
                width: ' 360px'
            }
        }
    },
    {
        type: 'text',
        label: '开户银行',
        key: 'doposit_bank',
        templateOptions: {
            placeholder: '请输入开户银行',
            style: {
                width: ' 360px',
                marginBottom: '16px',
            }
        }
    },
    {
        type: 'text',
        label: '汇款金额',
        key: 'remit_amount',
        required: true,
        templateOptions: {
            placeholder: '请输入汇款金额',
            style: {
                width: ' 240px'
            }
        }
    },
    {
        type: 'date',
        label: '汇款时间',
        key: 'remit_time',
        templateOptions: {
            style: {
                width: ' 360px'
            }
        },
    },
    {
        type: 'text',
        label: '联系号码',
        key: 'phone',
        templateOptions: {
            placeholder: '请输入联系号码',
            style: {
                width: ' 240px'
            }
        }
    },
];

export {
    _showInfoConfig,
    _filterFormConfig,
    addEmit_fromConfig
}