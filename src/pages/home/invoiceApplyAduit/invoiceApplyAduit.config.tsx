import { ShowInfoConfig, FromConfig } from "@/components"
const _showInfoConfig1: { 1: ShowInfoConfig[], 2: ShowInfoConfig[] } = {
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
            type: 'status',
            key: 'invoice_status',
            label: '状态',
            maptype: 'invoice_status',
        },
        {
            type: 'text',
            key: 'create_time',
            label: '提交时间',
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
            key: 'enterprise_name',
            label: '企业名称',
            divider: true
        },
        {
            type: 'text',
            key: 'identity_number',
            label: '纳税人识别号',
            divider: true
        },
        {
            type: 'text',
            key: 'enterprise_address',
            label: '企业地址',
            divider: true
        },
        {
            type: 'text',
            key: 'enterprise_phone',
            label: '企业电话',
            divider: true
        },
        {
            type: 'text',
            key: 'deposit_bank',
            label: '开户银行',
            divider: true
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
            type: 'status',
            key: 'invoice_status',
            label: '状态',
            maptype: 'invoice_status',
        },
        {
            type: 'text',
            key: 'create_time',
            label: '提交时间',
            divider: true
        },
    ]
};

const _showInfoConfig2:
    {
        1: {
            2: ShowInfoConfig[], 3: ShowInfoConfig[]
        },
        2: {
            2: ShowInfoConfig[], 3: ShowInfoConfig[]
        }
    } =
{
    1: {
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
        3:[
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
            },
            {
                type: 'text',
                key: 'create_time',
                label: '未通过原因',
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
    },
    2: {
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
        ],
        3: [
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
            },
            {
                type: 'text',
                key: 'create_time',
                label: '未通过原因',
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
    }
};

const _openInvoiceFromConfig: FromConfig[] = [
    {
        type: 'text',
        label: '发票代码',
        key: 'invoice_code',
        required: true,
        templateOptions: {
            placeholder: '请输入发票代码',
            style: {
                width: '360px'
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
                width: '360px'
            }
        }
    },
    {
        type: 'date',
        label: '开票日期',
        key: 'invoice_time',
        required: true,
        templateOptions: {
            placeholder: '请选择日期',
            style: {
                width: '240px',
                marginBottom: '16px',
            }
        }
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
];
export {
    _showInfoConfig1,
    _showInfoConfig2,
    _openInvoiceFromConfig
}