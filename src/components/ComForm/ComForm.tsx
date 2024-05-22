import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styles from './ComForm.less';
import { Input, DatePicker, Select, Upload, Icon, message } from 'antd';
import IconFont from '../IconFont/IconFont';
import { API } from '@/common/API';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const ComForm = forwardRef((props: {
    fromConfig: FromConfig[],
    model: any,
    optionConfig?: {
        labelWidth?: number,
        componentWidth?: number
    }
}, ref) => {
    useImperativeHandle(ref, () => ({
        vaild,
        clear,
        _model
    }))
    // console.log('props:', props)
    const { fromConfig = [], model = {}, optionConfig = { labelWidth: 116 } } = props;
    const [_fromConfig, set_fromConfig] = useState<FromConfig[]>([]);
    const [_model, set_model] = useState<any>({});
    const [_fileList, set_fileList] = useState<any>([]);

    useEffect(() => {
        set_fromConfig(fromConfig);
    }, [fromConfig])

    useEffect(() => {
        set_model(model);
    }, [model])

    const clear = () => {
        set_model(model)
        set_fileList([])
    };

    const vaild = () => {
        let result = true;
        const newfromConfig = [..._fromConfig];
        newfromConfig.forEach((item) => {
            if (item.required && !_model[item.key]) {
                item.error = true;
                result = false;
            }
        });
        set_fromConfig(newfromConfig);
        return result;
    }

    const valueOnchange = (value: any, key: string, type: 'text' | 'date' | 'rangeDate' | 'money' | 'select' | 'textArea' | 'upload') => {
        let model = { ..._model };
        if (value) {
            const newfromConfig = [..._fromConfig];
            newfromConfig.forEach((item) => {
                if (item.key === key && item.required) {
                    item.error = false;
                }
            });
            set_fromConfig(newfromConfig);

        } else {
            const newfromConfig = [..._fromConfig];
            newfromConfig.forEach((item) => {
                if (item.key === key && item.required) {
                    item.error = true;
                }
            });
            set_fromConfig(newfromConfig);
        }
        model[key] = value;
        set_model(model);
        model = model;
    }


    // 文件上传
    const fileOnchange = (e: any, key: string) => {
        let fileList = [...e.fileList];
        fileList = fileList.slice(-2);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        set_fileList(fileList)
        if (e?.file?.status === 'done') {
            if (e.file.response.data) {
                const file_id = e.file.response.data.file_id + '';
                valueOnchange(file_id, key, 'upload')
            } else {
                message.error(e.file.response.msg)
            }

        }


    }

    return (
        <div className={styles.comfrom}>
            {
                _fromConfig.map((item) => {
                    if (item.type === 'text') {
                        return (
                            <div key={item.key} className={`${item.error ? `${styles.item} erroritem` : `${styles.item}`}`}>
                                <div className={styles.label} style={{ width: optionConfig.labelWidth }}>
                                    {item.required && <span className={styles.required}>*</span>}
                                    {item.label}：
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.from_component} style={{ width: optionConfig.componentWidth }}>
                                        <Input style={{ width: '100%' }} value={_model[item.key]} onChange={(e: any) => {valueOnchange(e.target.value, item.key, item.type) }} {...item.templateOptions}></Input>
                                    </div>
                                    {
                                        item.error && <div className={styles.errortip}>请输入{item.label}</div>
                                    }
                                </div>
                            </div>

                        )
                    }
                    if (item.type === 'textArea') {
                        return (
                            <div key={item.key} className={`${item.error ? `${styles.item} erroritem` : `${styles.item}`}`}>
                                <div className={styles.label} style={{ width: optionConfig.labelWidth }}>
                                    {item.required && <span className={styles.required}>*</span>}
                                    {item.label}：
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.from_component} style={{ width: optionConfig.componentWidth }}>
                                        <TextArea style={{ width: '100%' }} value={_model[item.key]} onChange={(e: any) => { valueOnchange(e.target.value, item.key, item.type) }} {...item.templateOptions}></TextArea>
                                    </div>
                                    {
                                        item.error && <div className={styles.errortip}>请输入{item.label}</div>
                                    }
                                </div>
                            </div>

                        )
                    }
                    if (item.type === 'date') {
                        return (
                            <div className={`${item.error ? `${styles.item} erroritem` : `${styles.item}`}`}>
                                <div className={styles.label} style={{ width: optionConfig.labelWidth }}>
                                    {item.required && <span className={styles.required}>*</span>}
                                    {item.label}：
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.from_component} style={{ width: optionConfig.componentWidth }}>
                                        <DatePicker style={{ width: '100%' }} onChange={(value: any) => { valueOnchange(value, item.key, item.type) }} value={_model[item.key]} {...item.templateOptions} />
                                    </div>
                                    {
                                        item.error && <div className={styles.errortip}>请选择{item.label}</div>
                                    }
                                </div>
                            </div>

                        )
                    }

                    if (item.type === 'rangeDate') {
                        return (
                            <div className={`${item.error ? `${styles.item} erroritem` : `${styles.item}`}`}>
                                <div className={styles.label} style={{ width: optionConfig.labelWidth }}>
                                    {item.required && <span className={styles.required}>*</span>}
                                    {item.label}：
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.from_component} style={{ width: optionConfig.componentWidth }}>
                                        <RangePicker style={{ width: '100%' }} onChange={(value: any) => { valueOnchange(value, item.key, item.type) }} value={_model[item.key]} {...item.templateOptions} />
                                    </div>
                                    {
                                        item.error && <div className={styles.errortip}>请选择{item.label}</div>
                                    }
                                </div>
                            </div>

                        )
                    }
                    if (item.type === 'money') {
                        return (
                            <Input type="text" />
                        )
                    }
                    if (item.type === 'select') {
                        return (
                            <div className={`${item.error ? `${styles.item} erroritem` : `${styles.item}`}`}>
                                <div className={styles.label} style={{ width: optionConfig.labelWidth }}>
                                    {item.required && <span className={styles.required}>*</span>}
                                    {item.label}：
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.from_component} style={{ width: optionConfig.componentWidth }}>
                                        <Select placeholder="请选择" style={{ width: '100%' }} onChange={(value: any) => { valueOnchange(value, item.key, item.type) }} value={_model[item.key]} {...item.templateOptions}>
                                            {
                                                item?.templateOptions?.options.map((opt: any) =>
                                                    <Option value={opt.value}>{opt.label}</Option>
                                                )
                                            }
                                        </Select>
                                    </div>
                                    {
                                        item.error && <div className={styles.errortip}>请选择{item.label}</div>
                                    }
                                </div>
                            </div>

                        )
                    }
                    if (item.type === 'upload') {
                        return (
                            <div className={`${item.error ? `${styles.item} erroritem` : `${styles.item}`}`}>
                                <div className={styles.label} style={{ width: optionConfig.labelWidth }}>
                                    {item.required && <span className={styles.required}>*</span>}
                                    {item.label}：
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.from_component} style={{ width: optionConfig.componentWidth, lineHeight: 32 + 'px' }}>
                                        <Upload fileList={_fileList} name='upload_file' onChange={(e) => fileOnchange(e, item.key)} action={API.uploadFile} withCredentials {...item.templateOptions}>
                                            <IconFont style={{ fontSize: 20, color: '#0471E3', position: 'relative', top: 2, marginRight: 6 }} type='icon-a-Iconxianxing2020feiji' />
                                            <span style={{ color: '#0471E3', cursor: 'pointer' }}>上传文件</span>
                                        </Upload>
                                    </div>
                                    {
                                        item.error && <div className={styles.errortip}>请上传{item.label}</div>
                                    }
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div >
    );
});

export default ComForm;

export interface FromConfig {
    type: 'text' | 'date' | 'rangeDate' | 'money' | 'select' | 'textArea' | 'upload';
    key: string;
    label: string;
    required?: boolean;
    error?: boolean;
    templateOptions?: any
}