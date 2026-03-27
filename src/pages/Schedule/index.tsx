import { useState } from 'react';
import { Card, Button, Space, Badge, Tooltip, Popover, type PopoverProps } from 'antd';
import { LeftOutlined, RightOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Schedule.css';

const WEEK_DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

// 模拟课程数据
const mockCourses = [
  {
    id: 1,
    title: '雅思阅读 L1',
    time: '09:00-10:30',
    location: '教室 A301',
    teacher: 'Robin',
    day: 1,
    hour: 9,
    color: '#3b82f6',
  },
  {
    id: 2,
    title: '托福听力 L2',
    time: '10:45-12:15',
    location: '教室 B202',
    teacher: 'Evelyn',
    day: 1,
    hour: 10,
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: '雅思写作 L3',
    time: '14:00-15:30',
    location: '教室 A305',
    teacher: 'Molly',
    day: 2,
    hour: 14,
    color: '#10b981',
  },
  {
    id: 4,
    title: 'SAT 数学 L1',
    time: '15:45-17:15',
    location: '教室 C101',
    teacher: 'hxx',
    day: 3,
    hour: 15,
    color: '#f59e0b',
  },
  {
    id: 5,
    title: '雅思口语 L2',
    time: '09:00-10:30',
    location: '教室 A302',
    teacher: 'Yoo',
    day: 4,
    hour: 9,
    color: '#ec4899',
  },
  {
    id: 6,
    title: '托福阅读 L4',
    time: '13:30-15:00',
    location: '教室 B203',
    teacher: 'Robin',
    day: 5,
    hour: 13,
    color: '#06b6d4',
  },
];

const Schedule: React.FC = () => {
  const { isDark } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState<typeof mockCourses[0] | null>(null);
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth: firstDayOfMonth === 0 ? 7 : firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getCourseForSlot = (day: number, hour: number) => {
    return mockCourses.find((c) => c.day === day && c.hour === hour);
  };

  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const handlePopoverChange: PopoverProps['onOpenChange'] = (open, courseId) => {
    setOpenPopoverId(open ? courseId : null);
  };

  const renderCoursePopover = (course: typeof mockCourses[0], onClose: () => void) => (
    <div className="course-popover">
      <h4 className="course-title">{course.title}</h4>
      <div className="course-info">
        <span className="info-label">时间:</span>
        <span className="info-value">{course.time}</span>
      </div>
      <div className="course-info">
        <span className="info-label">地点:</span>
        <span className="info-value">{course.location}</span>
      </div>
      <div className="course-info">
        <span className="info-label">教师:</span>
        <span className="info-value">{course.teacher}</span>
      </div>
      <Space className="course-actions">
        <Button
          size="small"
          type="primary"
          onClick={() => {
            setSelectedCourse(course);
            onClose();
          }}
        >
          设置考勤
        </Button>
        <Button size="small">详情</Button>
      </Space>
    </div>
  );

  return (
    <div className="schedule-page">
      <Card className="schedule-card">
        <div className="schedule-header">
          <h2 className="schedule-title">课表管理</h2>
          <div className="schedule-nav">
            <Button icon={<LeftOutlined />} onClick={prevMonth} size="small">
              上个月
            </Button>
            <Button className="today-btn" onClick={goToToday} size="small">
              本月
            </Button>
            <Button icon={<RightOutlined />} onClick={nextMonth} size="small">
              下个月
            </Button>
            <span className="current-month">
              {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
            </span>
          </div>
          <Button type="primary" icon={<PlusOutlined />}>
            添加课程
          </Button>
        </div>

        <div className="calendar-wrapper">
          <div className="calendar-header">
            <div className="calendar-time-col"></div>
            {WEEK_DAYS.map((day, index) => (
              <div key={index} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-body">
            <div className="calendar-time-column">
              {hours.map((hour) => (
                <div key={hour} className="time-slot">
                  {hour.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>

            <div className="calendar-grid">
              {WEEK_DAYS.map((_, dayIndex) => (
                <div key={dayIndex} className="calendar-day-column">
                  {hours.map((hour) => {
                    const course = getCourseForSlot(dayIndex + 1, hour);
                    return (
                      <div key={hour} className="calendar-cell">
                        {course && course.hour === hour && (
                          <Popover
                            content={renderCoursePopover(course, () => setOpenPopoverId(null))}
                            title={null}
                            trigger="click"
                            placement="topLeft"
                            open={openPopoverId === course.id}
                            onOpenChange={(open) => handlePopoverChange(open, course.id)}
                            overlayClassName="course-popover-overlay"
                          >
                            <div className="course-badge-wrapper" style={{ cursor: 'pointer' }}>
                              <Badge
                                color={course.color}
                                text={`${course.title}\n${course.time}`}
                                className="course-badge"
                                style={{
                                  background: course.color,
                                  borderColor: course.color,
                                }}
                              />
                            </div>
                          </Popover>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 考勤设置弹窗 */}
      {selectedCourse && (
        <div className="attendance-modal">
          <Card className="attendance-card">
            <div className="attendance-header">
              <h3>设置考勤 - {selectedCourse.title}</h3>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setSelectedCourse(null)}
              />
            </div>
            <div className="attendance-content">
              <p>考勤设置功能敬请期待...</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Schedule;
