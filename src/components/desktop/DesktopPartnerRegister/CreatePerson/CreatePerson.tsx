import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import 'antd/dist/antd.css';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { some } from '../../../../const/keyString';
import {
  actionCreatePerson,
  getMajor,
  getPriorities,
  getProvince,
  getRaces,
  getRegions,
} from '../../../../service/partner.service';
import './CreatePerson.scss';
const { Option } = Select;
interface CreatePersonProps {
  fetchData: any;
}
const CreatePerson: FunctionComponent<CreatePersonProps> = ({ fetchData }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const [form] = Form.useForm();
  const [major, setMajor] = React.useState([]);
  const [provinces, setProvinces] = React.useState<some[]>([]);
  const [district, setDistrict] = React.useState<some[]>([]);
  const [regions, setRegions] = React.useState<some[]>([]);
  const [races, setRaces] = React.useState<some[]>([]);
  const [priorities, setPriorities] = React.useState<some[]>([]);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const fetchDataMajor = useCallback(() => {
    const req = getMajor();
    const exe = async () => {
      try {
        const response = await req;
        console.log('response1', response);

        if (response?.status === 200) {
          setMajor(response?.data);
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  const fetchDataProvince = useCallback(() => {
    const req = getProvince();
    const exe = async () => {
      try {
        const response = await req;
        console.log('response1', response);

        if (response?.status === 200) {
          setProvinces(response?.data);
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  const fetchDataRegions = useCallback(() => {
    const req = getRegions();
    const exe = async () => {
      try {
        const response = await req;
        console.log('response1', response);

        if (response?.status === 200) {
          setRegions(response?.data);
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  const fetchDataRaces = useCallback(() => {
    const req = getRaces();
    const exe = async () => {
      try {
        const response = await req;
        console.log('response1', response);

        if (response?.status === 200) {
          setRaces(response?.data);
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  const fetchDataPriorities = useCallback(() => {
    const req = getPriorities();
    const exe = async () => {
      try {
        const response = await req;
        console.log('response1', response);

        if (response?.status === 200) {
          setPriorities(response?.data);
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  const fetchCreatePerson = useCallback((data) => {
    const req = actionCreatePerson(data);
    const exe = async () => {
      try {
        const response = await req;
        if (response?.status === 200) {
          fetchData();
          handleCancel();
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    fetchCreatePerson({
      ...values,
      firstSubjectScore: parseFloat(values?.firstSubjectScore),
      secondSubjectScore: parseFloat(values?.secondSubjectScore),
      thirdSubjectScore: parseFloat(values?.thirdSubjectScore),
      highSchoolScore: parseFloat(values?.highSchoolScore),
      matriculationScore: parseFloat(values?.matriculationScore),
      plusScore: parseFloat(values?.plusScore),
      dayOfBirth: values?.dayOfBirth.format('DD-MM-YYYY'),
    });
  };
  useEffect(() => {
    fetchDataMajor();
    fetchDataProvince();
    fetchDataRegions();
    fetchDataRaces();
    fetchDataPriorities();
  }, [
    fetchDataMajor,
    fetchDataProvince,
    fetchDataRegions,
    fetchDataRaces,
    fetchDataPriorities,
  ]);

  return (
    <div className='create-person' style={{ marginBottom: 20 }}>
      <Button type='primary' onClick={showModal}>
        Tạo mới
      </Button>
      <Modal
        title='Tạo mới'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[<div></div>]}
      >
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item name='code' label='Code'>
            <Input />
          </Form.Item>
          <Form.Item name='phone' label='Phone'>
            <Input />
          </Form.Item>
          <Form.Item name='combination' label='Combination'>
            <Input />
          </Form.Item>
          <Form.Item name='classification' label='Phân loại'>
            <Input />
          </Form.Item>
          <Form.Item name='conduct' label='Hạnh kiểm'>
            <Input />
          </Form.Item>
          <Form.Item name='admission' label='Admission'>
            <Input />
          </Form.Item>
          <Form.Item name='identifyNumber' label='IdentifyNumber'>
            <Input />
          </Form.Item>
          <Form.Item name='fullName' label='Họ và tên'>
            <Input />
          </Form.Item>
          <Form.Item name='dayOfBirth' label='Ngày sinh'>
            <DatePicker />
          </Form.Item>
          <Form.Item name='firstSubjectCode' label='FirstSubjectCode'>
            <Input />
          </Form.Item>
          <Form.Item name='firstSubjectScore' label='FirstSubjectScore'>
            <Input />
          </Form.Item>
          <Form.Item name='secondSubjectCode' label='SecondSubjectCode'>
            <Input />
          </Form.Item>
          <Form.Item name='secondSubjectScore' label='SecondSubjectScore'>
            <Input />
          </Form.Item>
          <Form.Item name='thirdSubjectCode' label='ThirdSubjectCode'>
            <Input />
          </Form.Item>
          <Form.Item name='thirdSubjectScore' label='ThirdSubjectScore'>
            <Input />
          </Form.Item>
          <Form.Item name='ighSchoolScore' label='HighSchoolScore'>
            <Input />
          </Form.Item>
          <Form.Item name='aspirationNumber' label='AspirationNumber'>
            <Input />
          </Form.Item>
          <Form.Item name='matriculationScore' label='MatriculationScore'>
            <Input />
          </Form.Item>
          <Form.Item name='plusScore' label='PlusScore'>
            <Input />
          </Form.Item>
          <Form.Item name='gender' label='Gender'>
            <Select placeholder='Chọn giới tính'>
              <Option value='Nam'>Nam</Option>
              <Option value='Nữ'>Nữ</Option>
              <Option value='other'>Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item name='majorId' label='Ngành'>
            <Select placeholder='Chọn ngành'>
              {major?.map((v: some, i) => (
                <Option value={v?.id}>{v?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='provinceId' label='Tỉnh'>
            <Select
              placeholder='Chọn tỉnh/thành phố'
              onSelect={(value, option) =>
                setDistrict(provinces[value - 1]?.districts)
              }
            >
              {provinces?.map((v: some, i) => (
                <Option value={v?.id}>{v?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='districtId' label='Quận huyện'>
            <Select
              placeholder='Chọn quận/huyện'
              // onSelect={(value, option) => setDistrict(provinces[value - 1])}
            >
              {district?.map((v: some, i) => (
                <Option value={v?.id}>{v?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='regionId' label='Khu vực'>
            <Select
              placeholder='Chọn khu vực'
              // onSelect={(value, option) => setDistrict(provinces[value - 1])}
            >
              {regions?.map((v: some, i) => (
                <Option value={v?.id}>{v?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='raceId' label='Dân tộc'>
            <Select
              placeholder='Chọn dân tộc'
              // onSelect={(value, option) => setDistrict(provinces[value - 1])}
            >
              {races?.map((v: some, i) => (
                <Option value={v?.id}>{v?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='priorityId' label='Đối tượng ưu tiên'>
            <Select
              placeholder='Chọn đối tượng ưu tiên'
              // onSelect={(value, option) => setDistrict(provinces[value - 1])}
            >
              {priorities?.map((v: some, i) => (
                <Option value={v?.id}>{v?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePerson;
