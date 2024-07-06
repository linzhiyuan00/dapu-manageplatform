import React from 'react';
import styles from './CardList.less';
import IconFont from '@/components/IconFont/IconFont';
import { message, Modal, Spin } from 'antd';
import router from 'umi/router';
import { $http } from '@/common/http';
import { API } from '@/common/API';
const { confirm } = Modal;

const newsTypeConfig = {
    '达普动态': '#0215C1',
    '战略合作': '#DA041B',
    '学术前沿': '#399E0E',
    '会展邀约': '#FA8C16',
}



type cardItem = {
    cover: string,
    title: string,
    type?: string,
    time?: number,
    eyeCount: number,
    [key: string]: any,
    id: number
};
const CardList = (props: {
    list: cardItem[],
    type: 'case' | 'news',
    loading: boolean,
    onChange?: (type: 'delete', item: any) => void
}) => {

    const typeName = props.type === 'case' ? '案例' : '资讯';

    const toEdit = (item: cardItem) => {
        if (props.type === 'news') {
            router.push({
                pathname: '/home/editor',
                query: {
                    type: 'news',
                    action: 'edit',
                    id: item.id
                }
            })
        } else {
            router.push({
                pathname: '/home/editor',
                query: {
                    type: 'case',
                    action: 'edit',
                    id: item.id
                }
            })
        }
    }

    const deleteCard = (item: cardItem) => {
        confirm({
            title: `应用${typeName}删除确认`,
            content: `删除后，该${typeName}的数据将永久删除。`,
            okText: '确认删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                const api = props.type === 'case' ? API.caseDeleteId : API.newsDeleteId;
                return $http.get(api + item.id).then((res: any) => {
                    if (res.code === 200) {
                        message.success({
                            content: '删除成功'
                        });
                        if (props.onChange) {
                            props.onChange('delete', item)
                        }
                    } else {
                        message.error({
                            content: res.msg
                        })
                    }
                })
            }
        });

    }

    return (
        <Spin spinning={props?.loading}>
            <div className={styles.ComCardList}>
                {
                    props.list?.map((item) => {
                        return (
                            <div className={styles.cardItem}>
                                <img src={item?.cover || item?.picture} alt="" />
                                <div className={styles.content}>
                                    <div className={styles.type} style={{ color: newsTypeConfig[item?.type] }}>{item?.type}</div>
                                    <div className={styles.title}>{item?.title}</div>
                                    <div className={styles.time}>{item?.createTime}</div>
                                </div>
                                <div className={styles.operate}>
                                    <IconFont className={styles.editicon} type="icon-toumingceng" onClick={() => toEdit(item)} />
                                    <IconFont className={styles.deleteicon} type="icon-a-Iconxianxing2020lajitong" onClick={() => deleteCard(item)} />
                                    <div className={styles.eye}>
                                        <IconFont type="icon-a-Iconxianxing2020yanjing" />
                                        {item.eyeCount}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Spin>
    );
}


export default CardList;