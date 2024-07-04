import React, { useEffect, useState, useRef } from 'react';
import styles from './CardList.less';
import iconDown from '@/assets/icon-down.svg';
import IconFont from '@/components/IconFont/IconFont';
import { ComForm, FromConfig } from '@/components/index'
import { Button } from 'antd';

const CardList = (props: {
    list: {
        title: string,
        type?: string,
        time?: number,
        eyeCount: number,
        [key: string]: any
    }[],
}) => {
    const [list, setListOpen] = useState(false);

    return (
        <div className={styles.ComCardList}>
            {
                props.list?.map((item) => {
                    return (
                        <div className={styles.cardItem}>
                            <img src="http://114.55.225.21:3001/static/%E6%B6%B2%E6%BB%B4%E5%BE%AE%E6%B5%81%E6%8E%A7.b705a00a.png" alt="" />
                            <div className={styles.content}>
                                <div className={styles.type}>{item?.type}</div>
                                <div className={styles.title}>{item?.title}</div>
                                <div className={styles.time}>{item?.time}</div>
                            </div>
                            <div className={styles.operate}>
                                <IconFont className={styles.editicon} style={{ fontSize: 20, marginRight: 14 }} type="icon-a-Iconxianxing2020jiantoutuichu" />
                                <IconFont className={styles.deleteicon} style={{ fontSize: 20, marginRight: 14 }} type="icon-a-Iconxianxing2020jiantoutuichu" />
                                <div className={styles.eye}>
                                    <IconFont className={styles.editicon} style={{ fontSize: 20, marginRight: 14 }} type="icon-a-Iconxianxing2020jiantoutuichu" />
                                    {item.eyeCount}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}


export default CardList;