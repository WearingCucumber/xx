# 系统架构 (Architecture)

## 整体架构分层

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (渲染层)                       │
├─────────────────────────────────────────────────────────┤
│  Pages Layer (页面层) - 12 个业务模块                      │
│  ├─ Home │ Students │ Classes │ Homework │ Schedule    │
│  ├─ QuestionBank │ Teaching │ Cloud │ Apply │ ...      │
├─────────────────────────────────────────────────────────┤
│  Components Layer (组件层)                               │
│  ├─ Layout (Header / Sidebar / Main)                    │
│  └─ Ant Design Pro Components                           │
├─────────────────────────────────────────────────────────┤
│  Context Layer (上下文层)                                │
│  └─ ThemeContext (主题状态管理)                          │
├─────────────────────────────────────────────────────────┤
│  Router Layer (路由层)                                   │
│  └─ React Router v7 (嵌套路由、路由守卫)                  │
├─────────────────────────────────────────────────────────┤
│  UI Library (UI 库)                                      │
│  └─ Ant Design v5 (组件 + ConfigProvider 主题配置)        │
└─────────────────────────────────────────────────────────┘
```

## 分层职责

### 1. Router Layer (路由层)
**文件**: `src/App.tsx`

**职责**:
- 定义路由表（12 个业务路由 + 1 个 404 路由）
- 嵌套路由结构（Layout 作为父路由）
- 路由重定向（`/*` → `/`）

**路由结构**:
```typescript
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="students" element={<Students />} />
  // ... 11 个子路由
</Route>
```

### 2. Context Layer (上下文层)
**文件**: `src/contexts/ThemeContext.tsx`

**职责**:
- 主题状态管理（isDark）
- localStorage 持久化
- DOM 属性同步（`data-theme`、class）

**状态流转**:
```
用户点击 Switch → toggleTheme() → setIsDark()
→ useEffect → localStorage + documentElement
→ ConfigProvider.theme → 组件重渲染
```

### 3. Components Layer (组件层)
**文件**: `src/components/Layout/*`

**职责**:
- `Layout.tsx`: 组合 Header + Sidebar + Outlet
- `Header.tsx`: 搜索、通知、主题切换、用户菜单
- `Sidebar.tsx`: 导航菜单（11 项 + 个人中心）

### 4. Pages Layer (页面层)
**文件**: `src/pages/*/index.tsx`

**职责**:
- 业务逻辑实现
- 数据展示（Mock 数据）
- 用户交互处理

## 数据流

### 主题切换数据流

```
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  Header.tsx  │     │ThemeContext │     │  App.tsx     │
│  (Switch)    │────▶│  (toggle)   │────▶│(ConfigProvider)
└──────────────┘     └─────────────┘     └──────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ localStorage  │
                    │ documentElement│
                    └───────────────┘
```

### 路由导航数据流

```
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│ Sidebar.tsx  │     │React Router │     │  App.tsx     │
│ (Menu Click) │────▶│ (navigate)  │────▶│ (Route Match)
└──────────────┘     └─────────────┘     └──────────────┘
                                                │
                                                ▼
                                       ┌───────────────┐
                                       │ Page Component│
                                       │  (Render)     │
                                       └───────────────┘
```

### 页面交互数据流（以课表 Popover 为例）

```
用户点击 Badge
    │
    ▼
Popover (trigger="click")
    │
    ▼
onOpenChange 回调
    │
    ▼
setOpenPopoverId(courseId)
    │
    ▼
Popover open={openPopoverId === course.id}
    │
    ▼
弹窗显示/隐藏
```

## 线程模型

### React 单线程模型
- **主线程执行**: 所有 React 渲染、事件处理在主线程
- **事件驱动**: 用户事件 → State 更新 → 重渲染
- **批处理**: React 18 自动批处理多个 State 更新

### 异步处理
| 场景 | 机制 | 文件 |
|------|------|------|
| 主题持久化 | `useEffect` 副作用 | `ThemeContext.tsx:31-36` |
| 路由懒加载 | 未实现（可扩展） | - |
| 数据请求 | 未实现（Mock 数据） | - |

### 同步/回调机制
- **受控组件**: Popover、Tabs、Table 使用受控模式
- **回调传递**: 父组件→子组件通过 props 传递回调函数
- **事件冒泡**: 使用 `stopPropagation` 控制事件传播

## 关键类/组件关系

### 文字描述

**ThemeContext** (核心 Context)
- 被 `App.tsx` 的 `AppContent` 组件消费
- 被所有页面的 `useTheme()` Hook 消费
- 被 `Layout` 组件消费（传递 `isDark` 给子组件）

**Layout** (根布局)
- 包含 `Header`（顶部导航）
- 包含 `Sidebar`（左侧菜单）
- 包含 `Outlet`（子路由渲染位置）

**App** (应用入口)
- 包裹 `ThemeProvider`
- 包裹 `ConfigProvider`（Ant Design 主题）
- 包裹 `BrowserRouter`
- 定义所有路由规则

**各 Page 组件**
- 独立业务逻辑
- 共享 `ThemeContext`
- 通过 `react-router` 导航

## 样式架构

### CSS 变量系统
**文件**: `src/styles/theme.css`

```
深色模式变量                    浅色模式变量
    │                              │
    └──────────┬───────────────────┘
               ▼
    ┌─────────────────────┐
    │ data-theme 属性切换 │
    └─────────────────────┘
               │
               ▼
    ┌─────────────────────┐
    │  component CSS 引用  │
    └─────────────────────┘
```

### Ant Design 主题配置
**文件**: `src/App.tsx:21-116`

- `darkTheme`: ConfigProvider.darkAlgorithm
- `lightTheme`: ConfigProvider.defaultAlgorithm
- 通过 `ConfigProvider.theme` 属性传递
