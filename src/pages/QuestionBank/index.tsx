import { useState } from 'react';
import { Card, Tabs, Tag, Table, Input, Select, Space, Button, Radio } from 'antd';
import {
  DatabaseOutlined,
  BookOutlined,
  FileTextOutlined,
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './QuestionBank.css';

const { TabPane } = Tabs;
const { Option } = Select;

// 模拟系统题库数据
const systemQuestions = [
  {
    id: 1,
    name: '托福阅读真题 2026 年 1 月',
    category: '阅读',
    difficulty: '中等',
    level: 'Upper',
    participation: 1256,
    correctRate: 68.5,
    medianScore: 22,
    medianTime: '25 分钟',
    networkCount: 8934,
    questionCount: 35,
    variance: 3.2,
    discrimination: 0.72,
    errorPoint: '长难句理解',
    updateTime: '2026-03-20',
  },
  {
    id: 2,
    name: '雅思听力真题 2025 年 12 月',
    category: '听力',
    difficulty: '偏难',
    level: '-',
    participation: 892,
    correctRate: 62.3,
    medianScore: 6.5,
    medianTime: '30 分钟',
    networkCount: 12453,
    questionCount: 40,
    variance: 1.8,
    discrimination: 0.65,
    errorPoint: '连读辨识',
    updateTime: '2026-03-18',
  },
  {
    id: 3,
    name: 'SAT 数学模拟卷',
    category: '数学',
    difficulty: '容易',
    level: 'Router',
    participation: 2341,
    correctRate: 85.2,
    medianScore: 780,
    medianTime: '45 分钟',
    networkCount: 5678,
    questionCount: 58,
    variance: 2.1,
    discrimination: 0.58,
    errorPoint: '函数应用',
    updateTime: '2026-03-22',
  },
  {
    id: 4,
    name: '雅思写作学术讨论题库',
    category: '写作',
    difficulty: '偏难',
    level: '-',
    participation: 567,
    correctRate: 55.8,
    medianScore: 5.5,
    medianTime: '20 分钟',
    networkCount: 3421,
    questionCount: 50,
    variance: 2.5,
    discrimination: 0.78,
    errorPoint: '论证逻辑',
    updateTime: '2026-03-25',
  },
  {
    id: 5,
    name: '托福口语预测题 2026',
    category: '口语',
    difficulty: '中等',
    level: 'Lower',
    participation: 1089,
    correctRate: 71.2,
    medianScore: 24,
    medianTime: '15 分钟',
    networkCount: 7654,
    questionCount: 45,
    variance: 2.8,
    discrimination: 0.69,
    errorPoint: '发音准确度',
    updateTime: '2026-03-26',
  },
];

// 模拟机构题库数据
const orgQuestions = [
  {
    id: 1,
    name: '2026 年 1-4 月雅思口语题库 Part 2&3',
    subject: '雅思',
    category: '口语',
    totalScore: 100,
    questionCount: 164,
    duration: 90,
    creator: 'Molly',
    isShared: true,
    updateTime: '2026-03-20',
  },
  {
    id: 2,
    name: '托福听力精讲精练',
    subject: '托福',
    category: '听力',
    totalScore: 30,
    questionCount: 25,
    duration: 45,
    creator: 'Evelyn',
    isShared: false,
    updateTime: '2026-03-15',
  },
  {
    id: 3,
    name: 'SAT 数学易错题集',
    subject: 'SAT',
    category: '数学',
    totalScore: 800,
    questionCount: 58,
    duration: 60,
    creator: 'hxx',
    isShared: true,
    updateTime: '2026-03-10',
  },
];

// 模拟单词书数据
const wordBooks = [
  { id: 1, name: '雅思阅读同意替换词', units: 12, words: 376, subject: '雅思', creator: 'Evelyn', usage: 234, correctRate: 72.5 },
  { id: 2, name: '雅思听力高频词汇', units: 3, words: 99, subject: '雅思', creator: 'Yoo', usage: 567, correctRate: 85.3 },
  { id: 3, name: 'AQA 数学词汇', units: 1, words: 204, subject: 'A-Level', creator: 'hxx', usage: 123, correctRate: 91.2 },
  { id: 4, name: 'A-Level P1 单词', units: 1, words: 61, subject: 'A-Level', creator: 'hxx', usage: 89, correctRate: 88.7 },
  { id: 5, name: 'IG 数学单词', units: 1, words: 265, subject: 'IGCSE', creator: 'hxx', usage: 156, correctRate: 82.4 },
  { id: 6, name: '剑桥 KET 场景词汇', units: 23, words: 916, subject: 'KET', creator: 'Molly', usage: 892, correctRate: 79.8 },
  { id: 7, name: 'PET 词汇', units: 19, words: 1871, subject: 'PET', creator: 'Molly', usage: 445, correctRate: 76.2 },
];

const QuestionBank: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('system');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // 系统题库列
  const systemColumns = [
    {
      title: '题目名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 200,
      render: (text: string) => <span className="question-name">{text}</span>,
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      width: 80,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      width: 80,
      render: (text: string) => {
        const colors: Record<string, string> = {
          '容易': 'green',
          '偏易': 'lime',
          '中等': 'orange',
          '偏难': 'red',
          '困难': 'purple',
        };
        return <Tag color={colors[text] || 'default'}>{text}</Tag>;
      },
    },
    {
      title: '参与数',
      dataIndex: 'participation',
      key: 'participation',
      width: 80,
      sorter: (a: any, b: any) => a.participation - b.participation,
    },
    {
      title: '正确率',
      dataIndex: 'correctRate',
      key: 'correctRate',
      width: 80,
      render: (rate: number) => (
        <span className={rate >= 70 ? 'rate-good' : 'rate-normal'}>{rate}%</span>
      ),
    },
    {
      title: '中位分',
      dataIndex: 'medianScore',
      key: 'medianScore',
      width: 80,
    },
    {
      title: '区分度',
      dataIndex: 'discrimination',
      key: 'discrimination',
      width: 80,
      render: (val: number) => (
        <span className={val >= 0.7 ? 'rate-good' : 'rate-normal'}>{val}</span>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: () => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            预览
          </Button>
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small" icon={<CheckCircleOutlined />}>
            开放
          </Button>
          <Button type="link" size="small" icon={<FileTextOutlined />}>
            布置
          </Button>
        </Space>
      ),
    },
  ];

  // 机构题库列
  const orgColumns = [
    {
      title: '状态',
      key: 'status',
      width: 80,
      render: (_: any, record: any) => (
        record.isShared ? (
          <Tag icon={<ShareAltOutlined />} color="success">已共享</Tag>
        ) : (
          <Tag color="default">未共享</Tag>
        )
      ),
    },
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: '科目',
      dataIndex: 'subject',
      key: 'subject',
      width: 80,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      key: 'totalScore',
      width: 70,
    },
    {
      title: '题目数',
      dataIndex: 'questionCount',
      key: 'questionCount',
      width: 70,
    },
    {
      title: '时长 (分钟)',
      dataIndex: 'duration',
      key: 'duration',
      width: 80,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 80,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">录入答案</Button>
          <Button type="link" size="small" icon={<FileTextOutlined />}>布置</Button>
          <Button type="link" size="small" icon={<PlusOutlined />}>新建</Button>
          <Button type="link" size="small" icon={<ShareAltOutlined />}>共享</Button>
        </Space>
      ),
    },
  ];

  // 单词书列
  const wordBookColumns = [
    {
      title: '词书名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as const,
      width: 200,
    },
    {
      title: '单元数',
      dataIndex: 'units',
      key: 'units',
      width: 70,
    },
    {
      title: '词汇数',
      dataIndex: 'words',
      key: 'words',
      width: 70,
    },
    {
      title: '科目',
      dataIndex: 'subject',
      key: 'subject',
      width: 80,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '创建老师',
      dataIndex: 'creator',
      key: 'creator',
      width: 80,
    },
    {
      title: '使用次数',
      dataIndex: 'usage',
      key: 'usage',
      width: 80,
      sorter: (a: any, b: any) => a.usage - b.usage,
    },
    {
      title: '正确率',
      dataIndex: 'correctRate',
      key: 'correctRate',
      width: 80,
      render: (rate: number) => (
        <span className={rate >= 80 ? 'rate-good' : 'rate-normal'}>{rate}%</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      fixed: 'right' as const,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">抽查</Button>
          <Button type="link" size="small" icon={<FileTextOutlined />}>布置</Button>
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="question-bank-page">
      <Card className="question-bank-card">
        <div className="question-bank-header">
          <h2 className="question-bank-title">
            <DatabaseOutlined /> 题库管理
          </h2>
          <Space>
            <Button icon={<PlusOutlined />} type="primary">
              新建试卷
            </Button>
          </Space>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} className="question-tabs">
          <TabPane
            tab={
              <span className="tab-with-count">
                <DatabaseOutlined /> 系统题库
              </span>
            }
            key="system"
          >
            <div className="qbank-filters">
              <Radio.Group buttonStyle="solid" className="subject-radio">
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value="toefl">托福</Radio.Button>
                <Radio.Button value="ielts">雅思</Radio.Button>
                <Radio.Button value="sat">SAT</Radio.Button>
                <Radio.Button value="act">ACT</Radio.Button>
                <Radio.Button value="gre">GRE</Radio.Button>
              </Radio.Group>
              <Space className="filter-space">
                <Select placeholder="类别" style={{ width: 120 }} allowClear>
                  <Option value="reading">阅读</Option>
                  <Option value="listening">听力</Option>
                  <Option value="writing">写作</Option>
                  <Option value="speaking">口语</Option>
                </Select>
                <Select placeholder="难度" style={{ width: 100 }} allowClear>
                  <Option value="easy">容易</Option>
                  <Option value="medium">中等</Option>
                  <Option value="hard">困难</Option>
                </Select>
                <Input
                  placeholder="搜索题目"
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                />
              </Space>
            </div>
            <Table
              columns={systemColumns}
              dataSource={systemQuestions}
              rowKey="id"
              scroll={{ x: 1400 }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
            />
          </TabPane>

          <TabPane
            tab={
              <span className="tab-with-count">
                <FileTextOutlined /> 机构题库
              </span>
            }
            key="org"
          >
            <div className="qbank-filters">
              <Space className="filter-space">
                <Select placeholder="科目" style={{ width: 120 }} allowClear>
                  <Option value="ielts">雅思</Option>
                  <Option value="toefl">托福</Option>
                  <Option value="sat">SAT</Option>
                </Select>
                <Input
                  placeholder="搜索试卷"
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                />
              </Space>
            </div>
            <Table
              columns={orgColumns}
              dataSource={orgQuestions}
              rowKey="id"
              scroll={{ x: 1200 }}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span className="tab-with-count">
                <BookOutlined /> 单词书
              </span>
            }
            key="words"
          >
            <div className="qbank-filters">
              <Space className="filter-space">
                <Select placeholder="科目" style={{ width: 120 }} allowClear>
                  <Option value="ielts">雅思</Option>
                  <Option value="toefl">托福</Option>
                  <Option value="ket">KET/PET</Option>
                  <Option value="alevel">A-Level</Option>
                </Select>
                <Input
                  placeholder="搜索词书"
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  新增词表
                </Button>
              </Space>
            </div>
            <Table
              columns={wordBookColumns}
              dataSource={wordBooks}
              rowKey="id"
              scroll={{ x: 1000 }}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default QuestionBank;
