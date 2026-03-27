import { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Space, message, Upload } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('info');
  const [infoForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleInfoSave = () => {
    infoForm.validateFields().then((values) => {
      message.success('个人信息保存成功');
    }).catch(() => {});
  };

  const handlePasswordSave = () => {
    passwordForm.validateFields().then((values) => {
      if (values.newPassword !== values.confirmPassword) {
        message.error('两次输入的密码不一致');
        return;
      }
      message.success('密码修改成功');
      passwordForm.resetFields();
    }).catch(() => {});
  };

  const uploadButton = (
    <div className="avatar-upload">
      <UploadOutlined />
      <div className="ant-upload-text">点击上传</div>
    </div>
  );

  return (
    <div className="profile-page">
      <Card className="profile-card">
        <div className="profile-header-section">
          <div className="profile-avatar-section">
            <Avatar
              size={120}
              src={null}
              className="profile-avatar"
              icon={<UserOutlined />}
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            />
            <Upload showUploadList={false}>
              <Button className="avatar-upload-btn" icon={<UploadOutlined />}>
                更换头像
              </Button>
            </Upload>
          </div>
          <div className="profile-info-preview">
            <h2 className="profile-name">Robin</h2>
            <p className="profile-role">老师</p>
            <Space className="profile-contact">
              <span><PhoneOutlined /> 186****8835</span>
              <span><MailOutlined /> robin@example.com</span>
            </Space>
          </div>
        </div>

        <div className="profile-tabs">
          <div className="tab-buttons">
            <button
              className={activeTab === 'info' ? 'active' : ''}
              onClick={() => setActiveTab('info')}
            >
              我的信息
            </button>
            <button
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              修改密码
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'info' && (
              <div className="info-form">
                <Form form={infoForm} layout="vertical" initialValues={{
                  name: 'Robin',
                  phone: '18606288835',
                  email: 'robin@example.com',
                  department: '教学部',
                }}>
                  <div className="form-row">
                    <Form.Item
                      name="name"
                      label="姓名"
                      rules={[{ required: true, message: '请输入姓名' }]}
                    >
                      <Input prefix={<UserOutlined />} size="large" />
                    </Form.Item>
                    <Form.Item
                      name="department"
                      label="部门"
                      rules={[{ required: true, message: '请输入部门' }]}
                    >
                      <Input prefix={<UserOutlined />} size="large" />
                    </Form.Item>
                  </div>
                  <div className="form-row">
                    <Form.Item
                      name="phone"
                      label="手机号"
                      rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
                      ]}
                    >
                      <Input prefix={<PhoneOutlined />} size="large" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="邮箱"
                      rules={[
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '请输入正确的邮箱' }
                      ]}
                    >
                      <Input prefix={<MailOutlined />} size="large" />
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      icon={<SaveOutlined />}
                      onClick={handleInfoSave}
                    >
                      保存信息
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="password-form">
                <Form form={passwordForm} layout="vertical">
                  <Form.Item
                    name="oldPassword"
                    label="当前密码"
                    rules={[{ required: true, message: '请输入当前密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="请输入当前密码"
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[
                      { required: true, message: '请输入新密码' },
                      { min: 6, message: '密码长度至少为 6 位' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="请输入新密码"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    rules={[{ required: true, message: '请再次输入密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="请再次输入密码"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      icon={<SaveOutlined />}
                      onClick={handlePasswordSave}
                    >
                      修改密码
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
