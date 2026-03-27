import { useState } from 'react';
import { Card, Table, Tag, Space, Button, Input, Select, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  SearchOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './Homework.css';

const { Text } = Typography;
const { Option } = Select;

interface Homework {
  key: string;
  id: string;
  name: string;
  type: 'exam' | 'daily' | 'checkin' | 'video';
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  startDate: string;
  endDate: string;
  class: string;
  teacher: string;
  totalStudents: number;
  submitted: number;
  graded: number;
  progress: number;
}

const homeworkData: Homework[] = [
  {
    key: '1',
    id: 'HW001',
    name: '托福阅读 TPO56-58 全套练习',
    type: 'exam',
    status: 'in_progress',
    startDate: '2026-03-20',
    endDate: '2026-03-27',
    class: '托福强化 307 班',
    teacher: 'Robin',
    totalStudents: 12,
    submitted: 8,
    graded: 5,
    progress: 67,
  },
  {
    key: '2',
    id: 'HW002',
    name: '雅思写作 Task2 真题练习',
    type: 'daily',
    status: 'overdue',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    class: '雅思基础 315 班',
    teacher: 'Robin',
    totalStudents: 15,
    submitted: 10,
    graded: 3,
    progress: 67,
  },
  {
    key: '3',
    id: 'HW003',
    name: '每日词汇打卡 Day15',
    type: 'checkin',
    status: 'in_progress',
    startDate: '2026-03-26',
    endDate: '2026-03-27',
    class: '雅思大学生 306 班',
    teacher: 'Evelyn',
    totalStudents: 20,
    submitted: 15,
    graded: 15,
    progress: 75,
  },
  {
    key: '4',
    id: 'HW004',
    name: 'SAT 数学 Section1 模拟测试',
    type: 'exam',
    status: 'completed',
    startDate: '2026-03-10',
    endDate: '2026-03-17',
    class: 'SAT 冲刺班',
    teacher: 'Molly',
    totalStudents: 8,
    submitted: 8,
    graded: 8,
    progress: 100,
  },
  {
    key: '5',
    id: 'HW005',
    name: 'KET 听力专项训练',
    type: 'daily',
    status: 'not_started',
    startDate: '2026-03-28',
    endDate: '2026-04-04',
    class: 'KET 基础班',
    teacher: 'Yoo',
    totalStudents: 10,
    submitted: 0,
    graded: 0,
    progress: 0,
  },
  {
    key: '6',
    id: 'HW006',
    name: '雅思口语 Part2 题库练习',
    type: 'daily',
    status: 'in_progress',
    startDate: '2026-03-24',
    endDate: '2026-03-31',
    class: '雅思强化 305 班',
    teacher: 'Robin',
    totalStudents: 14,
    submitted: 6,
    graded: 2,
    progress: 43,
  },
];

const Homework: React.FC = () => {
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getTypeTag = (type: Homework['type']) => {
    const typeMap = {
      exam: { color: 'red', text: '作业模考' },
      daily: { color: 'blue', text: '日常作业' },
      checkin: { color: 'green', text: '打卡作业' },
      video: { color: 'purple', text: '视频课件' },
    };
    const { color, text } = typeMap[type];
    return <Tag color={color}>{text}</Tag>;
  };

  const getStatusTag = (status: Homework['status']) => {
    const statusMap = {
      not_started: { color: 'default', text: '未开始', icon: <ClockCircleOutlined /> },
      in_progress: { color: 'processing', text: '进行中', icon: <FileTextOutlined /> },
      completed: { color: 'success', text: '已完成', icon: <CheckCircleOutlined /> },
      overdue: { color: 'error', text: '已逾期', icon: <ExclamationCircleOutlined /> },
    };
    const { color, text, icon } = statusMap[status];
    return (
      <Tag color={color} icon={icon}>
        {text}
      </Tag>
    );
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return '#10b981';
    if (progress >= 70) return '#06b6d4';
    if (progress >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const columns: ColumnsType<Homework> = [
    {
      title: '作业名称',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (name: string, record) => (
        <div className="homework-name">
          <div className="homework-title">{name}</div>
          <div className="homework-meta">
            {getTypeTag(record.type)}
            {getStatusTag(record.status)}
          </div>
        </div>
      ),
    },
    {
      title: '时间',
      key: 'time',
      width: 200,
      render: (_, record) => (
        <div className="time-range">
          <div className="time-item">
            <Text type="secondary">开始:</Text>
            <Text>{record.startDate}</Text>
          </div>
          <div className="time-item">
            <Text type="secondary">截止:</Text>
            <Text className={record.status === 'overdue' ? 'overdue-text' : ''}>
              {record.endDate}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
      width: 150,
      render: (cls: string) => <Tag color="blue">{cls}</Tag>,
    },
    {
      title: '完成情况',
      key: 'completion',
      width: 180,
      render: (_, record) => (
        <div className="completion-info">
          <div className="completion-text">
            {record.submitted}/{record.totalStudents} 已提交
          </div>
          <div
            className="progress-bar"
            style={{
              background: `linear-gradient(90deg, ${getProgressColor(record.progress)} ${record.progress}%, var(--bg-hover) ${record.progress}%)`,
            }}
          />
        </div>
      ),
    },
    {
      title: '批改情况',
      key: 'grading',
      width: 120,
      render: (_, record) => (
        <div className="grading-info">
          <Text>{record.graded}/{record.submitted}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>已批改</Text>
        </div>
      ),
    },
    {
      title: '布置老师',
      dataIndex: 'teacher',
      key: 'teacher',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small" direction="vertical">
          <Space size="small">
            <a href={`/homework/${record.id}`} className="action-link">详情</a>
            <a href="#" className="action-link">预览</a>
            <a href="#" className="action-link">AI 分析</a>
          </Space>
          {record.status !== 'completed' && (
            <a href="#" className="action-link warning-link">催交</a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="homework-page">
      {/* 统计卡片 */}
      <div className="stat-cards-row">
        <Card className="stat-card-highlight">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">全部作业</div>
              <div className="stat-value">175</div>
            </div>
          </div>
        </Card>
        <Card className="stat-card-normal">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">作业模考</div>
              <div className="stat-value">172</div>
            </div>
          </div>
        </Card>
        <Card className="stat-card-normal">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">打卡作业</div>
              <div className="stat-value">3</div>
            </div>
          </div>
        </Card>
        <Card className="stat-card-normal">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">待我批改</div>
              <div className="stat-value" style={{ color: 'var(--warning)' }}>32</div>
            </div>
          </div>
        </Card>
        <Card className="stat-card-normal">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">我布置的</div>
              <div className="stat-value">32</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 筛选区域 */}
      <div className="filter-section">
        <div className="filter-tabs">
          <Tag
            color="blue"
            className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            全部作业
          </Tag>
          <Tag
            color="default"
            className={`filter-tab ${statusFilter === 'daily' ? 'active' : ''}`}
            onClick={() => setStatusFilter('daily')}
          >
            单词作业
          </Tag>
          <Tag
            color="default"
            className={`filter-tab ${statusFilter === 'checkin' ? 'active' : ''}`}
            onClick={() => setStatusFilter('checkin')}
          >
            打卡作业
          </Tag>
          <Tag
            color="default"
            className={`filter-tab ${statusFilter === 'exam' ? 'active' : ''}`}
            onClick={() => setStatusFilter('exam')}
          >
            作业模考
          </Tag>
          <Tag
            color="default"
            className={`filter-tab ${statusFilter === 'grading' ? 'active' : ''}`}
            onClick={() => setStatusFilter('grading')}
          >
            我的批改
          </Tag>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="add-btn">
          布置作业
        </Button>
      </div>

      <div className="filter-row">
        <Space>
          <Input
            placeholder="搜索作业名称"
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder="科目"
            style={{ width: 120 }}
            value={subjectFilter}
            onChange={setSubjectFilter}
            allowClear
          >
            <Option value="ielts">雅思</Option>
            <Option value="toefl">托福</Option>
            <Option value="sat">SAT</Option>
            <Option value="act">ACT</Option>
          </Select>
          <Select
            placeholder="班级"
            style={{ width: 150 }}
            allowClear
          >
            <Option value="1">雅思基础 315 班</Option>
            <Option value="2">托福强化 307 班</Option>
            <Option value="3">SAT 冲刺班</Option>
          </Select>
          <Select
            placeholder="状态"
            style={{ width: 120 }}
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
          >
            <Option value="not_started">未开始</Option>
            <Option value="in_progress">进行中</Option>
            <Option value="completed">已完成</Option>
            <Option value="overdue">已逾期</Option>
          </Select>
        </Space>
      </div>

      {/* 表格 */}
      <Card className="table-card">
        <Table
          columns={columns}
          dataSource={homeworkData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ['10', '15', '20', '50'],
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default Homework;
