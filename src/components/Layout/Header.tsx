import { useState, useEffect } from 'react';
import { BellOutlined, SearchOutlined, SyncOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Badge, Avatar, Dropdown, Space, Input, Tooltip, Switch } from 'antd';
import './Header.css';

const { Search } = Input;

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const userMenuItems = [
    { key: '1', label: '我的信息' },
    { key: '2', label: '修改密码' },
    { type: 'divider' },
    { key: '3', label: '退出登录', danger: true },
  ];

  return (
    <div className="header">
      <div className="header-left">
        <Search
          placeholder="搜索学员、班级、作业..."
          allowClear
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
          className="header-search"
        />
      </div>

      <div className="header-right">
        <div className="header-action">
          <SyncOutlined className="header-icon" />
        </div>

        <div className="header-action">
          <Badge count={3} size="small" offset={[-2, 5]}>
            <BellOutlined className="header-icon" />
          </Badge>
        </div>

        {/* 主题切换按钮 */}
        <div className="header-action theme-toggle">
          <Tooltip title={isDark ? '切换到浅色模式' : '切换到深色模式'}>
            <Switch
              checked={isDark}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              size="small"
              className="theme-switch"
            />
          </Tooltip>
        </div>

        <div className="header-action">
          <span className="coin-balance">
            <span className="coin-label">校币余额</span>
            <span className="coin-value">0</span>
          </span>
        </div>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <div className="user-profile">
            <Avatar
              style={{ backgroundColor: 'var(--primary)' }}
              size="default"
            >
              R
            </Avatar>
            <span className="user-name">Robin</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
