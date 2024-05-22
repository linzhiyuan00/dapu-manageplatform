import React, { useEffect, useState } from 'react';
import styles from './ComTable.less';
import { Table } from 'antd';

const ComTable = (props: any) => {
    // console.log('props:', props)
    const { columns = [], dataSource = [], total = 0, loading = false, searching = false, ...otherProps } = props;
    return (
        <>
            {
                dataSource.length === 0 && !loading ?
                    <div className={styles.nodata}>
                        <div className={styles.header}></div>
                        <div className={styles.content}>
                            {
                                searching ?
                                    <div>
                                        <img src={"https://hongyun.hopechart.com:12343/storage/img/nodata/search-nodata.svg"} alt="" />
                                        <div className="com-tip">未搜索到相关数据，请尝试其他搜索词</div>
                                    </div>
                                    :
                                    <div>
                                        <img src={"https://hongyun.hopechart.com:12343/storage/img/nodata/nodata.svg"} alt="" />
                                        <div className="com-tip">暂无相关数据</div>
                                    </div>
                            }

                        </div>
                    </div>
                    :
                    <Table
                        className={styles.comtable}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            total: total,
                            showTotal: (total) => `共 ${total} 条`,
                            showSizeChanger: true
                        }}
                        loading={loading}
                        {...otherProps}
                    />
            }

        </>

    );
}


export default ComTable;