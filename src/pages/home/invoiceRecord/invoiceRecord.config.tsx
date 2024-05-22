import { CommonMap, mapToArr } from "@/common/map";
import { ShowInfoConfig, FromConfig } from "@/components"
const _showInfoConfig: { 1: ShowInfoConfig[], 2: ShowInfoConfig[] } = {
    1: [
        {
            type: 'text',
            key: 'invoice_type',
            label: '开票类型'
        },
        {
            type: 'money',
            key: 'invoice_amount',
            label: '开票金额',
            divider: true
        },
        {
            type: 'text',
            key: 'invoice_name',
            label: '姓名',
            divider: true
        },
        {
            type: 'text',
            key: 'invoice_email',
            label: '收件人邮箱'
        },
        {
            type: 'text',
            key: 'invoice_phone',
            label: '收件人电话',
            divider: true
        },
        {
            type: 'text',
            key: 'create_time',
            label: '提交时间',
        },
        {
            type: 'status',
            key: 'invoice_status',
            label: '状态',
            maptype: 'invoice_status',
            divider: true
        },
        {
            type: 'text',
            key: 'invoice_code',
            label: '发票代码',
        },
        {
            type: 'text',
            key: 'invoice_num',
            label: '发票号码',
        },
        {
            type: 'text',
            key: 'invoice_time',
            label: '开票日期',
        },
        {
            type: 'file',
            key: 'file_name',
            fileUrl: 'invoice_path',
            label: 'PDF原件',
            divider: true
        },
        {
            type: 'text',
            key: 'admin_account',
            label: '操作账号',
        },
        {
            type: 'text',
            key: 'handle_time',
            label: '操作时间',
            divider: true
        },
    ],
    2: [
        {
            type: 'text',
            key: 'invoice_type',
            label: '开票类型'
        },
        {
            type: 'money',
            key: 'invoice_amount',
            label: '开票金额',
            divider: true
        },
        {
            type: 'text',
            key: 'invoice_type',
            label: '开票类型',
            maptype: 'invoice_type',
            divider: true
        },
        {
            type: 'text',
            key: 'enterprise_name',
            label: '企业名称',
        },
        {
            type: 'text',
            key: 'identity_number',
            label: '纳税人识别号',
        },
        {
            type: 'text',
            key: 'enterprise_address',
            label: '企业地址',
        },
        {
            type: 'text',
            key: 'enterprise_phone',
            label: '企业电话',
        },
        {
            type: 'text',
            key: 'deposit_bank',
            label: '开户银行',
        },
        {
            type: 'text',
            key: 'bank_account',
            label: '银行账号',
            divider: true
        },
        {
            type: 'text',
            key: 'invoice_email',
            label: '收件人邮箱'
        },
        {
            type: 'text',
            key: 'invoice_phone',
            label: '收件人电话',
            divider: true
        },
        {
            type: 'text',
            key: 'create_time',
            label: '提交时间',
        },
        {
            type: 'status',
            key: 'invoice_status',
            label: '状态',
            maptype: 'invoice_status',
            divider: true
        },
        {
            type: 'text',
            key: 'invoice_code',
            label: '发票代码',
        },
        {
            type: 'text',
            key: 'invoice_num',
            label: '发票号码',
        },
        {
            type: 'text',
            key: 'invoice_time',
            label: '开票日期',
        },
        {
            type: 'file',
            key: 'file_name',
            fileUrl: 'invoice_path',
            label: 'PDF原件',
            divider: true
        },
        {
            type: 'text',
            key: 'admin_account',
            label: '操作账号',
        },
        {
            type: 'text',
            key: 'handle_time',
            label: '操作时间',
            divider: true
        },
    ]
};

const _filterFormConfig: FromConfig[] = [
    {
        type: 'select',
        key: 'invoice_type',
        label: '开票类型',
        templateOptions: {
            placeholder: '全部类型',
            options: mapToArr(CommonMap.invoice_type)
        }
    },
    {
        type: 'rangeDate',
        key: 'handle_time',
        label: '开票时间'
    },
];


