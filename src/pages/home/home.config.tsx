export const menuMap: { [key: string]: { routePath: string } } = {
    simManage: {
        routePath: '/home/simManage'
    },
    pendingRenewOrder: {
        routePath: '/home/pendingRenewOrder'
    },
    orderRecord: {
        routePath: '/home/orderRecord'
    },
    remitInfoSubmitAudit: {
        routePath: '/home/remitInfoSubmitAudit'
    },
    remitRecord: {
        routePath: '/home/remitRecord'
    },
    invoiceApplyAduit: {
        routePath: '/home/invoiceApplyAduit'
    },
    invoiceRecord: {
        routePath: '/home/invoiceRecord'
    },
}

export const menuConfig = [
    {
        title: 'SIM卡管理',
        key: 'simManage',
        iconType: 'icon-a-Iconmianxing2020SIMka',
    },
    {
        title: '订单管理',
        key: '2',
        iconType: 'icon-a-Iconmianxing2020biaodan',
        children: [
            // {
            //     title: '待处理套餐续费订单',
            //     key: 'pendingRenewOrder'
            // },
            {
                title: '订单记录',
                key: 'orderRecord'
            },
        ]
    },
    {
        title: '资金管理',
        key: '3',
        iconType: 'icon-a-Iconmianxing2020yinhangka',
        children: [
            {
                title: '汇款信息提交审核',
                key: 'remitInfoSubmitAudit'
            },
            {
                title: '汇款记录',
                key: 'remitRecord'
            },
        ]
    },
    {
        title: '发票管理',
        key: '4',
        iconType: 'icon-a-Iconmianxing2020fapiao',
        children: [
            {
                title: '开票申请审核',
                key: 'invoiceApplyAduit'
            },
            {
                title: '开票记录',
                key: 'invoiceRecord'
            },
        ]
    },
];
