import { useState } from 'react';
import { Card, Tabs, Table, Button, Space, Input, Upload, Progress, Tag } from 'antd';
import {
  CloudOutlined,
  ShareAltOutlined,
  UploadOutlined,
  SearchOutlined,
  FileOutlined,
  FolderOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Cloud.css';

const { TabPane } = Tabs;

// 模拟我的云盘文件数据
const myFiles = [
  { id: 1, name: '雅思阅读教材.pdf', size: '12.5 MB', date: '2026-03-25', type: 'file' },
  { id: 2, name: '托福听力真题', size: '-', date: '2026-03-24', type: 'folder' },
  { id: 3, name: 'SAT 数学讲义.docx', size: '5.8 MB', date: '2026-03-23', type: 'file' },
  { id: 4, name: '学生名单.xlsx', size: '1.2 MB', date: '2026-03-22', type: 'file' },
  { id: 5, name: '课程课件', size: '-', date: '2026-03-20', type: 'folder' },
  { id: 6, name: '写作范文合集.pdf', size: '8.3 MB', date: '2026-03-18', type: 'file' },
];

// 模拟共享云盘文件数据
const sharedFiles = [
  { id: 1, name: '机构统一教材 2026.pdf', size: '25.6 MB', date: '2026-03-26', uploader: '管理员', type: 'file' },
  { id: 2, name: '教学计划模板.docx', size: '2.1 MB', date: '2026-03-25', uploader: 'Evelyn', type: 'file' },
  { id: 3, name: '公开课资料', size: '-', date: '2026-03-24', uploader: 'Molly', type: 'folder' },
  { id: 4, name: '学生管理流程.pdf', size: '3.5 MB', date: '2026-03-22', uploader: '管理员', type: 'file' },
];

const Cloud: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('my');

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text: string, record: any) => (
        <div className="file-name">
          {record.type === 'folder' ? <FolderOutlined className="file-icon folder" /> : <FileOutlined className="file-icon" />}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '上传日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '上传人',
      dataIndex: 'uploader',
      key: 'uploader',
      width: 100,
      render: (text: string) => text || '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">下载</Button>
          <Button type="link" size="small" icon={<ShareAltOutlined />}>共享</Button>
          <Button type="link" size="small" icon={<MoreOutlined />} />
        </Space>
      ),
    },
  ];

  const myColumns = columns.filter((c) => c.key !== 'uploader');

  return (
    <div className="cloud-page">
      <Card className="cloud-card">
        <div className="cloud-header">
          <h2 className="cloud-title">
            <CloudOutlined /> 云盘管理
          </h2>
          <div className="cloud-actions">
            <div className="storage-info">
              <span className="storage-text">存储空间：0M / 2G</span>
              <Progress percent={0} strokeColor={{ '0%': '#3b82f6', '100%': '#8b5cf6' }} size="small" />
            </div>
            <Upload multiple>
              <Button type="primary" icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </div>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} className="cloud-tabs">
          <TabPane
            tab={<span><CloudOutlined /> 我的云盘</span>}
            key="my"
          >
            <div className="cloud-filters">
              <Input
                placeholder="搜索文件"
                prefix={<SearchOutlined />}
                style={{ width: 250 }}
              />
            </div>
            <Table
              columns={myColumns}
              dataSource={myFiles}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane
            tab={<span><ShareAltOutlined /> 共享云盘</span>}
            key="shared"
          >
            <div className="cloud-filters">
              <Input
                placeholder="搜索共享文件"
                prefix={<SearchOutlined />}
                style={{ width: 250 }}
              />
            </div>
            <Table
              columns={columns}
              dataSource={sharedFiles}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Cloud;
