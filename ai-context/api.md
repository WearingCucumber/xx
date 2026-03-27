# 接口定义 (API)

## 说明

**当前状态**: 项目使用 Mock 数据，无真实后端 API 接口。

以下内容基于代码中模拟的数据结构推断未来 API 设计。

---

## 对外接口（模拟）

### 1. 学员管理 API

#### 1.1 获取学员列表
```typescript
// 推断接口
GET /api/students

// 请求参数
{
  page: number;
  pageSize: number;
  status?: 'active' | 'finished' | 'inactive';
  search?: string; // 姓名/手机号
}

// 响应结构
{
  code: number;
  data: {
    list: Student[];
    total: number;
  };
}

// Student 类型
interface Student {
  id: string;          // 学号 S001
  name: string;        // 姓名
  avatar?: string;     // 头像 URL
  classes: string[];   // 班级列表
  status: 'active' | 'finished' | 'inactive';
  phone: string;       // 手机号
  grade?: string;      // 年级
  school?: string;     // 学校
}
```

#### 1.2 创建学员
```typescript
// 推断接口
POST /api/students

// 请求体
{
  name: string;
  phone: string;
  grade?: string;
  school?: string;
  classIds?: string[];
}
```

---

### 2. 班级管理 API

#### 2.1 获取班级列表
```typescript
// 推断接口
GET /api/classes

// 请求参数
{
  type?: '一对一' | '寒假班' | '暑假班';
  status?: '在读' | '已结课';
  search?: string;
}

// 响应结构
{
  code: number;
  data: Class[];
}

// Class 类型
interface Class {
  id: number;
  name: string;        // 班级名称
  type: string;        // 班级类型
  status: string;      // 状态
  studentIds: number[];// 学生 ID 列表
}
```

#### 2.2 获取班级详情
```typescript
// 推断接口
GET /api/classes/:id

// 响应结构
{
  code: number;
  data: {
    id: number;
    name: string;
    progress: number;      // 课程进度%
    totalHours: number;    // 总课时
    studentCount: number;  // 学生人数
    startDate: string;     // 开课日期
    homeworkList?: any[];  // 作业列表
    schedule?: any[];      // 课程安排
  };
}
```

---

### 3. 作业管理 API

#### 3.1 获取作业列表
```typescript
// 推断接口
GET /api/homework

// 请求参数
{
  type?: 'exam' | 'daily' | 'checkin' | 'video';
  status?: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  subject?: string;
  classId?: string;
}

// 响应结构
{
  code: number;
  data: Homework[];
}

// Homework 类型
interface Homework {
  id: string;
  name: string;
  type: 'exam' | 'daily' | 'checkin' | 'video';
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  startDate: string;
  endDate: string;
  class: string;
  teacher: string;
  totalStudents: number;
  submitted: number;
  graded: number;
  progress: number;
}
```

#### 3.2 布置作业
```typescript
// 推断接口
POST /api/homework

// 请求体
{
  name: string;
  type: 'exam' | 'daily' | 'checkin' | 'video';
  classId: string;
  content?: any;       // 作业内容
  startDate: string;
  endDate: string;
}
```

---

### 4. 课表管理 API

#### 4.1 获取课程表
```typescript
// 推断接口
GET /api/schedule?year=2026&month=3

// 响应结构
{
  code: number;
  data: Course[];
}

// Course 类型
interface Course {
  id: number;
  title: string;       // 课程名称
  time: string;        // 时间段 09:00-10:30
  location: string;    // 教室
  teacher: string;     // 教师
  day: number;         // 星期几 (1-7)
  hour: number;        // 开始小时
  color: string;       // 显示颜色
}
```

#### 4.2 添加课程
```typescript
// 推断接口
POST /api/schedule

// 请求体
{
  title: string;
  time: string;
  location: string;
  teacherId: string;
  dayOfWeek: number;
  startHour: number;
  duration: number;    // 课时数
}
```

---

### 5. 题库管理 API

#### 5.1 获取系统题库
```typescript
// 推断接口
GET /api/questions/system

// 请求参数
{
  subject?: 'toefl' | 'ielts' | 'sat' | 'act';
  category?: 'reading' | 'listening' | 'writing' | 'speaking';
  difficulty?: 'easy' | 'medium' | 'hard';
}

// 响应结构
{
  code: number;
  data: QuestionBank[];
}

// QuestionBank 类型
interface QuestionBank {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  participation: number;
  correctRate: number;
  medianScore: number | string;
  medianTime: string;
  discrimination: number;
  updateTime: string;
}
```

