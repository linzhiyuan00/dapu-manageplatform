import React from 'react';
import styles from './ComShowCard.less';
import logosvg from '@/assets/sim.svg';
import IconFont from '../IconFont/IconFont';

const ComShowCard = (props: any) => {
    // console.log('ComShowCard-props:', props)
    const { title = 'title', content = '', imgUrl = logosvg } = props;

    return (
        <div className={styles.comcard} >
            <div>
                <div className="fn14" style={{ marginBottom: 8 }}>{title}</div>
                <div className="fn18">{content}</div>
            </div>
            <div className={styles.imgbox}>
                <IconFont style={{ fontSize: 20,color: '#0471E3' }} type={imgUrl} />
            </div>
        </div>
    );
}

export interface CardConfig {
    title: string;
    content: string;
    imgUrl: string
}


export default ComShowCard;