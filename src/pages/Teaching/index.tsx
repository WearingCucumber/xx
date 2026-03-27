import { useState } from 'react';
import { Card, Tabs, Tree, Button, Space, Input, Upload, message, Select, Radio, Tag } from 'antd';
import {
  ApiOutlined,
  FolderOutlined,
  FileTextOutlined,
  UploadOutlined,
  PlusOutlined,
  SearchOutlined,
  ShareAltOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import type { TreeProps } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import './Teaching.css';

const { TabPane } = Tabs;
const { DirectoryTree } = Tree;
const { Option } = Select;

// 模拟大纲树形数据
const outlineTreeData: TreeProps['treeData'] = [
  {
    title: '雅思',
    key: 'ielts',
    icon: <FolderOutlined />,
    children: [
      {
        title: '大学生 1 班',
        key: 'ielts-college-1',
        icon: <FolderOutlined />,
        children: [
          {
            title: '雅思 - 大学生 - 阅读',
            key: 'ielts-college-1-reading',
            icon: <FileTextOutlined />,
            children: [
              { title: 'L1-2 主课', key: 'ielts-college-1-reading-l1-2', icon: <FileTextOutlined /> },
              { title: 'L1-2 课后刷题', key: 'ielts-college-1-reading-hw', icon: <FileTextOutlined /> },
              { title: 'L3-4 主课', key: 'ielts-college-1-reading-l3-4', icon: <FileTextOutlined /> },
            ],
          },
          {
            title: '雅思 - 大学生 - 听力',
            key: 'ielts-college-1-listening',
            icon: <FileTextOutlined />,
            children: [
              { title: 'L1 基础训练', key: 'ielts-college-1-listening-l1', icon: <FileTextOutlined /> },
              { title: 'L2 强化练习', key: 'ielts-college-1-listening-l2', icon: <FileTextOutlined /> },
            ],
          },
        ],
      },
      {
        title: '寒假班 307 班',
        key: 'ielts-winter-307',
        icon: <FolderOutlined />,
        children: [
          {
            title: '写作专项',
            key: 'ielts-winter-307-writing',
            icon: <FileTextOutlined />,
            children: [
              { title: '大作文模板', key: 'ielts-winter-307-writing-essay', icon: <FileTextOutlined /> },
              { title: '小作文图表', key: 'ielts-winter-307-writing-chart', icon: <FileTextOutlined /> },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '托福',
    key: 'toefl',
    icon: <FolderOutlined />,
    children: [
      {
        title: '托福强化班',
        key: 'toefl-advanced',
        icon: <FolderOutlined />,
        children: [
          {
            title: '阅读精讲',
            key: 'toefl-advanced-reading',
            icon: <FileTextOutlined />,
            children: [
              { title: '长难句分析', key: 'toefl-reading-sentence', icon: <FileTextOutlined /> },
              { title: '主旨题技巧', key: 'toefl-reading-main', icon: <FileTextOutlined /> },
            ],
          },
        ],
      },
    ],
  },
];

// 模拟知识点数据
const knowledgePoints = [
  { id: 1, name: '长难句分析', subject: '托福', type: '阅读', creator: 'Robin', isShared: true },
  { id: 2, name: '听力连读技巧', subject: '托福', type: '听力', creator: 'Evelyn', isShared: false },
  { id: 3, name: '写作论证方法', subject: '雅思', type: '写作', creator: 'Molly', isShared: true },
  { id: 4, name: '口语Part2 结构', subject: '雅思', type: '口语', creator: 'Yoo', isShared: true },
  { id: 5, name: 'SAT 数学函数', subject: 'SAT', type: '数学', creator: 'hxx', isShared: false },
];

const Teaching: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('outline');
  const [selectedNode, setSelectedNode] = useState<string>('');

  const onTreeSelect: TreeProps['onSelect'] = (selectedKeys) => {
    if (selectedKeys[0]) {
      setSelectedNode(selectedKeys[0] as string);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: '.pdf,.doc,.docx,.ppt,.pptx,.xlsx',
    beforeUpload: (file: File) => {
      message.success(`文件 ${file.name} 上传成功`);
      return false;
    },
  };

  return (
    <div className="teaching-page">
      <Card className="teaching-card">
        <div className="teaching-header">
          <h2 className="teaching-title">
            <ApiOutlined /> 教研管理
          </h2>
          <Space>
            <Button icon={<PlusOutlined />}>新建大纲</Button>
            <Button type="primary" icon={<PlusOutlined />}>添加知识点</Button>
          </Space>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} className="teaching-tabs">
          <TabPane
            tab={
              <span>
                <FolderOutlined /> 作业大纲
              </span>
            }
            key="outline"
          >
            <div className="outline-container">
              <div className="outline-tree-panel">
                <div className="tree-header">
                  <Input
                    placeholder="搜索大纲"
                    prefix={<SearchOutlined />}
                    size="small"
                    className="tree-search"
                  />
                </div>
                <DirectoryTree
                  treeData={outlineTreeData}
                  onSelect={onTreeSelect}
                  defaultExpandAll
                  showIcon
                />
              </div>
              <div className="outline-content-panel">
                <div className="content-header">
                  <h3>{selectedNode || '选择大纲节点'}</h3>
                  <Space>
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>上传课件</Button>
                    </Upload>
                    <Button icon={<ShareAltOutlined />}>共享</Button>
                  </Space>
                </div>
                <div className="task-list">
                  {selectedNode ? (
                    <div className="task-items">
                      <div className="task-item">
                        <span className="task-name">L1 主课课件.pdf</span>
                        <Space>
                          <Button type="link" size="small">预览</Button>
                          <Button type="link" size="small">下载</Button>
                          <Button type="link" size="small" danger>删除</Button>
                        </Space>
                      </div>
                      <div className="task-item">
                        <span className="task-name">课后练习.xlsx</span>
                        <Space>
                          <Button type="link" size="small">预览</Button>
                          <Button type="link" size="small">下载</Button>
                          <Button type="link" size="small" danger>删除</Button>
                        </Space>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FolderOutlined className="empty-icon" />
                      <p>请从左侧选择大纲节点</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BulbOutlined /> 知识点
              </span>
            }
            key="knowledge"
          >
            <div className="knowledge-container">
              <div className="knowledge-filters">
                <Space>
                  <Input placeholder="搜索知识点" prefix={<SearchOutlined />} style={{ width: 200 }} />
                  <Select placeholder="科目" style={{ width: 120 }} allowClear>
                    <Option value="toefl">托福</Option>
                    <Option value="ielts">雅思</Option>
                    <Option value="sat">SAT</Option>
                  </Select>
                  <Select placeholder="类型" style={{ width: 100 }} allowClear>
                    <Option value="reading">阅读</Option>
                    <Option value="listening">听力</Option>
                    <Option value="writing">写作</Option>
                    <Option value="speaking">口语</Option>
                  </Select>
                  <Radio.Group defaultValue="all">
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="my">我的</Radio.Button>
                    <Radio.Button value="shared">共享</Radio.Button>
                  </Radio.Group>
                </Space>
              </div>
              <div className="knowledge-grid">
                {knowledgePoints.map((kp) => (
                  <Card key={kp.id} className="knowledge-card" hoverable>
                    <div className="kp-header">
                      <h4 className="kp-name">{kp.name}</h4>
                      <Tag color={kp.isShared ? 'success' : 'default'}>
                        {kp.isShared ? '已共享' : '未共享'}
                      </Tag>
                    </div>
                    <div className="kp-info">
                      <span className="kp-subject">{kp.subject}</span>
                      <span className="kp-type">{kp.type}</span>
                    </div>
                    <div className="kp-creator">创建人：{kp.creator}</div>
                    <div className="kp-actions">
                      <Space>
                        <Button size="small">编辑</Button>
                        <Button size="small" icon={<ShareAltOutlined />}>
                          {kp.isShared ? '取消共享' : '共享'}
                        </Button>
                      </Space>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Teaching;
