import { Card, Button, Space } from 'antd';
import { BulbOutlined, PlusOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Ideas.css';

const Ideas: React.FC = () => {
  const { isDark } = useTheme();

  const ideaCards = [
    {
      id: 1,
      title: 'AI 智能作文批改',
      description: '利用 AI 技术自动批改学生作文，提供详细的修改建议和评分。',
      status: 'reviewing',
      votes: 24,
    },
    {
      id: 2,
      title: '学员学习路径推荐',
      description: '根据学员的历史表现和目标分数，智能推荐个性化的学习路径。',
      status: 'planned',
      votes: 18,
    },
    {
      id: 3,
      title: '班级 PK 功能',
      description: '支持班级之间的学习 PK，提升学员学习积极性。',
      status: 'completed',
      votes: 32,
    },
  ];

  return (
    <div className="ideas-page">
      <Card className="ideas-card">
        <div className="ideas-header">
          <h2 className="ideas-title">
            <BulbOutlined /> 创意中心
          </h2>
          <Button type="primary" icon={<PlusOutlined />}>
            提交创意
          </Button>
        </div>

        <div className="ideas-intro">
          <p>欢迎来到创意中心！在这里您可以：</p>
          <ul>
            <li>提交对产品改进的建议和创意</li>
            <li>为其他老师的创意投票</li>
            <li>查看创意的实现进度</li>
          </ul>
        </div>

        <div className="ideas-grid">
          {ideaCards.map((idea) => (
            <Card key={idea.id} className="idea-card" hoverable>
              <div className="idea-header">
                <h3 className="idea-title-main">{idea.title}</h3>
                <div className="idea-meta">
                  <span className="votes">{idea.votes} 票</span>
                  {idea.status === 'completed' && <span className="status completed">已实现</span>}
                  {idea.status === 'reviewing' && <span className="status reviewing">评审中</span>}
                  {idea.status === 'planned' && <span className="status planned">计划中</span>}
                </div>
              </div>
              <p className="idea-description">{idea.description}</p>
              <div className="idea-actions">
                <Space>
                  <Button size="small">投票</Button>
                  <Button size="small">评论</Button>
                  <Button size="small">分享</Button>
                </Space>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Ideas;
