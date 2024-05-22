const CommonMap: { [key: string]: any } = {
    device_status: {
        1: '快到期',
        2: '已到期',
        3: '正常',
        4: '已销卡',
        5: '已解绑'
    },
    pay_type: {
        1: '企业钱包',
        2: '微信支付'
    },
    order_status: {
        1: '待处理',
        2: '开通成功'
    },
    order_type: {
        1: '套餐续费'
    },
    invoice_status: {
        1: '企业钱包',
        2: '微信支付'
    },
    invoice_type: {
        1: '个人增值税电子普通发票',
        2: '企业增值税电子普通发票'
    },
    entry_method: {
        1: '审核通过',
        2: '后台添加'
    },
    is_expired: {
        0: '未过期',
        1: '已过期'
    }
}

const mapToArr = (map: { [key: string]: any }) => {
    return Object.keys(map).map((key) => {
        return {
            label: map[key],
            value: key
        }
    })
}

const arrToOptions = (arr: { [key: string]: any }, label: string, value: string) => {
    return arr.map((item: any) => {
        return {
            label: item[label],
            value: item[value]
        }
    })
}

export {
    CommonMap,
    arrToOptions,
    mapToArr
}