# 校校系统前端模块功能报告

**文档版本**: v1.0
**生成日期**: 2026 年 3 月 27 日
**技术栈**: React 18 + TypeScript + Vite 8 + Ant Design 5.x

---

## 目录

1. [项目概述](#1-项目概述)
2. [整体架构](#2-整体架构)
3. [布局组件](#3-布局组件)
4. [页面模块详解](#4-页面模块详解)
5. [主题系统](#5-主题系统)
6. [技术实现细节](#6-技术实现细节)

---

## 1. 项目概述

### 1.1 项目背景
基于校校系统调研报告设计的前端界面，为教育机构提供完整的教务管理解决方案。

### 1.2 设计理念
- **商业化**: 专业的蓝色主题，清晰的层级结构，统一的视觉语言
- **年轻化**: 蓝紫渐变配色，流畅动画，彩色图标
- **现代化**: 玻璃态效果，柔和阴影，大圆角设计

### 1.3 已实现模块

| 序号 | 模块名称 | 路由路径 | 状态 |
|------|----------|----------|------|
| 1 | 首页 | `/` | ✅ 完成 |
| 2 | 学员管理 | `/students` | ✅ 完成 |
| 3 | 班级管理 | `/classes` | ✅ 完成 |
| 4 | 作业管理 | `/homework` | ✅ 完成 |
| 5 | 课表管理 | `/schedule` | ✅ 完成 |
| 6 | 题库管理 | `/question-bank` | ✅ 完成 |
| 7 | 教研管理 | `/teaching` | ✅ 完成 |
| 8 | 云盘管理 | `/cloud` | ✅ 完成 |
| 9 | 申请排课 | `/apply` | ✅ 完成 |
| 10 | 待办事项 | `/todo` | ✅ 完成 |
| 11 | 创意中心 | `/ideas` | ✅ 完成 |
| 12 | 个人中心 | `/profile` | ✅ 完成 |

---

## 2. 整体架构

### 2.1 项目结构

```
xiaoxiao-system/
├── src/
│   ├── components/          # 公共组件
│   │   ├── Icons/          # 图标组件
│   │   └── Layout/         # 布局组件
│   │       ├── Header.tsx/.css      # 顶部导航
│   │       ├── Sidebar.tsx/.css     # 左侧菜单
│   │       └── Layout.tsx/.css      # 主布局
│   ├── pages/              # 页面组件
│   │   ├── Home/           # 首页
│   │   ├── Students/       # 学员管理
│   │   ├── Classes/        # 班级管理
│   │   ├── Homework/       # 作业管理
│   │   ├── Schedule/       # 课表管理
│   │   ├── QuestionBank/   # 题库管理
│   │   ├── Teaching/       # 教研管理
│   │   ├── Cloud/          # 云盘管理
│   │   ├── Apply/          # 申请排课
│   │   ├── Todo/           # 待办事项
│   │   ├── Ideas/          # 创意中心
│   │   └── Profile/        # 个人中心
│   ├── contexts/           # React Context
│   │   └── ThemeContext.tsx  # 主题上下文
│   ├── styles/             # 全局样式
│   │   └── theme.css       # 主题变量
│   ├── App.tsx             # 应用入口
│   └── main.tsx            # 入口文件
├── package.json
└── README.md
```

### 2.2 路由配置

```typescript
// App.tsx 路由定义
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="students" element={<Students />} />
  <Route path="classes" element={<Classes />} />
  <Route path="homework" element={<Homework />} />
  <Route path="schedule" element={<Schedule />} />
  <Route path="question-bank" element={<QuestionBank />} />
  <Route path="teaching" element={<Teaching />} />
  <Route path="cloud" element={<Cloud />} />
  <Route path="apply" element={<Apply />} />
  <Route path="todo" element={<Todo />} />
  <Route path="ideas" element={<Ideas />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

---

## 3. 布局组件

### 3.1 Layout - 主布局组件

**文件**: `src/components/Layout/Layout.tsx`

**功能描述**:
- 提供系统整体框架结构
- 集成 Sidebar 和 Header 组件
- 管理主题状态传递

**核心代码**:
```typescript
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
```

### 3.2 Sidebar - 左侧导航栏

**文件**: `src/components/Layout/Sidebar.tsx`

**功能描述**:
- 11 个主菜单项 + 个人中心入口
- 当前路由高亮显示
- 支持深色/浅色主题适配

**菜单结构**:

| 图标 | 名称 | 路由 |
|------|------|------|
| 🏠 HomeOutlined | 首页 | `/` |
| 👥 TeamOutlined | 学员 | `/students` |
| 📖 BookOutlined | 班级 | `/classes` |
| 📄 FileTextOutlined | 作业 | `/homework` |
| 📅 CalendarOutlined | 课表 | `/schedule` |
| 🗄️ DatabaseOutlined | 题库 | `/question-bank` |
| 🎯 AppstoreOutlined | 教研 | `/teaching` |
| ☁️ CloudOutlined | 云盘 | `/cloud` |
| 📤 SendOutlined | 申请 | `/apply` |
| ✅ CheckSquareOutlined | 待办 | `/todo` |
| 💡 BulbOutlined | 创意 | `/ideas` |
| 👤 UserOutlined | 个人中心 | `/profile` |

**样式特性**:
- 固定宽度 260px
- 渐变 logo 设计
- 选中项蓝色高亮背景

### 3.3 Header - 顶部导航栏

**文件**: `src/components/Layout/Header.tsx`

**功能描述**:
- 全局搜索框
- 消息通知（带未读数徽章）
- 深浅模式切换开关
- 校币余额显示
- 用户下拉菜单

**UI 组件**:
- Ant Design Input.Search - 全局搜索
- Ant Design Badge - 消息计数
- Ant Design Switch - 主题切换
- Ant Design Dropdown - 用户菜单

**样式特性**:
- 固定高度 70px
- 右侧操作区水平排列
- 响应式适配

---

## 4. 页面模块详解

### 4.1 首页 (Home)

**文件**: `src/pages/Home/index.tsx`

**功能区域**:

#### 4.1.1 欢迎区域
- 渐变标题文字
- 日期显示
- 装饰性光晕背景

#### 4.1.2 待办事项卡片
| 异常类型 | 数量 | 描述 |
|----------|------|------|
| 课程班作业异常 | 1 个班级 | 班级整体完成率低 |
| 学生作业异常 | 7 个学生 | 连续未提交/完成率下降 |

**UI 特性**:
- 红色渐变顶边标识异常状态
- 学生名单 Tag 展示
- 查看详情链接

#### 4.1.3 数据看板
| 卡片名称 | 核心指标 | 趋势 |
|----------|----------|------|
| 学生分析 | 作业完成率 78.5% | ↑ 5.2% |
| 老师分析 | 布置作业 172 个 | ↑ 12.3% |
| 提分分析 | 平均提分 15.8 分 | ↑ 8.5% |

#### 4.1.4 黑板报
- 通知、公告、活动三类信息
- 日期标签展示

#### 4.1.5 新功能提示
- NEW 标签
- 功能名称 + 上线日期

---

### 4.2 学员管理 (Students)

**文件**: `src/pages/Students/index.tsx`

**功能区域**:

#### 4.2.1 统计卡片
| 指标 | 数值 |
|------|------|
| 学员总数 | 34 |
| 在读学员 | 30 |
| 已结课 | 4 |

#### 4.2.2 筛选功能
- 搜索框：支持姓名、手机号模糊搜索
- 状态筛选：全部/在读/已结课

#### 4.2.3 学员列表表格

**列定义**:
| 列名 | 宽度 | 内容 |
|------|------|------|
| 学员信息 | 250px | 头像 + 姓名 + 学号 |
| 班级 | - | 多标签展示 |
| 状态 | 100px | Tag 标识 |
| 手机号 | 120px | 脱敏显示 |
| 年级 | 100px | 文本 |
| 学校 | - | 文本 |
| 操作 | 120px | 详情/编辑 |

**模拟数据**: 8 条学员记录，包含雅思、托福、SAT、KET/PET 等课程学员

---

### 4.3 班级管理 (Classes)

**文件**: `src/pages/Classes/index.tsx`

**功能区域**:

#### 4.3.1 筛选条件
- 搜索框：班级名称搜索
- 类型筛选：全部类型/一对一/寒假班/暑假班
- 状态筛选：全部状态/在读/已结课

#### 4.3.2 班级卡片网格
- 班级名称
- 类型标签（一对一、寒假班等）
- 状态标签（在读、已结课）
- 学员头像组（最多显示 4 人）
- 学员人数统计

**模拟数据**: 10 个班级

#### 4.3.3 班级详情弹窗（5 个子标签）

| 标签 | 图标 | 功能 |
|------|------|------|
| 概览 | HomeOutlined | 课程进度、总课时、学生人数、开课日期 |
| 作业 | FileTextOutlined | 作业列表 + 快捷作业类型面板 |
| 课表 | CalendarOutlined | 课程安排 |
| 反馈 | MessageOutlined | 课程反馈 |
| 作业大纲 | LineChartOutlined | 教学大纲 |

**快捷作业类型** (7 种):
- 布置作业、模考作业、自定义作业
- 打卡作业、其他作业、常用作业
- 视频课件

---

### 4.4 作业管理 (Homework)

**文件**: `src/pages/Homework/index.tsx`

**功能区域**:

#### 4.4.1 统计卡片
| 指标 | 数值 |
|------|------|
| 全部作业 | 175 |
| 作业模考 | 172 |
| 打卡作业 | 3 |
| 待我批改 | 32 |
| 我布置的 | 32 |

#### 4.4.2 作业类型标签
- 全部作业、单词作业、打卡作业、作业模考、我的批改

#### 4.4.3 多维度筛选
- 科目：雅思/托福/SAT/ACT
- 班级：下拉选择
- 状态：未开始/进行中/已完成/已逾期

#### 4.4.4 作业列表表格

**列定义**:
| 列名 | 宽度 | 内容 |
|------|------|------|
| 作业名称 | 280px | 名称 + 类型 Tag+ 状态 Tag |
| 时间 | 200px | 开始日期 + 截止日期 |
| 班级 | 150px | 班级标签 |
| 完成情况 | 180px | 提交数/总数 + 进度条 |
| 批改情况 | 120px | 已批改数/已提交数 |
| 布置老师 | 100px | 教师姓名 |
| 操作 | 150px | 详情/预览/AI 分析/催交 |

**作业类型**:
- `exam`: 作业模考（红色）
- `daily`: 日常作业（蓝色）
- `checkin`: 打卡作业（绿色）
- `video`: 视频课件（紫色）

**状态类型**:
- `not_started`: 未开始
- `in_progress`: 进行中
- `completed`: 已完成
- `overdue`: 已逾期

---

### 4.5 课表管理 (Schedule)

**文件**: `src/pages/Schedule/index.tsx`

**功能区域**:

#### 4.5.1 导航控制
- 上个月/本月/下个月按钮
- 当前年月显示
- 添加课程按钮

#### 4.5.2 课表网格
- 横向：星期一至星期天（7 列）
- 纵向：8:00-20:00（13 行）
- 课程 Badge 展示（点击弹出详情）

#### 4.5.3 课程详情弹窗
- 课程名称
- 时间、地点、教师信息
- 操作按钮：设置考勤、详情

**模拟课程数据** (6 条):
| 课程 | 时间 | 教师 |
|------|------|------|
| 雅思阅读 L1 | 09:00-10:30 | Robin |
| 托福听力 L2 | 10:45-12:15 | Evelyn |
| 雅思写作 L3 | 14:00-15:30 | Molly |
| SAT 数学 L1 | 15:45-17:15 | hxx |
| 雅思口语 L2 | 09:00-10:30 | Yoo |
| 托福阅读 L4 | 13:30-15:00 | Robin |

**技术实现**:
- Popover 受控组件
- `openPopoverId` 状态管理
- `onOpenChange` 回调处理

---

### 4.6 题库管理 (QuestionBank)

**文件**: `src/pages/QuestionBank/index.tsx`

**功能区域**:

#### 4.6.1 系统题库 Tab

**筛选条件**:
- 科目：托福/雅思/SAT/ACT/GRE
- 类别：阅读/听力/写作/口语
- 难度：容易/中等/困难

**数据列**:
| 列名 | 说明 |
|------|------|
| 题目名称 | 题库名称 |
| 类别 | 科目分类 |
| 难度 | 颜色区分 |
| 参与数 | 可排序 |
| 正确率 | 颜色区分（≥70% 绿色） |
| 中位分 | 数值 |
| 区分度 | ≥0.7 绿色显示 |
| 更新时间 | 日期 |
| 操作 | 预览/查看/开放/布置 |

**模拟数据**: 5 条系统题库记录

#### 4.6.2 机构题库 Tab

**筛选条件**:
- 科目：雅思/托福/SAT
- 搜索：试卷名称

**数据列**:
| 列名 | 说明 |
|------|------|
| 状态 | 已共享/未共享 |
| 试卷名称 | 试卷全名 |
| 科目 | 分类标签 |
| 总分 | 满分值 |
| 题目数 | 题目数量 |
| 时长 | 分钟数 |
| 创建人 | 教师姓名 |
| 更新时间 | 日期 |
| 操作 | 录入答案/布置/新建/共享 |

**模拟数据**: 3 条机构题库记录

#### 4.6.3 单词书 Tab

**筛选条件**:
- 科目：雅思/托福/KET/PET/A-Level
- 搜索：词书名称

**数据列**:
| 列名 | 说明 |
|------|------|
| 词书名称 | 词书全名 |
| 单元数 | 单元数量 |
| 词汇数 | 单词总量 |
| 科目 | 分类 |
| 创建老师 | 教师姓名 |
| 使用次数 | 可排序 |
| 正确率 | ≥80% 绿色显示 |
| 操作 | 抽查/布置/详情/删除 |

**模拟数据**: 7 本词书

---

### 4.7 教研管理 (Teaching)

**文件**: `src/pages/Teaching/index.tsx`

**功能区域**:

#### 4.7.1 作业大纲 Tab

**左侧树形面板**:
- 搜索框
- DirectoryTree 组件
- 多层级结构：科目 → 班级 → 课程类型 → 课件

**树结构示例**:
```
雅思
├── 大学生 1 班
│   ├── 雅思 - 大学生 - 阅读
│   │   ├── L1-2 主课
│   │   └── L1-2 课后刷题
│   └── 雅思 - 大学生 - 听力
│       ├── L1 基础训练
│       └── L2 强化练习
└── 寒假班 307 班
    └── 写作专项
        ├── 大作文模板
        └── 小作文图表
```

**右侧内容面板**:
- 课件列表（PDF、Excel 等）
- 操作：预览/下载/删除
- 上传课件按钮
- 共享按钮

#### 4.7.2 知识点 Tab

**筛选条件**:
- 搜索框
- 科目筛选
- 类型筛选
- 范围：全部/我的/共享

**知识点卡片**:
| 字段 | 说明 |
|------|------|
| 知识点名称 | 标题 |
| 共享状态 | Tag 标识 |
| 科目/类型 | 分类信息 |
| 创建人 | 教师姓名 |
| 操作 | 编辑/共享 |

**模拟数据**: 5 条知识点

---

### 4.8 云盘管理 (Cloud)

**文件**: `src/pages/Cloud/index.tsx`

**功能区域**:

#### 4.8.1 存储空间信息
- 已用/总容量显示
- 进度条可视化

#### 4.8.2 我的云盘 Tab

**筛选**: 文件搜索

**数据列**:
| 列名 | 说明 |
|------|------|
| 文件名 | 文件夹/文件图标 |
| 大小 | MB 单位 |
| 上传日期 | 日期 |
| 操作 | 下载/共享/更多 |

**模拟数据**: 6 条记录（含 2 个文件夹）

#### 4.8.3 共享云盘 Tab

**筛选**: 共享文件搜索

**数据列**:
| 列名 | 说明 |
|------|------|
| 文件名 | 文件夹/文件图标 |
| 大小 | MB 单位 |
| 上传日期 | 日期 |
| 上传人 | 用户姓名 |
| 操作 | 下载/共享/更多 |

**模拟数据**: 4 条记录

---

### 4.9 申请排课 (Apply)

**文件**: `src/pages/Apply/index.tsx`

**功能区域**:

#### 4.9.1 状态筛选
- 全部/待处理/已处理/已驳回

#### 4.9.2 申请列表表格

**数据列**:
| 列名 | 宽度 | 说明 |
|------|------|------|
| 校区 | 100px | 校区名称 |
| 班级 | 180px | 班级名称 |
| 申请人 | 80px | 教师姓名 |
| 申请时间 | 160px | 日期时间 |
| 备注 | 200px | 需求说明 |
| 状态 | 100px | Tag 标识 |
| 课时 | 100px | 已排/总课时 |
| 处理人 | 80px | 处理人姓名 |
| 驳回原因 | 150px | 原因说明 |
| 操作 | 150px | 查看/通过/驳回 |

**状态类型**:
- `pending`: 待处理（橙色）
- `processed`: 已处理（绿色）
- `rejected`: 已驳回（红色）

#### 4.9.3 申请弹窗
- 校区选择
- 班级选择（支持搜索）
- 课时数输入
- 备注文本域

---

### 4.10 待办事项 (Todo)

**文件**: `src/pages/Todo/index.tsx`

**功能区域**:

#### 4.10.1 统计信息
- 待处理数量
- 已完成数量

#### 4.10.2 筛选条件
- 搜索框
- 类型筛选：作业/报告/反馈/回访
- 优先级筛选：高/中/低
- 日期范围选择器

#### 4.10.3 待办列表表格

**数据列**:
| 列名 | 宽度 | 说明 |
|------|------|------|
| 待办事项 | 250px | 标题 + 完成状态 |
| 类型 | 100px | Tag+ 图标 |
| 优先级 | 100px | 高/中/低 |
| 截止时间 | 160px | 日期时间 |
| 来自 | 150px | 来源 |
| 数量 | 70px | 任务数量 |
| 操作 | 120px | 完成/重新打开/详情 |

**类型定义**:
| 类型 | 颜色 | 图标 |
|------|------|------|
| homework | 蓝色 | CheckSquareOutlined |
| report | 紫色 | ClockCircleOutlined |
| feedback | 绿色 | CalendarOutlined |
| visit | 橙色 | ExclamationCircleOutlined |

---

### 4.11 创意中心 (Ideas)

**文件**: `src/pages/Ideas/index.tsx`

**功能区域**:

#### 4.11.1 说明区域
- 功能说明文本
- 提交创意按钮

#### 4.11.2 创意卡片列表

**卡片内容**:
- 创意标题
- 状态标识（已实现/评审中/计划中）
- 描述文本
- 票数统计
- 操作按钮：投票/评论/分享

**模拟数据**: 3 条创意

| 创意 | 状态 | 票数 |
|------|------|------|
| AI 智能作文批改 | 评审中 | 24 |
| 学员学习路径推荐 | 计划中 | 18 |
| 班级 PK 功能 | 已实现 | 32 |

---

### 4.12 个人中心 (Profile)

**文件**: `src/pages/Profile/index.tsx`

**功能区域**:

#### 4.12.1 个人信息展示区
- 头像（支持更换）
- 姓名
- 角色
- 手机号
- 邮箱

#### 4.12.2 我的信息 Tab

**表单字段**:
| 字段 | 验证规则 |
|------|----------|
| 姓名 | 必填 |
| 部门 | 必填 |
| 手机号 | 必填 + 格式验证 |
| 邮箱 | 必填 + 邮箱格式 |

#### 4.12.3 修改密码 Tab

**表单字段**:
| 字段 | 验证规则 |
|------|----------|
| 当前密码 | 必填 |
| 新密码 | 必填 + 最少 6 位 |
| 确认密码 | 必填 |

---

## 5. 主题系统

### 5.1 ThemeContext

**文件**: `src/contexts/ThemeContext.tsx`

**功能**:
- 主题状态管理
- localStorage 持久化
- 主题切换方法

**核心代码**:
```typescript
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved ? saved === 'dark' : true; // 默认深色模式
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark-theme', isDark);
    document.documentElement.classList.toggle('light-theme', !isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 5.2 CSS 变量系统

**文件**: `src/styles/theme.css`

**深色模式变量**:
```css
:root, [data-theme='dark'] {
  --primary: #3b82f6;
  --gradient-start: #667eea;
  --gradient-end: #764ba2;
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --bg-hover: #334155;
  --border: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #64748b;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --shadow-primary: 0 4px 14px rgba(59, 130, 246, 0.4);
}
```

**浅色模式变量**:
```css
[data-theme='light'] {
  --bg-dark: #f1f5f9;
  --bg-card: #ffffff;
  --bg-hover: #f8fafc;
  --border: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --shadow-primary: 0 4px 14px rgba(59, 130, 246, 0.2);
}
```

### 5.3 Ant Design 主题配置

**App.tsx** 中通过 `ConfigProvider` 配置:

**深色主题**:
- `algorithm`: ConfigProvider.darkAlgorithm
- `colorPrimary`: #3b82f6
- `colorBgContainer`: #1e293b
- `colorBgLayout`: #0f172a
- `borderRadius`: 12

**浅色主题**:
- `algorithm`: ConfigProvider.defaultAlgorithm
- 相似的配色方案，浅色背景

---

## 6. 技术实现细节

### 6.1 核心依赖

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "antd": "^5.x",
  "@ant-design/icons": "^5.x",
  "vite": "^8.x",
  "typescript": "^5.x"
}
```

### 6.2 组件设计模式

#### 6.2.1 受控组件
- Popover (课表模块)
- Tabs (多标签页面)
- Table (数据列表)
- Form (表单)

#### 6.2.2 状态管理
- `useState`: 组件内状态
- `useContext`: 全局主题状态
- localStorage: 持久化存储

#### 6.2.3 数据流
```
用户交互 → useState 更新 → 组件重渲染 → UI 更新
          ↓
    localStorage 持久化
```

### 6.3 样式方案

#### 6.3.1 CSS 变量
所有页面使用统一的 CSS 变量系统，支持主题切换。

#### 6.3.2 响应式设计
所有页面支持响应式布局，适配不同屏幕尺寸。

**断点**:
- `@media (max-width: 1024px)`: 平板
- `@media (max-width: 768px)`: 手机

### 6.4 动画效果

#### 6.4.1 页面进入动画
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page {
  animation: fadeIn 0.4s ease-out;
}
```

#### 6.4.2 悬停效果
- 卡片悬停上浮
- 按钮颜色变化
- 缩放效果

### 6.5 数据模拟

所有模块使用 Mock 数据，便于演示和开发。数据结构设计参考实际业务需求。

---

## 附录

### A. 颜色规范

| 用途 | 色值 | 说明 |
|------|------|------|
| 主色 | #3b82f6 | 活力蓝 |
| 渐变起始 | #667eea | 蓝紫色 |
| 渐变结束 | #764ba2 | 紫色 |
| 成功 | #10b981 | 绿色 |
| 警告 | #f59e0b | 橙色 |
| 错误 | #ef4444 | 红色 |
| 信息 | #3b82f6 | 蓝色 |

### B. 圆角规范

| 等级 | 值 | 用途 |
|------|-----|------|
| lg | 16px | 卡片 |
| xl | 20px | 大卡片 |
| 2xl | 24px | 模态框 |

### C. 阴影规范

| 用途 | 值 |
|------|-----|
| 主阴影 | 0 4px 14px rgba(59, 130, 246, 0.4) |
| 卡片阴影 | 0 2px 8px rgba(0, 0, 0, 0.15) |

---

**文档结束**
