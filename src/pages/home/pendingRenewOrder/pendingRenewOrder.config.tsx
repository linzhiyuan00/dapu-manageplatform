import { ShowInfoConfig } from "@/components"
const _showInfoConfig: ShowInfoConfig[] = [
    {
        type: 'text',
        key: 'full_number',
        label: '整车编号'
    },
    {
        type: 'text',
        key: 'device_number',
        label: '设备号'
    },
    {
        type: 'text',
        key: 'ICCID',
        label: 'ICCID',
        divider: true
    },
    {
        type: 'text',
        key: 'package.package_name',
        label: '套餐内容'
    },
    {
        type: 'money',
        key: 'package.package_price',
        label: '套餐价格',
    },
    {
        type: 'status',
        key: 'order_status',
        label: '套餐状态',
        maptype: 'order_status',
        divider: true
    },
    {
        type: 'text',
        key: 'order_id',
        label: '订单编号'
    },
    {
        type: 'text',
        key: 'order_type',
        maptype: 'order_type',
        label: '订单类型'
    },
    {
        type: 'text',
        key: 'create_time',
        label: '创建时间'
    },
    {
        type: 'text',
        key: 'sanyi_account',
        label: '付款账号'
    },
    {
        type: 'text',
        key: 'pay_type',
        maptype: 'pay_type',
        label: '支付方式',
        divider: true
    },
];

export {
    _showInfoConfig
}