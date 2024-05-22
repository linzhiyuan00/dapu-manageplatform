import React from 'react';
import styles from './ComStatus.less';

const statusMap: any = {
    device_status: {
        1: {
            label: '快过期',
            class: styles.warn
        },
        2: {
            label: '已过期',
            class: styles.error
        },
        3: {
            label: '正常',
            class: styles.success
        },
        4: {
            label: '销卡',
            class: styles.black
        },
        5: {
            label: '已解绑',
            class: styles.black
        }
    },
    order_status: {
        1: {
            label: '待处理',
            class: styles.theme
        },
        2: {
            label: '开通成功',
            class: styles.success
        }
    },
    remit_status: {
        1: {
            label: '待审核',
            class: styles.theme
        },
        2: {
            label: '已入账',
            class: styles.success
        },
        3: {
            label: '未通过',
            class: styles.error
        },
    },
    invoice_status: {
        1: {
            label: '审核中',
            class: styles.theme
        },
        2: {
            label: '已开票',
            class: styles.success
        },
        3: {
            label: '未通过',
            class: styles.error
        },
    },
    is_expired: {
        0: {
            label: '未过期',
            class: styles.success
        },
        1: {
            label: '已过期',
            class: styles.error
        },
    },
}

const ComStatus = (props: any) => {
    const { type = 'order_status', value = 1 } = props;
    const className1 =  statusMap[type][value] ? statusMap[type][value].class : '';
    const label1 =statusMap[type][value] ? statusMap[type][value].label : '-';

    return (
        <>
            <span className={styles.comstatus + ' ' +className1}></span>
            {label1}
        </>

    );
}

export interface CardConfig {
    title: string;
    content: string;
    imgUrl: string
}


export default ComStatus;