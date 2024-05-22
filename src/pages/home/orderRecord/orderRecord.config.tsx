import { CommonMap, mapToArr, arrToOptions } from "@/common/map";
import { ShowInfoConfig, FromConfig } from "@/components"
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
        label: '套餐价格'
    },
    {
        type: 'status',
        key: 'is_expired',
        label: '套餐状态',
        maptype: 'is_expired',
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

const _filterFormConfig: FromConfig[] = [
    {
        type: 'select',
        key: 'order_type',
        label: '订单类型',
        templateOptions: {
            options: mapToArr(CommonMap.order_type),
            placeholder: '全部类型',
        }
    },
    {
        type: 'select',
        key: 'package_id',
        label: '套餐',
        templateOptions: {
            options: [],
            placeholder: '全部类型',
        }
    },
    {
        type: 'select',
        key: 'is_expired',
        label: '套餐状态',
        templateOptions: {
            options: mapToArr(CommonMap.is_expired),
            placeholder: '全部类型',
        }
    },
    {
        type: 'select',
        key: 'pay_type',
        label: '支付方式',
        templateOptions: {
            options: mapToArr(CommonMap.pay_type),
            placeholder: '全部类型',
        }
    },
    {
        type: 'rangeDate',
        key: 'create_time',
        label: '创建时间'
    },
];

export {
    _showInfoConfig,
    _filterFormConfig
}