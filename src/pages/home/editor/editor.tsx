import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {
    Form,
    Select,
    Input,
    Button,
    Upload,
    Icon,
    message
} from 'antd';
import router from 'umi/router';
import { $http } from '@/common/http';
import { API } from '@/common/API';
import { getToken } from '@/common/utils';
const { Option } = Select;




function MyEditor(props: any) {
    const { type, action, id = undefined } = props.location.query;
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

    // 编辑器内容
    const [html, setHtml] = useState('');
    const [typeName] = useState(type === 'case' ? '案例' : '资讯');
    const [showUpload, setShowUpload] = useState(true);
    const [data, setData] = useState({
        title: '',
        upload: [],
        content: '',
        type: ''
    })


    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        if (action === 'edit' && id) {
            $http.get((type === 'case' ? API.caseInfoId : API.newsInfoId) + id).then((res: any) => {
                if (res.code === 200) {
                    setData({
                        ...res.data,
                        upload: [{
                            uid: res.data.picture,
                            url: res.data.picture
                        }]
                    });
                    setShowUpload(false);
                    setHtml(res.data.content)
                }
            })
        }
    }, [action, id, type])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: ['group-video',]
    }  // TS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                server: API.uploadFile,
                fieldName: 'file',
                headers: {
                    token: getToken(),
                },
                customInsert(res: any, insertFn: any) {  // TS 语法
                    insertFn(
                        // window.location.origin + res.data,
                        // 'http://114.55.225.21:8097/' + res.data,
                        res.data,
                        '', '')
                },
            }
        }
    }

    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                if (html === '<p><br></p>') {
                    message.error({
                        content: `请输入${typeName}正文!`
                    });
                    return;
                }
                let param: any = {
                    title: values.title,
                    picture: values.upload?.[0]?.response?.data || data.upload[0].url,
                    content: html,
                    id
                }
                if (type === 'news') {
                    param = {
                        ...param,
                        type: values.type
                    }
                }
                let api = '';
                if (type === 'news') {
                    api = action === 'add' ? API.newsInsert : API.newsUpdateId
                } else {
                    api = action === 'add' ? API.caseInsert : API.caseUpdateId
                }

                $http.post(api, param).then((res: any) => {
                    if (res.code === 200) {
                        message.success({
                            content: `${action === 'add' ? '添加' : '修改'}${typeName}成功`
                        });
                        router.goBack();
                    } else {
                        message.error({
                            content: res.msg
                        })
                    }
                })
            }
        });
    };

    const normFile = (e: any) => {
        if (e.fileList?.length > 0) {
            setShowUpload(false)
        } else {
            setShowUpload(true)
        }
        return e && e.fileList;
    };

    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <>
            <div className="com_page">
                <div className="com_page_title">
                    应用{typeName}管理
                    <div className="operate" style={{ marginLeft: 'auto' }}>
                        <Button style={{ marginRight: 8 }} onClick={() => {
                            router.goBack()
                        }}>取消</Button>
                        <Button type='primary' onClick={handleSubmit}>{action === 'add' ? '添加' : '保存'}</Button>
                    </div>
                </div>
                <div style={{ maxHeight: 'calc(100% - 52px)', overflowY: 'auto' }}>
                    <div className="com_page_content">
                        <Form {...formItemLayout}>
                            <Form.Item label="封面" extra="建议尺寸：1136×568，格式为JPG、PNG。" style={{ height: '240px' }}>
                                {getFieldDecorator('upload', {
                                    initialValue: data.upload,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: normFile,
                                    rules: [{
                                        required: true,
                                        message: '请选择封面!',
                                    },]
                                })(
                                    <Upload
                                        action={API.uploadFile}
                                        className={`bigUploadPic ${showUpload ? '' : 'hiddenUpload'}`}
                                        accept="jpg,png"
                                        listType="picture-card"
                                        headers={{ token: getToken() || '' }}
                                    >
                                        {uploadButton}
                                    </Upload>,
                                )}
                            </Form.Item>
                            <Form.Item label="标题">
                                {getFieldDecorator('title', {
                                    initialValue: data.title,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入标题!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            {
                                type === 'news' &&
                                (
                                    <Form.Item label="类型">
                                        {getFieldDecorator('type', {
                                            initialValue: data.type,
                                            rules: [{ required: true, message: '请选择资讯类型!' }],
                                        })(
                                            <Select placeholder="请选择资讯类型">
                                                <Option value="达普动态">达普动态</Option>
                                                <Option value="战略合作">战略合作</Option>
                                                <Option value="学术前沿">学术前沿</Option>
                                                <Option value="会展邀约">会展邀约</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                )
                            }

                        </Form>
                    </div>
                    <div className="com_page_content">
                        <div className='marbottom12'>资讯正文: </div>
                        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                            <Toolbar
                                editor={editor}
                                defaultConfig={toolbarConfig}
                                mode="default"
                                style={{ borderBottom: '1px solid #ccc' }}
                            />
                            <Editor
                                defaultConfig={editorConfig}
                                value={html}
                                onCreated={setEditor}
                                onChange={editor => setHtml(editor.getHtml())}
                                mode="default"
                                style={{ minHeight: '800px', overflowY: 'hidden' }}
                            />
                        </div>
                        {/* <div style={{ marginTop: '15px' }}>
                        <div dangerouslySetInnerHTML={{
                            __html: html
                        }} />
                    </div> */}
                    </div>
                </div>

            </div >

        </>
    )
}
const MyEditorForm = Form.create({ name: 'validate_other' })(MyEditor);

export default MyEditorForm