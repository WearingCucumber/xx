import { useState } from 'react';
import { Card, Tabs, Tag, Avatar, Space, Input, Select, Button, Empty } from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MessageOutlined,
  LineChartOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  CopyOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Classes.css';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

// 模拟班级数据
const mockClasses = [
  { id: 1, name: '刘昊天雅思', type: '一对一', status: '在读', students: [1, 2, 3] },
  { id: 2, name: '周文博托福', type: '一对一', status: '在读', students: [4, 5] },
  { id: 3, name: '雅思基础 315 班 2026 寒假', type: '寒假班', status: '在读', students: [6, 7, 8, 9, 10] },
  { id: 4, name: '雅思强化 307 班 2026 寒假', type: '寒假班', status: '在读', students: [11, 12, 13] },
  { id: 5, name: '雅思基础 310 班 2026 寒假', type: '寒假班', status: '在读', students: [14, 15, 16, 17] },
  { id: 6, name: '雅思强化 308 班 2026 寒假', type: '寒假班', status: '在读', students: [18, 19, 20] },
  { id: 7, name: '雅思基础 309 班 2026 寒假', type: '寒假班', status: '在读', students: [21, 22, 23, 24] },
  { id: 8, name: '雅思强化 305 班 2026 寒假', type: '寒假班', status: '在读', students: [25, 26] },
  { id: 9, name: '雅思大学生 306 班 2026 寒假', type: '寒假班', status: '在读', students: [27, 28, 29, 30] },
  { id: 10, name: '陈唐天娇一对一', type: '一对一', status: '在读', students: [31] },
];

// 学生头像数据
const studentAvatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
];

const Classes: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeClass, setActiveClass] = useState<number | null>(null);

  // 快捷作业类型
  const quickHomeworkTypes = [
    { name: '布置作业', icon: <FileTextOutlined />, color: '#3b82f6' },
    { name: '模考作业', icon: <FileTextOutlined />, color: '#8b5cf6' },
    { name: '自定义作业', icon: <FileTextOutlined />, color: '#06b6d4' },
    { name: '打卡作业', icon: <CalendarOutlined />, color: '#10b981' },
    { name: '其他作业', icon: <FileTextOutlined />, color: '#f59e0b' },
    { name: '常用作业', icon: <HomeOutlined />, color: '#ec4899' },
    { name: '视频课件', icon: <LineChartOutlined />, color: '#6366f1' },
  ];

  // 班级详情数据
  const classDetailData = {
    progress: 45,
    totalHours: 60,
    studentCount: 12,
    startDate: '2026-01-15',
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '一对一':
        return 'blue';
      case '寒假班':
        return 'purple';
      case '暑假班':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '在读':
        return 'success';
      case '已结课':
        return 'default';
      default:
        return 'processing';
    }
  };

  return (
    <div className="classes-page">
      {/* 班级列表视图 */}
      <Card className="classes-list-card">
        <div className="classes-header">
          <h2 className="classes-title">
            <BookOutlined /> 班级管理
          </h2>
          <div className="classes-filters">
            <Search
              placeholder="搜索班级名称"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              className="classes-search"
            />
            <Select
              value={selectedType}
              onChange={setSelectedType}
              style={{ width: 150 }}
              className="classes-filter"
            >
              <Option value="all">全部类型</Option>
              <Option value="一对一">一对一</Option>
              <Option value="寒假班">寒假班</Option>
              <Option value="暑假班">暑假班</Option>
            </Select>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: 120 }}
              className="classes-filter"
            >
              <Option value="all">全部状态</Option>
              <Option value="在读">在读</Option>
              <Option value="已结课">已结课</Option>
            </Select>
          </div>
        </div>

        <div className="classes-grid">
          {mockClasses.map((cls) => (
            <Card
              key={cls.id}
              className="class-card"
              onClick={() => setActiveClass(cls.id)}
              hoverable
            >
              <div className="class-card-header">
                <div className="class-card-tags">
                  <Tag color={getTypeColor(cls.type)}>{cls.type}</Tag>
                  <Tag color={getStatusColor(cls.status)}>{cls.status}</Tag>
                </div>
              </div>
              <h3 className="class-card-title">{cls.name}</h3>
              <div className="class-card-students">
                <Avatar.Group max={{ count: 4, style: { color: '#f56a00' } }}>
                  {cls.students.map((studentId, index) => (
                    <Avatar
                      key={studentId}
                      src={studentAvatars[index % studentAvatars.length]}
                      size="small"
                    />
                  ))}
                </Avatar.Group>
                <span className="student-count">{cls.students.length}人</span>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* 班级详情弹窗 */}
      {activeClass && (
        <div className="class-detail-modal">
          <Card
            className="class-detail-card"
            title={
              <div className="class-detail-header">
                <span>{mockClasses.find((c) => c.id === activeClass)?.name}</span>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setActiveClass(null)}
                  className="close-btn"
                >
                  ×
                </Button>
              </div>
            }
          >
            <Tabs defaultActiveKey="overview" className="class-detail-tabs">
              <TabPane
                tab={
                  <span>
                    <HomeOutlined />
                    概览
                  </span>
                }
                key="overview"
              >
                <div className="class-overview">
                  <div className="overview-stats">
                    <div className="stat-item">
                      <div className="stat-value">{classDetailData.progress}%</div>
                      <div className="stat-label">课程进度</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">
                        {classDetailData.totalHours}
                      </div>
                      <div className="stat-label">总课时</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">
                        {classDetailData.studentCount}
                      </div>
                      <div className="stat-label">学生人数</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{classDetailData.startDate}</div>
                      <div className="stat-label">开课日期</div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <FileTextOutlined />
                    作业
                  </span>
                }
                key="homework"
              >
                <div className="class-homework">
                  <div className="homework-content">
                    <Empty description="暂无作业" />
                  </div>
                  <div className="quick-actions">
                    <h4>快捷功能</h4>
                    <div className="quick-homework-grid">
                      {quickHomeworkTypes.map((type, index) => (
                        <Button
                          key={index}
                          className="quick-homework-btn"
                          style={{ borderColor: type.color, color: type.color }}
                          icon={type.icon}
                          block
                        >
                          {type.name}
                        </Button>
                      ))}
                    </div>
                    <Space className="homework-actions">
                      <Button icon={<UsergroupAddOutlined />}>成员管理</Button>
                      <Button icon={<CopyOutlined />}>拷贝作业</Button>
                    </Space>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CalendarOutlined />
                    课表
                  </span>
                }
                key="schedule"
              >
                <div className="class-schedule">
                  <Empty description="暂无课程安排" />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MessageOutlined />
                    反馈
                  </span>
                }
                key="feedback"
              >
                <div className="class-feedback">
                  <Empty description="暂无反馈" />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <LineChartOutlined />
                    作业大纲
                  </span>
                }
                key="syllabus"
              >
                <div className="class-syllabus">
                  <Empty description="暂无作业大纲" />
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Classes;
