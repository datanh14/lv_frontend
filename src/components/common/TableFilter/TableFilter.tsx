import { FunctionComponent, useEffect } from 'react';
import './TableFilter.scss';
import { ReactComponent as FilterIcon } from '../../../asset/icon/filter.svg';
import { ReactComponent as RefreshIcon } from '../../../asset/icon/Refresh.svg';
import { Form, Input, Button, Space, Col, Row } from 'antd';
import { AppMode } from '../../../const/interface';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';

interface TableFilterProps {
  mode?: AppMode;
  onChangeFilter?: any;
}
const TableFilter: FunctionComponent<TableFilterProps> = ({
  mode = 'desktop',
  onChangeFilter,
}) => {
  const [form] = Form.useForm();
  let colSize = mode === 'mobile' ? 24 : 6;
  const [currentQueryParameters, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryData = {
      name: currentQueryParameters.get('name'),
      phone: currentQueryParameters.get('phone'),
      email: currentQueryParameters.get('email'),
    };
    form.setFieldsValue(queryData);
    onChangeFilter && onChangeFilter(queryData);
  }, []);

  const updateQuery = (values) => {
    const newQueryParameters: URLSearchParams = new URLSearchParams();
    Object.keys(values).forEach((key) => {
      newQueryParameters.set(key, values[key] || '');
    });
    setSearchParams(newQueryParameters);
    onChangeFilter && onChangeFilter(values);
  };

  const onFinish = (values) => {
    updateQuery(values);
  };
  const resetFilter = () => {
    form.resetFields();
    updateQuery({});
  };

  return (
    <div className={clsx('table-filter', mode)}>
      <Form
        form={form}
        layout={mode === 'mobile' ? 'vertical' : 'vertical'}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Row>
          <Col span={colSize}>
            <Form.Item name='name' label='Họ tên'>
              <Input placeholder='Nhập họ tên' />
            </Form.Item>
          </Col>
          <Col span={colSize}>
            <Form.Item name='phone' label='Số điện thoại'>
              <Input placeholder='Nhập số điện thoại' />
            </Form.Item>
          </Col>
          <Col span={colSize}>
            <Form.Item name='email' label='Email'>
              <Input placeholder='Nhập email' />
            </Form.Item>
          </Col>
          <Col span={colSize}>
            <Row className='action-btn'>
              <Form.Item label='s'>
                <Button
                  htmlType='submit'
                  danger
                  type='primary'
                  className='submit-btn btn'
                >
                  <FilterIcon />
                  Lọc
                </Button>
              </Form.Item>
              <Form.Item label='s'>
                <Button
                  onClick={resetFilter}
                  type='text'
                  className='gray-text btn'
                >
                  <RefreshIcon />
                  Bộ lọc
                </Button>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TableFilter;
