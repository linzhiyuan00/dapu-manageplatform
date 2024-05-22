import React, { useEffect, useState, useRef } from 'react';
import styles from './ComFilter.less';
import iconDown from '@/assets/icon-down.svg';
import IconFont from '@/components/IconFont/IconFont';
import { ComForm, FromConfig } from '@/components/index'
import { Button } from 'antd';

const ComFilter = (props: {
    buttonText?: string,
    cancelText?: string,
    cancel?: () => void,
    ok?: (model: any) => void,
    okText?: string,
    fromConfig?: FromConfig[],
    model?: any
}) => {
    const { buttonText = '筛选订单', cancelText = '重置', okText = '筛选', fromConfig = [], model = {} } = props;
    const [listOpen, setListOpen] = useState(false);
    const _fromRef_1: any = useRef();

    const [tempModel, SetTempModel] = useState({});

    useEffect(() => {
        SetTempModel(model)
    }, [])

    const cancel = () => {
        _fromRef_1.current.clear();
        if (props.cancel) {
            props.cancel();
        }

    }

    const ok = () => {
        setListOpen(false);
        if (props.ok) {
            props.ok(_fromRef_1.current._model)
        }
    }

    const markClick = () => {
        setListOpen(false)
    }

    return (
        <div className={styles.ComFilter}>
            <div className={listOpen ? styles.comfilterButton + ' ' + styles.open : styles.comfilterButton} onClick={() => setListOpen(!listOpen)}>
                <span className='fn14'>{buttonText}</span>
                <img className={listOpen ? styles.righticon + ' ' + styles.up : styles.righticon} src={iconDown} alt="" />
            </div>
            <div style={{ display: listOpen ? 'block' : 'none' }}>
                <div className={styles.mark} onClick={markClick}></div>
                <div className={styles.content} onClick={e => e.stopPropagation()}>
                    <div className={styles.filterTitle}>筛选规则</div>
                    <ComForm ref={_fromRef_1} fromConfig={fromConfig} model={tempModel} optionConfig={{ labelWidth: 70 }}></ComForm>
                    <div className={styles.footer}>
                        <Button onClick={cancel}>{cancelText}</Button>
                        <Button onClick={ok} type='primary'>{okText}</Button>
                    </div>
                </div>
            </div>



        </div>
    );
}


export default ComFilter;