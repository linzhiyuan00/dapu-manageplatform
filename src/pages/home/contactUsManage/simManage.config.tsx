import { FromConfig } from '@/components/ComForm/ComForm';

const fromConfig_2_single: FromConfig[] = [
    {
        type: 'text',
        label: 'ICCID',
        key: 'ICCID',
        templateOptions: {
            placeholder: '请输入ICCID',
            style: {
                width: '360px'
            }
        }
    },
    {
        type: 'select',
        label: '套餐',
        key: 'package_id',
        templateOptions: {
            placeholder: '请选择套餐',
            options: [],
            style: {
                width: ' 360px'
            }
        }
    },
    {
        type: 'date',
        label: '到期时间',
        key: 'expired_time',
        templateOptions: {
            placeholder: '请选择到期时间',
            style: {
                width: '240px'
            }
        }
    },
    {
        type: 'date',
        label: '销卡时间',
        key: 'cardcancel_time',
        templateOptions: {
            placeholder: '请选择销卡时间',
            style: {
                width: '240px'
            }
        }
    }
];

const fromConfig_2_mult: FromConfig[] = [
    {
        type: 'select',
        label: '套餐',
        key: 'package_id',
        templateOptions: {
            placeholder: '请选择套餐',
            options:[],
            style: {
                width: '360px'
            }
        }
    },
    {
        type: 'date',
        label: '到期时间',
        key: 'expired_time',
        templateOptions: {
            placeholder: '请选择到期时间',
            style: {
                width: '240px'
            }
        }
    },
    {
        type: 'date',
        label: '销卡时间',
        key: 'cardcancel_time',
        templateOptions: {
            placeholder: '请选择销卡时间',
            style: {
                width: '240px'
            }
        }
    }
];

export {
    fromConfig_2_single,
    fromConfig_2_mult
}