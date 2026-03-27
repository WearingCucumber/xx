import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  CalendarOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  SendOutlined,
  UserOutlined,
  BulbOutlined,
  CloudOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

type MenuItem = Required<MenuProps>['items'][number];

interface SidebarProps {
  isDark: boolean;
}

const items: MenuItem[] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首页',
    className: 'menu-item',
  },
  {
    key: '/students',
    icon: <TeamOutlined />,
    label: '学员',
    className: 'menu-item',
  },
  {
    key: '/classes',
    icon: <BookOutlined />,
    label: '班级',
    className: 'menu-item',
  },
  {
    key: '/homework',
    icon: <FileTextOutlined />,
    label: '作业',
    className: 'menu-item',
  },
  {
    key: '/schedule',
    icon: <CalendarOutlined />,
    label: '课表',
    className: 'menu-item',
  },
  {
    key: '/question-bank',
    icon: <DatabaseOutlined />,
    label: '题库',
    className: 'menu-item',
  },
  {
    key: '/teaching',
    icon: <AppstoreOutlined />,
    label: '教研',
    className: 'menu-item',
  },
  {
    key: '/cloud',
    icon: <CloudOutlined />,
    label: '云盘',
    className: 'menu-item',
  },
  {
    key: '/apply',
    icon: <SendOutlined />,
    label: '申请',
    className: 'menu-item',
  },
  {
    key: '/todo',
    icon: <CheckSquareOutlined />,
    label: '待办',
    className: 'menu-item',
  },
  {
    key: '/ideas',
    icon: <BulbOutlined />,
    label: '创意',
    className: 'menu-item',
  },
  {
    type: 'divider',
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: '个人中心',
    className: 'menu-item',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isDark }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <div className={`sidebar ${isDark ? 'dark' : 'light'}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">校</div>
        <span className="logo-text">校校系统</span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        items={items}
        theme={isDark ? 'dark' : 'light'}
        className="sidebar-menu"
      />
    </div>
  );
};

export default Sidebar;
