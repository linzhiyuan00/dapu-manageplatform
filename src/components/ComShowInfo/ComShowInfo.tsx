import { CommonMap } from '@/common/map';
import React from 'react';
import styles from './ComShowInfo.less';

const ComShowInfo = (props: any) => {
    const { showInfoConfig = [], data = {} } = props;

    const getValue = (data: any, key: string, item: ShowInfoConfig) => {
        let value = data;
        const keyList = key.split('.');
        keyList.forEach((key: string) => {
            value = value?.[key];
        });
        if (item.maptype) {
            return CommonMap[item.maptype][value]
        }
        return value;
    }

    return (
        <div className={styles.comshowinfo} >
            {
                showInfoConfig.map((item: ShowInfoConfig) => {
                    return (
                        <div key={item.label} className={styles.showinfoitem} style={item.divider ? { marginBottom: 32 } : {}}>
                            <div className={styles.label}>{item.label}：</div>
                            <div className={styles.content}>
                                {
                                    (!item?.type || item.type === 'text') && (
                                        <span >{getValue(data, item.key, item)}</span>
                                    )
                                }
                                {
                                    item.type === 'money' && (
                                        <span style={{ color: '#DA041B' }} >{getValue(data, item.key, item)} {item.moneyText} 元</span>
                                    )
                                }
                                {
                                    item.type === 'file' && (
                                        <a href={getValue(data, item.fileUrl as string, item)} target="_blank" style={{ color: '#0471E3' }} rel="noreferrer" >{getValue(data, item.key, item)}</a>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export interface ShowInfoConfig {
    label: string;
    type?: 'text' | 'status' | 'money' | 'file';
    key: string;
    style?: any;
    maptype?: string,
    moneyText?: string,
    fileUrl?: string,
    divider?: boolean
}


export default ComShowInfo;