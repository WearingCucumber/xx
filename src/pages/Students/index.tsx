import { useState } from 'react';
import { Table, Tag, Input, Space, Button, Avatar, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Students.css';

interface Student {
  key: string;
  id: string;
  name: string;
  avatar?: string;
  classes: string[];
  status: 'active' | 'finished' | 'inactive';
  phone: string;
  grade?: string;
  school?: string;
}

// 模拟数据
const studentData: Student[] = [
  {
    key: '1',
    id: 'S001',
    name: '揭佳泰',
    classes: ['雅思基础 315 班', '一对一 VIP'],
    status: 'active',
    phone: '151****2509',
    grade: '高二',
    school: '深圳国际交流学院',
  },
  {
    key: '2',
    id: 'S002',
    name: '张晓明',
    classes: ['托福强化 307 班'],
    status: 'active',
    phone: '138****1234',
    grade: '高三',
    school: '北京师范大学附属中学',
  },
  {
    key: '3',
    id: 'S003',
    name: '李华',
    classes: ['雅思大学生 306 班'],
    status: 'active',
    phone: '139****5678',
    grade: '大一',
    school: '中山大学',
  },
  {
    key: '4',
    id: 'S004',
    name: '王芳',
    classes: ['SAT 基础班'],
    status: 'active',
    phone: '137****9012',
    grade: '高一',
    school: '深圳中学',
  },
  {
    key: '5',
    id: 'S005',
    name: '陈杰',
    classes: ['AP 冲刺班'],
    status: 'finished',
    phone: '136****3456',
    grade: '高三',
    school: '广州外国语学校',
  },
  {
    key: '6',
    id: 'S006',
    name: '刘洋',
    classes: ['KET 基础班'],
    status: 'active',
    phone: '135****7890',
    grade: '四年级',
    school: '深圳实验小学',
  },
  {
    key: '7',
    id: 'S007',
    name: '赵敏',
    classes: ['PET 强化班'],
    status: 'active',
    phone: '134****2345',
    grade: '六年级',
    school: '广州华阳小学',
  },
  {
    key: '8',
    id: 'S008',
    name: '孙丽',
    classes: ['A-Level 物理班'],
    status: 'inactive',
    phone: '133****6789',
    grade: '高二',
    school: '深国交',
  },
];

const Students: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusTag = (status: Student['status']) => {
    const statusMap = {
      active: { color: 'success', text: '在读' },
      finished: { color: 'blue', text: '已结课' },
      inactive: { color: 'default', text: '未开始' },
    };
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  const columns: ColumnsType<Student> = [
    {
      title: '学员信息',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (_, record) => (
        <div className="student-info">
          <Avatar
            style={{ backgroundColor: 'var(--primary)' }}
            size={40}
            icon={<UserOutlined />}
          />
          <div className="student-details">
            <div className="student-name">{record.name}</div>
            <div className="student-id">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: '班级',
      dataIndex: 'classes',
      key: 'classes',
      render: (classes: string[]) => (
        <div className="class-tags">
          {classes.map((cls, index) => (
            <Tag key={index} color="blue" className="class-tag">
              {cls}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: Student['status']) => getStatusTag(status),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
      width: 100,
    },
    {
      title: '学校',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <a href={`/students/${record.id}`} className="action-link">详情</a>
          <a href="#" className="action-link">编辑</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="students-page">
      {/* 统计卡片 */}
      <div className="stat-cards-row">
        <Card className="stat-card-highlight">
          <div className="stat-card-content">
            <div className="stat-icon">
              <TeamOutlined />
            </div>
            <div className="stat-info">
              <div className="stat-label">学员总数</div>
              <div className="stat-value">34</div>
            </div>
          </div>
        </Card>
        <Card className="stat-card-normal">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">在读学员</div>
              <div className="stat-value">30</div>
            </div>
          </div>
        </Card>
        <Card className="stat-card-normal">
          <div className="stat-card-content">
            <div className="stat-info">
              <div className="stat-label">已结课</div>
              <div className="stat-value">4</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 筛选区域 */}
      <div className="filter-section">
        <div className="filter-left">
          <Input
            placeholder="搜索学员姓名、手机号"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Space>
            <Tag
              color={statusFilter === 'all' ? 'blue' : 'default'}
              className={`filter-tag ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              全部
            </Tag>
            <Tag
              color={statusFilter === 'active' ? 'success' : 'default'}
              className={`filter-tag ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              在读
            </Tag>
            <Tag
              color={statusFilter === 'finished' ? 'blue' : 'default'}
              className={`filter-tag ${statusFilter === 'finished' ? 'active' : ''}`}
              onClick={() => setStatusFilter('finished')}
            >
              已结课
            </Tag>
          </Space>
        </div>
        <Button type="primary" icon={<PlusOutlined />} className="add-btn">
          添加学员
        </Button>
      </div>

      {/* 表格 */}
      <Card className="table-card">
        <Table
          columns={columns}
          dataSource={studentData.filter((item) => {
            if (statusFilter !== 'all' && item.status !== statusFilter) {
              return false;
            }
            if (searchText && !item.name.includes(searchText) && !item.phone.includes(searchText)) {
              return false;
            }
            return true;
          })}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          rowClassName="table-row"
        />
      </Card>
    </div>
  );
};

export default Students;