const addinvoice_fromConfig: { 1: FromConfig[], 2: FromConfig[] } = {
    1: [
        {
            type: 'text',
            label: '开票账号',
            key: 'sanyi_account',
            required: true,
            templateOptions: {
                placeholder: '请输入要充值的账号',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '开票金额',
            key: 'invoice_amount',
            required: true,
            templateOptions: {
                placeholder: '请输入开票金额',
                style: {
                    width: ' 240px',
                    marginBottom: '16px',
                }
            }
        },
        {
            type: 'text',
            label: '姓名',
            key: 'invoice_name',
            required: true,
            templateOptions: {
                placeholder: '请输入姓名',
                style: {
                    width: ' 360px',
                    marginBottom: '16px',
                }
            }
        },
        {
            type: 'text',
            label: '收件人邮箱',
            key: 'invoice_email',
            required: true,
            templateOptions: {
                placeholder: '请输入收件人邮箱',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '收件人电话',
            key: 'invoice_phone',
            templateOptions: {
                placeholder: '请输入收件人电话',
                style: {
                    width: ' 360px',
                    marginBottom: '16px',
                }
            }
        },
        {
            type: 'text',
            label: '发票代码',
            key: 'invoice_code',
            required: true,
            templateOptions: {
                placeholder: '请输入发票代码',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '发票号码',
            key: 'invoice_num',
            required: true,
            templateOptions: {
                placeholder: '请输入发票号码',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'date',
            label: '开票日期',
            key: 'invoice_time',
            required: true,
            templateOptions: {
                placeholder: '请选择开票日期',
                style: {
                    width: ' 360px'
                }
            },
        },
        {
            type: 'upload',
            label: 'PDF原件',
            key: 'file_id',
            templateOptions: {
                style: {
                    width: ' 360px'
                }
            },
        },
    ],
    2: [
        {
            type: 'text',
            label: '开票账号',
            key: 'sanyi_account',
            required: true,
            templateOptions: {
                placeholder: '请输入要充值的账号',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '开票金额',
            key: 'invoice_amount',
            required: true,
            templateOptions: {
                placeholder: '请输入开票金额',
                style: {
                    width: ' 240px',
                    marginBottom: '16px',
                }
            }
        },
        {
            type: 'text',
            label: '企业名称',
            key: 'enterprise_name',
            required: true,
            templateOptions: {
                placeholder: '请输入企业名称',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '纳税人识别号',
            key: 'identity_number',
            required: true,
            templateOptions: {
                placeholder: '请输入纳税人识别号',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '企业地址',
            key: 'enterprise_address',
            templateOptions: {
                placeholder: '请输入企业地址',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '企业电话',
            key: 'enterprise_phone',
            templateOptions: {
                placeholder: '请输入企业电话',
                style: {
                    width: ' 240px'
                }
            },
        },
        {
            type: 'text',
            label: '开户银行',
            key: 'deposit_bank',
            templateOptions: {
                placeholder: '请输入开户银行',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '银行账号',
            key: 'bank_account',
            templateOptions: {
                placeholder: '请输入银行账号',
                style: {
                    width: ' 360px',
                    marginBottom: '16px',
                }
            }
        },
        {
            type: 'text',
            label: '收件人邮箱',
            key: 'invoice_email',
            required: true,
            templateOptions: {
                placeholder: '请输入收件人邮箱',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'text',
            label: '收件人电话',
            key: 'invoice_phone',
            templateOptions: {
                placeholder: '请输入收件人电话',
                style: {
                    width: ' 360px',
                    marginBottom: '16px',
                }
            }
        },
        {
            type: 'text',
            label: '发票代码',
            key: 'invoice_code',
            required: true,
            templateOptions: {
                placeholder: '请输入发票代码',
                style: {
                    width: ' 240px'
                }
            }
        },
        {
            type: 'text',
            label: '发票号码',
            key: 'invoice_num',
            required: true,
            templateOptions: {
                placeholder: '请输入发票号码',
                style: {
                    width: ' 360px'
                }
            }
        },
        {
            type: 'date',
            label: '开票日期',
            key: 'invoice_time',
            required: true,
            templateOptions: {
                placeholder: '请选择开票日期',
                style: {
                    width: ' 360px'
                }
            },
        },
        {
            type: 'upload',
            label: 'PDF原件',
            key: 'file_id',
            templateOptions: {
                style: {
                    width: ' 360px'
                }
            },
        },
    ]
}
export {
    _showInfoConfig,
    _filterFormConfig,
    addinvoice_fromConfig
}