# 设计决策 (Decisions)

## 已体现的设计决策

---

### 决策 1: 使用 React Context 管理主题状态

**决策内容**:
使用 React Context API (`ThemeContext`) 而非状态管理库（如 Redux、Zustand）管理全局主题状态。

**代码证据**:
```typescript
// src/contexts/ThemeContext.tsx
export const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

**原因**:
- 主题状态是单一布尔值，复杂度低
- 避免引入额外依赖
- Context API 足够满足需求

**影响范围**:
- 所有页面组件通过 `useTheme()` 获取主题状态
- `App.tsx` 包裹 `ThemeProvider`
- `Layout` 组件传递主题给子组件

---

### 决策 2: 使用 localStorage 持久化主题偏好

**决策内容**:
将用户主题选择存储到 localStorage，而非 Session 或 Cookie。

**代码证据**:
```typescript
// src/contexts/ThemeContext.tsx:26-29
const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem('theme-mode');
  return saved ? saved === 'dark' : true; // 默认深色模式
});

// src/contexts/ThemeContext.tsx:31-36
useEffect(() => {
  localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  // ...
}, [isDark]);
```

**原因**:
- 用户偏好需要跨会话保持
- localStorage 比 Cookie 更适合存储非敏感配置
- 无过期时间，永久保存

**影响范围**:
- 用户刷新页面后主题不变
- 无后端存储依赖

---

### 决策 3: 使用 Ant Design ConfigProvider 统一主题配置

**决策内容**:
使用 Ant Design 的 `ConfigProvider` 的 `theme` 属性进行主题配置，而非为每个组件单独设置样式。

**代码证据**:
```typescript
// src/App.tsx:21-67
const darkTheme = {
  algorithm: ConfigProvider.darkAlgorithm,
  token: {
    colorPrimary: '#3b82f6',
    colorBgContainer: '#1e293b',
    // ...
  },
  components: {
    Menu: { darkItemSelectedBg: 'rgba(59, 130, 246, 0.12)' },
    Table: { headerBg: '#334155' },
    // ...
  },
};
```

**原因**:
- 统一主题管理，避免样式分散
- 利用 Ant Design v5 的 CSS-in-JS 主题系统
- 自动适配深色/浅色算法

**影响范围**:
- 所有 Ant Design 组件自动继承主题
- 减少自定义 CSS 代码量

---

### 决策 4: 使用受控组件模式管理 Popover 状态

**决策内容**:
使用 `open` 和 `onOpenChange` 受控模式管理 Popover 显示，而非非受控模式。

**代码证据**:
```typescript
// src/pages/Schedule/index.tsx:77
const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

// src/pages/Schedule/index.tsx:107-109
const handlePopoverChange: PopoverProps['onOpenChange'] = (open, courseId) => {
  setOpenPopoverId(open ? courseId : null);
};

// src/pages/Schedule/index.tsx:193-200
<Popover
  open={openPopoverId === course.id}
  onOpenChange={(open) => handlePopoverChange(open, course.id)}
  content={renderCoursePopover(course, () => setOpenPopoverId(null))}
>
```

**原因**:
- 解决"点击后立即隐藏"的 bug
- 精确控制哪个课程卡片弹出
- 支持编程式关闭（点击"设置考勤"按钮时）

**影响范围**:
- 修复了非受控模式下的点击响应问题
- 增加了代码复杂度（需要状态管理）

---

### 决策 5: 使用嵌套路由结构

**决策内容**:
使用 `Layout` 作为父路由，所有页面作为子路由的嵌套结构。

**代码证据**:
```typescript
// src/App.tsx:134-148
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="students" element={<Students />} />
  <Route path="homework" element={<Homework />} />
  // ...
  <Route path="*" element={<Navigate to="/" replace />} />
</Route>
```

**原因**:
- 避免在每个页面重复渲染 Layout
- 保持导航栏状态（如搜索框、通知计数）
- 符合 React Router v6+ 的最佳实践

**影响范围**:
- `Layout` 组件包含 `<Outlet />` 渲染子路由
- 404 路由自动重定向到首页

---

### 决策 6: 默认深色模式

**决策内容**:
系统默认使用深色模式，而非浅色模式。

**代码证据**:
```typescript
// src/contexts/ThemeContext.tsx:28-29
const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem('theme-mode');
  return saved ? saved === 'dark' : true; // 默认深色模式
});
```

**原因**:
- 目标用户（年轻群体）偏好深色模式
- 减少屏幕眩光，长时间使用更舒适
- 符合现代应用趋势

**影响范围**:
- 首次访问用户看到深色界面
- 浅色模式需要手动切换

---

### 决策 7: Mock 数据而非真实 API

**决策内容**:
所有页面使用硬编码的 Mock 数据，未实现后端 API 调用。

**代码证据**:
```typescript
// src/pages/Students/index.tsx:24-106
const studentData: Student[] = [
  { key: '1', id: 'S001', name: '揭佳泰', ... },
  { key: '2', id: 'S002', name: '张晓明', ... },
  // ... 8 条数据
];

// src/pages/Homework/index.tsx:33-124
const homeworkData: Homework[] = [
  { key: '1', id: 'HW001', name: '托福阅读 TPO56-58 全套练习', ... },
  // ... 6 条数据
];
```

**原因**:
- 前端先行开发，后端接口未就绪
- 便于演示和 UI 验证
- 降低开发依赖

**影响范围**:
- 数据无法持久化
- 刷新后数据重置
- 无增删改查真实操作

---

### 决策 8: 使用 CSS 变量而非 CSS Modules

**决策内容**:
使用全局 CSS 变量系统管理主题，而非 CSS Modules 或 Styled Components。

**代码证据**:
```css
/* src/styles/theme.css */
:root, [data-theme='dark'] {
  --primary: #3b82f6;
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --text-primary: #f8fafc;
  /* ... */
}

[data-theme='light'] {
  --bg-dark: #f1f5f9;
  --bg-card: #ffffff;
  /* ... */
}
```

**原因**:
- 简单直接，无编译开销
- 运行时动态切换主题
- 易于调试和维护

**影响范围**:
- 全局样式可能冲突（需注意命名规范）
- 主题切换即时生效

---

### 决策 9: 表格使用 Ant Design Table 而非自定义

**决策内容**:
所有列表页面使用 Ant Design 的 Table 组件，未自定义实现。

**代码证据**:
```typescript
// src/pages/Students/index.tsx:122-191
const columns: ColumnsType<Student> = [
  { title: '学员信息', dataIndex: 'name', key: 'name', width: 250, ... },
  { title: '班级', dataIndex: 'classes', key: 'classes', ... },
  // ... 7 列
];

<Table columns={columns} dataSource={studentData} />
```

**原因**:
- 功能完整（分页、排序、筛选）
- 类型安全（TypeScript 支持）
- 样式统一

**影响范围**:
- 依赖 Ant Design 版本
- 定制性受限

---

### 决策 10: 未使用路由懒加载

**决策内容**:
所有页面组件使用直接导入，未使用 `React.lazy` + `Suspense` 懒加载。

**代码证据**:
```typescript
// src/App.tsx:6-17
import Home from './pages/Home';
import Students from './pages/Students';
import Homework from './pages/Homework';
// ... 直接导入所有页面
```

**原因**:
- 页面数量适中（12 个），打包体积可控
- 简化代码结构
- 首次加载后切换页面更快

**影响范围**:
- 初始包体积较大
- 首屏加载时间增加
- 可后续优化