#### 5.2 获取机构题库
```typescript
// 推断接口
GET /api/questions/org

// 请求参数
{
  subject?: string;
  isShared?: boolean;
}
```

#### 5.3 获取单词书列表
```typescript
// 推断接口
GET /api/questions/words

// 响应结构
{
  code: number;
  data: WordBook[];
}

// WordBook 类型
interface WordBook {
  id: number;
  name: string;
  units: number;
  words: number;
  subject: string;
  creator: string;
  usage: number;
  correctRate: number;
}
```

---

### 6. 教研管理 API

#### 6.1 获取大纲树
```typescript
// 推断接口
GET /api/teaching/outline

// 响应结构（树形）
{
  code: number;
  data: OutlineNode[];
}

// OutlineNode 类型
interface OutlineNode {
  key: string;
  title: string;
  icon?: string;
  children?: OutlineNode[];
}
```

#### 6.2 获取知识点列表
```typescript
// 推断接口
GET /api/teaching/knowledge-points

// 请求参数
{
  subject?: string;
  type?: string;
  scope?: 'all' | 'my' | 'shared';
}
```

---

### 7. 云盘管理 API

#### 7.1 获取文件列表
```typescript
// 推断接口
GET /api/cloud/files?type=my|shared

// 响应结构
{
  code: number;
  data: CloudFile[];
}

// CloudFile 类型
interface CloudFile {
  id: number;
  name: string;
  size: string;
  date: string;
  type: 'file' | 'folder';
  uploader?: string;   // 共享文件有
}
```

#### 7.2 上传文件
```typescript
// 推断接口
POST /api/cloud/upload
Content-Type: multipart/form-data

// 请求体
{
  file: File;
  folderId?: number;
}
```

---

### 8. 申请排课 API

#### 8.1 获取申请列表
```typescript
// 推断接口
GET /api/apply

// 请求参数
{
  status?: 'pending' | 'processed' | 'rejected';
}

// 响应结构
{
  code: number;
  data: ApplyRecord[];
}

// ApplyRecord 类型
interface ApplyRecord {
  id: number;
  campus: string;
  className: string;
  applicant: string;
  applyTime: string;
  note: string;
  status: 'pending' | 'processed' | 'rejected';
  totalHours: number;
  scheduledHours: number;
  processor: string;
  rejectReason: string;
}
```

#### 8.2 提交申请
```typescript
// 推断接口
POST /api/apply

// 请求体
{
  campus: string;
  className: string;
  hours: number;
  note: string;
}
```

#### 8.3 处理申请
```typescript
// 推断接口
POST /api/apply/:id/process

// 请求体
{
  action: 'approve' | 'reject';
  rejectReason?: string;
}
```

---

### 9. 待办事项 API

#### 9.1 获取待办列表
```typescript
// 推断接口
GET /api/todo

// 请求参数
{
  type?: 'homework' | 'report' | 'feedback' | 'visit';
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'completed';
}
```

#### 9.2 完成待办
```typescript
// 推断接口
POST /api/todo/:id/complete
```

---

### 10. 创意中心 API

#### 10.1 获取创意列表
```typescript
// 推断接口
GET /api/ideas

// 响应结构
{
  code: number;
  data: Idea[];
}

// Idea 类型
interface Idea {
  id: number;
  title: string;
  description: string;
  status: 'reviewing' | 'planned' | 'completed';
  votes: number;
  creator: string;
  createTime: string;
}
```

#### 10.2 提交创意
```typescript
// 推断接口
POST /api/ideas

// 请求体
{
  title: string;
  description: string;
}
```

#### 10.3 投票
```typescript
// 推断接口
POST /api/ideas/:id/vote
```

---

### 11. 个人中心 API

#### 11.1 获取用户信息
```typescript
// 推断接口
GET /api/user/profile

// 响应结构
{
  code: number;
  data: {
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    department: string;
    avatar?: string;
  };
}
```

#### 11.2 更新用户信息
```typescript
// 推断接口
PUT /api/user/profile

// 请求体
{
  name: string;
  department: string;
  phone: string;
  email: string;
}
```

#### 11.3 修改密码
```typescript
// 推断接口
PUT /api/user/password

// 请求体
{
  oldPassword: string;
  newPassword: string;
}
```

#### 11.4 上传头像
```typescript
// 推断接口
POST /api/user/avatar
Content-Type: multipart/form-data
```

---

## 全局响应格式

```typescript
// 成功响应
{
  code: 200;
  data: T;
  message?: string;
}

// 错误响应
{
  code: number;  // 错误码
  message: string;
}
```

## 认证头

```typescript
// 所有 API 请求需携带
Authorization: Bearer <jwt_token>
```
