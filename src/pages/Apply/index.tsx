import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import './Apply.css';

const { Option } = Select;
const { TextArea } = Input;

// 模拟申请数据
const applyData = [
  {
    id: 1,
    campus: '北京校区',
    className: '雅思基础 315 班',
    applicant: 'Robin',
    applyTime: '2026-03-25 10:30',
    note: '需要安排周一至周五下午的课程',
    status: 'pending',
    totalHours: 60,
    scheduledHours: 30,
    processor: '-',
    rejectReason: '-',
  },
  {
    id: 2,
    campus: '上海校区',
    className: '托福强化班',
    applicant: 'Evelyn',
    applyTime: '2026-03-24 14:20',
    note: '周末班课程安排',
    status: 'processed',
    totalHours: 40,
    scheduledHours: 40,
    processor: '管理员',
    rejectReason: '-',
  },
  {
    id: 3,
    campus: '广州校区',
    className: 'SAT 冲刺班',
    applicant: 'Molly',
    applyTime: '2026-03-23 09:15',
    note: '急需安排考前冲刺课程',
    status: 'rejected',
    totalHours: 30,
    scheduledHours: 0,
    processor: '管理员',
    rejectReason: '教室资源紧张，请调整时间',
  },
];

const Apply: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      pending: { color: 'warning', text: '待处理' },
      processed: { color: 'success', text: '已处理' },
      rejected: { color: 'error', text: '已驳回' },
    };
    const { color, text } = statusMap[status] || { color: 'default', text: status };
    return <Tag color={color}>{text}</Tag>;
  };

  const columns = [
    {
      title: '校区',
      dataIndex: 'campus',
      key: 'campus',
      width: 100,
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
      width: 180,
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
      width: 80,
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      width: 160,
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
      width: 200,
      ellipsis: true,
    },
    {
      title: '状态',
      key: 'status',
      width: 100,
      render: (_: any, record: any) => getStatusTag(record.status),
    },
    {
      title: '课时',
      key: 'hours',
      width: 100,
      render: (_: any, record: any) => `${record.scheduledHours}/${record.totalHours}`,
    },
    {
      title: '处理人',
      dataIndex: 'processor',
      key: 'processor',
      width: 80,
    },
    {
      title: '驳回原因',
      dataIndex: 'rejectReason',
      key: 'rejectReason',
      width: 150,
      ellipsis: true,
      render: (text: string) => text === '-' ? '-' : <span className="reject-reason">{text}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          {record.status === 'pending' && (
            <>
              <Button type="link" size="small" icon={<CheckCircleOutlined />} className="text-success">
                通过
              </Button>
              <Button type="link" size="small" icon={<CloseCircleOutlined />} className="text-error">
                驳回
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleApply = () => {
    form.validateFields().then((values) => {
      message.success('申请提交成功');
      setIsModalOpen(false);
      form.resetFields();
    }).catch(() => {});
  };

  return (
    <div className="apply-page">
      <Card className="apply-card">
        <div className="apply-header">
          <h2 className="apply-title">
            <FileTextOutlined /> 申请排课
          </h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            申请排课
          </Button>
        </div>

        <div className="apply-filters">
          <Space>
            <span className="filter-label">状态筛选：</span>
            <Space>
              <Button
                type={selectedStatus === 'all' ? 'primary' : 'default'}
                size="small"
                onClick={() => setSelectedStatus('all')}
              >
                全部
              </Button>
              <Button
                type={selectedStatus === 'pending' ? 'primary' : 'default'}
                size="small"
                onClick={() => setSelectedStatus('pending')}
              >
                待处理
              </Button>
              <Button
                type={selectedStatus === 'processed' ? 'primary' : 'default'}
                size="small"
                onClick={() => setSelectedStatus('processed')}
              >
                已处理
              </Button>
              <Button
                type={selectedStatus === 'rejected' ? 'primary' : 'default'}
                size="small"
                onClick={() => setSelectedStatus('rejected')}
              >
                已驳回
              </Button>
            </Space>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={applyData.filter((item) => selectedStatus === 'all' || item.status === selectedStatus)}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 申请排课弹窗 */}
      <Modal
        title="申请排课"
        open={isModalOpen}
        onOk={handleApply}
        onCancel={() => setIsModalOpen(false)}
        cancelText="取消"
        okText="提交申请"
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item
            name="campus"
            label="校区"
            rules={[{ required: true, message: '请选择校区' }]}
          >
            <Select placeholder="请选择校区">
              <Option value="beijing">北京校区</Option>
              <Option value="shanghai">上海校区</Option>
              <Option value="guangzhou">广州校区</Option>
              <Option value="shenzhen">深圳校区</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="className"
            label="班级"
            rules={[{ required: true, message: '请选择或输入班级' }]}
          >
            <Select placeholder="请选择班级" showSearch allowClear>
              <Option value="ielts-315">雅思基础 315 班</Option>
              <Option value="ielts-307">雅思强化 307 班</Option>
              <Option value="toefl-advanced">托福强化班</Option>
              <Option value="sat-sprint">SAT 冲刺班</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="hours"
            label="课时数"
            rules={[{ required: true, message: '请输入课时数' }]}
          >
            <Input type="number" placeholder="请输入课时数" />
          </Form.Item>
          <Form.Item
            name="note"
            label="备注"
            rules={[{ required: true, message: '请输入备注' }]}
          >
            <TextArea rows={4} placeholder="请说明课程安排需求..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Apply;
