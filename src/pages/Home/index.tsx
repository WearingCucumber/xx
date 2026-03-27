import { Card, Table, Tag, Progress } from 'antd';
import {
  WarningOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  FallOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './Home.css';

// 待办事项数据
const todoData = {
  classAbnormal: {
    count: 1,
    title: '课程班作业异常',
    description: '班级整体完成率低',
  },
  studentAbnormal: {
    count: 7,
    title: '学生作业异常',
    description: '连续未提交 / 完成率下降',
    students: ['张晓明', '李华', '王芳', '陈杰', '刘洋', '赵敏', '孙丽'],
  },
};

// 数据看板数据
const dashboardData = {
  studentAnalysis: {
    title: '学生分析',
    completionRate: 78.5,
    trend: 'up',
    trendValue: 5.2,
  },
  teacherAnalysis: {
    title: '老师分析',
    homeworkCount: 172,
    trend: 'up',
    trendValue: 12.3,
  },
  improvementAnalysis: {
    title: '提分分析',
    averageImprovement: 15.8,
    trend: 'up',
    trendValue: 8.5,
  },
};

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* 欢迎区域 */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          欢迎回来，<span className="gradient-text">Robin</span>
        </h1>
        <p className="welcome-subtitle">
          今天是 2026 年 3 月 27 日，祝您工作顺利！
        </p>
      </div>

      {/* 待办事项 */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">
            <WarningOutlined className="warning-icon" />
            待办事项
          </h2>
          <Tag color="red" className="alert-tag">
            需要关注
          </Tag>
        </div>
        <div className="todo-cards">
          <Card className="todo-card abnormal-card">
            <div className="todo-card-header">
              <span className="todo-card-title">{todoData.classAbnormal.title}</span>
              <Tag color="orange">1 个班级</Tag>
            </div>
            <p className="todo-card-desc">{todoData.classAbnormal.description}</p>
            <div className="todo-card-action">
              <a href="#" className="action-link">查看详情</a>
            </div>
          </Card>

          <Card className="todo-card abnormal-card">
            <div className="todo-card-header">
              <span className="todo-card-title">{todoData.studentAbnormal.title}</span>
              <Tag color="red">7 个学生</Tag>
            </div>
            <p className="todo-card-desc">{todoData.studentAbnormal.description}</p>
            <div className="student-list">
              {todoData.studentAbnormal.students.map((name, index) => (
                <Tag key={index} color="red" className="student-tag">{name}</Tag>
              ))}
            </div>
            <div className="todo-card-action">
              <a href="#" className="action-link">查看详情</a>
            </div>
          </Card>
        </div>
      </div>

      {/* 数据看板 */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">数据看板</h2>
          <a href="/dashboard" className="view-more">查看详情</a>
        </div>
        <div className="dashboard-grid">
          <Card className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="card-icon student-icon">
                <RiseOutlined />
              </div>
              <span className="card-title">{dashboardData.studentAnalysis.title}</span>
            </div>
            <div className="dashboard-card-content">
              <div className="progress-wrapper">
                <div className="progress-label">
                  <span>作业完成率</span>
                  <span className="progress-value">{dashboardData.studentAnalysis.completionRate}%</span>
                </div>
                <Progress
                  percent={dashboardData.studentAnalysis.completionRate}
                  strokeColor={{
                    '0%': '#00b96b',
                    '100%': '#06b6d4',
                  }}
                  trailColor="transparent"
                  showInfo={false}
                  size="small"
                />
              </div>
              <div className={`trend ${dashboardData.studentAnalysis.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                {dashboardData.studentAnalysis.trend === 'up' ? <RiseOutlined /> : <FallOutlined />}
                <span>较上周提升 {dashboardData.studentAnalysis.trendValue}%</span>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="card-icon teacher-icon">
                <FileTextOutlined />
              </div>
              <span className="card-title">{dashboardData.teacherAnalysis.title}</span>
            </div>
            <div className="dashboard-card-content">
              <div className="stat-number">{dashboardData.teacherAnalysis.homeworkCount}</div>
              <div className="stat-label">布置作业总数</div>
              <div className={`trend ${dashboardData.teacherAnalysis.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                {dashboardData.teacherAnalysis.trend === 'up' ? <RiseOutlined /> : <FallOutlined />}
                <span>较上月增加 {dashboardData.teacherAnalysis.trendValue}%</span>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="card-icon improvement-icon">
                <CheckCircleOutlined />
              </div>
              <span className="card-title">{dashboardData.improvementAnalysis.title}</span>
            </div>
            <div className="dashboard-card-content">
              <div className="stat-number gradient-text">+{dashboardData.improvementAnalysis.averageImprovement}</div>
              <div className="stat-label">平均提分（分）</div>
              <div className={`trend ${dashboardData.improvementAnalysis.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                {dashboardData.improvementAnalysis.trend === 'up' ? <RiseOutlined /> : <FallOutlined />}
                <span>较上期提升 {dashboardData.improvementAnalysis.trendValue}%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 黑板报 */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">📋 黑板报</h2>
        </div>
        <Card className="notice-board">
          <div className="notice-item">
            <Tag color="blue">通知</Tag>
            <span className="notice-title">关于春季班课程调整的通知</span>
            <span className="notice-date">2026-03-25</span>
          </div>
          <div className="notice-item">
            <Tag color="green">公告</Tag>
            <span className="notice-title">系统维护公告：本周六凌晨 2:00-4:00</span>
            <span className="notice-date">2026-03-24</span>
          </div>
          <div className="notice-item">
            <Tag color="purple">活动</Tag>
            <span className="notice-title">2026 年春季教师培训计划报名开始</span>
            <span className="notice-date">2026-03-22</span>
          </div>
        </Card>
      </div>

      {/* 新功能提示 */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">✨ 新功能</h2>
        </div>
        <Card className="feature-board">
          <div className="feature-item">
            <Tag color="cyan">NEW</Tag>
            <span className="feature-title">精读升级 - 逻辑填空题型</span>
            <span className="feature-date">2026-03-26</span>
          </div>
          <div className="feature-item">
            <Tag color="green">NEW</Tag>
            <span className="feature-title">AI 助手上线 - 智能问答与数据分析</span>
            <span className="feature-date">2026-03-20</span>
          </div>
          <div className="feature-item">
            <Tag color="blue">NEW</Tag>
            <span className="feature-title">题库多维度数据统计</span>
            <span className="feature-date">2026-03-15</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
