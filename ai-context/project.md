# 项目上下文 (Project Context)

## 项目背景

**项目名称**: 校校系统 (Xiaoxiao System)

**用途**: 基于调研报告设计的教育机构教务管理前端系统，为教师和管理员提供完整的教务管理工作界面。

**目标用户**: 教育机构教师、教务管理员

**核心功能领域**:
- 学员管理
- 班级管理
- 作业管理
- 课程表管理
- 题库管理
- 教研资源管理
- 云盘文件管理
- 申请排课
- 待办事项
- 创意建议收集

## 技术栈

### 核心框架
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19.2.4 | UI 框架 |
| TypeScript | 5.9.3 | 类型系统 |
| Vite | 8.0.1 | 构建工具 |

### UI 组件库
| 技术 | 版本 | 用途 |
|------|------|------|
| Ant Design | 5.29.3 | 组件库 |
| @ant-design/icons | 6.1.1 | 图标库 |
| @ant-design/pro-components | 2.8.10 | 高级组件 |

### 路由与状态
| 技术 | 版本 | 用途 |
|------|------|------|
| react-router-dom | 7.13.2 | 路由管理 |
| React Context API | 内置 | 全局状态（主题） |

### 工具库
| 技术 | 版本 | 用途 |
|------|------|------|
| dayjs | 1.11.20 | 日期处理 |

### 开发工具
| 技术 | 版本 | 用途 |
|------|------|------|
| eslint | 9.39.4 | 代码检查 |
| typescript-eslint | 8.57.0 | TS 语法检查 |

## 核心模块划分

### 按代码目录结构

```
src/
├── components/           # 公共组件层
│   └── Layout/          # 布局组件
│       ├── Layout.tsx   # 主布局容器
│       ├── Header.tsx   # 顶部导航栏
│       └── Sidebar.tsx  # 左侧菜单栏
│
├── pages/               # 页面组件层（12 个模块）
│   ├── Home/           # 首页 - 数据看板、待办事项
│   ├── Students/       # 学员管理
│   ├── Classes/        # 班级管理
│   ├── Homework/       # 作业管理
│   ├── Schedule/       # 课表管理
│   ├── QuestionBank/   # 题库管理
│   ├── Teaching/       # 教研管理
│   ├── Cloud/          # 云盘管理
│   ├── Apply/          # 申请排课
│   ├── Todo/           # 待办事项
│   ├── Ideas/          # 创意中心
│   └── Profile/        # 个人中心
│
├── contexts/            # React Context
│   └── ThemeContext.tsx # 主题上下文
│
└── styles/              # 全局样式
    ├── theme.css        # CSS 变量定义
    └── dark-theme.css   # 深色主题
```

### 模块责任划分

| 模块 | 文件 | 责任 |
|------|------|------|
| Layout | `components/Layout/` | 应用框架、导航结构 |
| ThemeContext | `contexts/ThemeContext.tsx` | 主题状态管理、持久化 |
| 首页 | `pages/Home/` | 数据概览、异常提醒 |
| 学员 | `pages/Students/` | 学员列表、筛选、状态管理 |
| 班级 | `pages/Classes/` | 班级卡片、详情弹窗、快捷作业 |
| 作业 | `pages/Homework/` | 作业列表、多维度筛选、进度追踪 |
| 课表 | `pages/Schedule/` | 月历视图、课程 Popover 详情 |
| 题库 | `pages/QuestionBank/` | 三 Tab 结构（系统/机构/单词书） |
| 教研 | `pages/Teaching/` | 树形大纲、知识点管理 |
| 云盘 | `pages/Cloud/` | 文件列表、共享管理 |
| 申请 | `pages/Apply/` | 排课申请、状态流转 |
| 待办 | `pages/Todo/` | 任务列表、优先级管理 |
| 创意 | `pages/Ideas/` | 创意卡片、投票功能 |
| 个人 | `pages/Profile/` | 信息编辑、密码修改 |

## 当前系统边界

### 输入
- 用户交互事件（点击、表单提交）
- 路由参数（页面导航）
- 主题切换指令
- Mock 数据（当前无后端 API）

### 输出
- 可视化 UI 界面（Ant Design 组件）
- 路由导航
- 主题状态持久化（localStorage）
- 表单验证反馈

### 系统限制
- **无后端集成**: 所有数据为 Mock 数据
- **无认证系统**: 无真实登录/权限控制
- **无实时通信**: 无 WebSocket/TCP 连接
- **纯前端应用**: 无服务器端渲染

### 外部依赖
- Ant Design CDN（或本地 node_modules）
- 浏览器 localStorage API
- React Router History API
