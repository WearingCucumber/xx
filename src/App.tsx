import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Homework from './pages/Homework';
import Classes from './pages/Classes';
import Schedule from './pages/Schedule';
import QuestionBank from './pages/QuestionBank';
import Teaching from './pages/Teaching';
import Cloud from './pages/Cloud';
import Apply from './pages/Apply';
import Todo from './pages/Todo';
import Ideas from './pages/Ideas';
import Profile from './pages/Profile';
import './styles/theme.css';

// 深色主题配置
const darkTheme = {
  algorithm: ConfigProvider.darkAlgorithm,
  token: {
    colorPrimary: '#3b82f6',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    colorBgContainer: '#1e293b',
    colorBgElevated: '#334155',
    colorBgLayout: '#0f172a',
    colorBorder: '#334155',
    colorText: '#f8fafc',
    colorTextSecondary: '#cbd5e1',
    colorTextTertiary: '#64748b',
    borderRadius: 12,
    wireframe: false,
    fontSize: 14,
    controlHeight: 40,
  },
  components: {
    Menu: {
      darkItemSelectedBg: 'rgba(59, 130, 246, 0.12)',
      darkItemColor: '#cbd5e1',
      darkItemSelectedColor: '#60a5fa',
    },
    Table: {
      headerBg: '#334155',
      rowHoverBg: '#334155',
      borderColor: '#334155',
    },
    Card: {
      colorBgContainer: '#1e293b',
    },
    Button: {
      colorPrimary: '#3b82f6',
    },
    Input: {
      colorBgContainer: '#1e293b',
      colorBorder: '#334155',
    },
    Select: {
      colorBgContainer: '#1e293b',
      colorBorder: '#334155',
    },
  },
};

// 浅色主题配置
const lightTheme = {
  algorithm: ConfigProvider.defaultAlgorithm,
  token: {
    colorPrimary: '#3b82f6',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f1f5f9',
    colorBorder: '#e2e8f0',
    colorText: '#0f172a',
    colorTextSecondary: '#475569',
    colorTextTertiary: '#94a3b8',
    borderRadius: 12,
    wireframe: false,
    fontSize: 14,
    controlHeight: 40,
  },
  components: {
    Menu: {
      darkItemSelectedBg: 'rgba(59, 130, 246, 0.08)',
      darkItemColor: '#475569',
      darkItemSelectedColor: '#3b82f6',
    },
    Table: {
      headerBg: '#f8fafc',
      rowHoverBg: '#f1f5f9',
      borderColor: '#e2e8f0',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
    Button: {
      colorPrimary: '#3b82f6',
    },
    Input: {
      colorBgContainer: '#ffffff',
      colorBorder: '#e2e8f0',
    },
    Select: {
      colorBgContainer: '#ffffff',
      colorBorder: '#e2e8f0',
    },
  },
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// AppContent 组件在 ThemeProvider 内部，可以访问主题上下文
function AppContent() {
  const { isDark } = useTheme();

  return (
    <ConfigProvider locale={zhCN} theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="students" element={<Students />} />
            <Route path="homework" element={<Homework />} />
            <Route path="classes" element={<Classes />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="question-bank" element={<QuestionBank />} />
            <Route path="teaching" element={<Teaching />} />
            <Route path="cloud" element={<Cloud />} />
            <Route path="apply" element={<Apply />} />
            <Route path="todo" element={<Todo />} />
            <Route path="ideas" element={<Ideas />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

// 占位页面组件
function PlaceholderPage({ title }: { title: string }) {
  const { isDark } = useTheme();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: isDark
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        boxShadow: isDark
          ? '0 10px 40px rgba(102, 126, 234, 0.4)'
          : '0 10px 40px rgba(59, 130, 246, 0.3)'
      }}>
        ✨
      </div>
      <h1 style={{
        fontSize: '36px',
        background: isDark
          ? 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        margin: 0,
        fontWeight: 700
      }}>
        {title}
      </h1>
      <p style={{
        color: isDark ? '#64748b' : '#94a3b8',
        fontSize: '16px',
        margin: 0
      }}>
        敬请期待...
      </p>
    </div>
  );
}

export default App;
