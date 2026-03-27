import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../contexts/ThemeContext';
import './Layout.css';

const Layout: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="app-layout" data-theme={isDark ? 'dark' : 'light'}>
      <Sidebar isDark={isDark} />
      <div className="app-container">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
