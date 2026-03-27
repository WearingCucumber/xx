import { useState } from 'react';
import { Card, Table, Tag, Button, Space, Input, DatePicker, Select } from 'antd';
import {
  CheckSquareOutlined,
  SearchOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Todo.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟待办数据
const todoData = [
  {
    id: 1,
    title: '批改雅思写作作业',
    type: 'homework',
    priority: 'high',
    deadline: '2026-03-28 18:00',
    from: '雅思强化 307 班',
    status: 'pending',
    count: 12,
  },
  {
    id: 2,
    title: '完成学员学习报告',
    type: 'report',
    priority: 'medium',
    deadline: '2026-03-30 12:00',
    from: '揭佳泰',
    status: 'pending',
    count: 1,
  },
  {
    id: 3,
    title: '课程反馈填写',
    type: 'feedback',
    priority: 'low',
    deadline: '2026-03-29 10:00',
    from: '托福基础班 L3',
    status: 'pending',
    count: 1,
  },
  {
    id: 4,
    title: '布置下周模考作业',
    type: 'homework',
    priority: 'high',
    deadline: '2026-03-27 20:00',
    from: 'SAT 冲刺班',
    status: 'completed',
    count: 1,
  },
  {
    id: 5,
    title: '学员回访记录',
    type: 'visit',
    priority: 'medium',
    deadline: '2026-03-31 17:00',
    from: '周文博',
    status: 'pending',
    count: 1,
  },
];

const Todo: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const getTypeTag = (type: string) => {
    const typeMap: Record<string, { color: string; icon: any; text: string }> = {
      homework: { color: 'blue', icon: <CheckSquareOutlined />, text: '作业' },
      report: { color: 'purple', icon: <ClockCircleOutlined />, text: '报告' },
      feedback: { color: 'green', icon: <CalendarOutlined />, text: '反馈' },
      visit: { color: 'orange', icon: <ExclamationCircleOutlined />, text: '回访' },
    };
    const { color, icon, text } = typeMap[type] || { color: 'default', icon: null, text: type };
    return <Tag color={color}>{icon} {text}</Tag>;
  };

  const getPriorityTag = (priority: string) => {
    const priorityMap: Record<string, { color: string; text: string }> = {
      high: { color: 'red', text: '高' },
      medium: { color: 'orange', text: '中' },
      low: { color: 'blue', text: '低' },
    };
    const { color, text } = priorityMap[priority] || { color: 'default', text: priority };
    return <Tag color={color}>{text}优先级</Tag>;
  };

  const columns = [
    {
      title: '待办事项',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (text: string, record: any) => (
        <div className="todo-title">
          <span className={record.status === 'completed' ? 'completed' : ''}>{text}</span>
          {record.status === 'completed' && <Tag color="success">已完成</Tag>}
        </div>
      ),
    },
    {
      title: '类型',
      key: 'type',
      width: 100,
      render: (_: any, record: any) => getTypeTag(record.type),
    },
    {
      title: '优先级',
      key: 'priority',
      width: 100,
      render: (_: any, record: any) => getPriorityTag(record.priority),
    },
    {
      title: '截止时间',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 160,
      render: (text: string) => (
        <span className="deadline">{text}</span>
      ),
    },
    {
      title: '来自',
      dataIndex: 'from',
      key: 'from',
      width: 150,
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
      width: 70,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: any) => (
        <Space size="small">
          {record.status === 'pending' ? (
            <Button type="primary" size="small">完成</Button>
          ) : (
            <Button size="small">重新打开</Button>
          )}
          <Button size="small">详情</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="todo-page">
      <Card className="todo-card">
        <div className="todo-header">
          <h2 className="todo-title-main">
            <CheckSquareOutlined /> 待办事项
          </h2>
          <div className="todo-stats">
            <Tag color="red">待处理：{todoData.filter(t => t.status === 'pending').length}</Tag>
            <Tag color="green">已完成：{todoData.filter(t => t.status === 'completed').length}</Tag>
          </div>
        </div>

        <div className="todo-filters">
          <Space wrap>
            <Input
              placeholder="搜索待办事项"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
            />
            <Select
              value={selectedType}
              onChange={setSelectedType}
              style={{ width: 150 }}
              allowClear
            >
              <Option value="homework">作业</Option>
              <Option value="report">报告</Option>
              <Option value="feedback">反馈</Option>
              <Option value="visit">回访</Option>
            </Select>
            <Select
              value={selectedPriority}
              onChange={setSelectedPriority}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="high">高优先级</Option>
              <Option value="medium">中优先级</Option>
              <Option value="low">低优先级</Option>
            </Select>
            <RangePicker />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={todoData.filter((item) => {
            if (selectedType !== 'all' && item.type !== selectedType) return false;
            if (selectedPriority !== 'all' && item.priority !== selectedPriority) return false;
            return true;
          })}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Todo;
