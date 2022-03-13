import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AppMode } from '../../../const/interface';
import { getRegisterPartnerList } from '../../../service/partner.service';
// import { data } from "./mockup";
import MyTable from '../../common/MyTable/MyTable';
import './DesktopPartnerRegister.scss';
interface DesktopPartnerRegisterProps {
  mode?: AppMode;
}
const DesktopPartnerRegister: FunctionComponent<
  DesktopPartnerRegisterProps
> = ({ mode = 'desktop' }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: 'Combination',
      dataIndex: 'combination',
      width: 150,
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      width: 150,
    },
    {
      title: 'Conduct',
      dataIndex: 'conduct',
      width: 150,
    },
    {
      title: 'Admission',
      dataIndex: 'admission',
      width: 150,
    },
    {
      title: 'IdentifyNumber',
      dataIndex: 'identifyNumber',
      width: 150,
    },
    {
      title: 'FullName',
      dataIndex: 'fullName',
      width: 150,
    },
    {
      title: 'DayOfBirth',
      dataIndex: 'dayOfBirth',
      width: 150,
    },
    {
      title: 'FirstSubjectCode',
      dataIndex: 'firstSubjectCode',
      width: 150,
    },
    {
      title: 'FirstSubjectScore',
      dataIndex: 'firstSubjectScore',
      width: 150,
    },
    {
      title: 'SecondSubjectCode',
      dataIndex: 'secondSubjectCode',
      width: 150,
    },
    {
      title: 'SecondSubjectScore',
      dataIndex: 'secondSubjectScore',
      width: 150,
    },
    {
      title: 'ThirdSubjectCode',
      dataIndex: 'thirdSubjectCode',
      width: 150,
    },
    {
      title: 'ThirdSubjectScore',
      dataIndex: 'thirdSubjectScore',
      width: 150,
    },
    {
      title: 'HighSchoolScore',
      dataIndex: 'highSchoolScore',
      width: 150,
    },
    {
      title: 'AspirationNumber',
      dataIndex: 'aspirationNumber',
      width: 150,
    },
  ];

  const getData = async (data) => {
    const req = getRegisterPartnerList(data);
    const exe = async () => {
      const response = await req;
      if (response?.status === 200) {
        setData(response?.data?.data || []);
        setTotal(response?.data?.totalPage);
        return true;
      }
    };
    return await exe();
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    const req = getRegisterPartnerList();
    const exe = async () => {
      try {
        const response = await req;
        console.log('response', response);

        if (response?.status === 200) {
          setData(response?.data?.data || []);
          setTotal(response?.data?.totalPage);
        }
      } catch (error) {}
      setLoading(false);
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = async (pagination) => {
    const { current } = pagination;
    console.log('current', current);
    setLoading(true);
    const result = await getData({ current: current - 1, ...filter });
    setLoading(false);
    console.log('result', result);

    if (result) {
      setCurrent(current - 1);
    }
  };
  console.log('data', data);

  return (
    <div className='desktop-partner-register'>
      <div className='title'>Quản lí thí sinh</div>
      <MyTable
        columns={columns}
        dataSource={data}
        rowKey={(item) => item.id}
        scroll={mode === 'desktop' ? { y: 'calc(100vh )' } : {}}
        pagination={{
          total,
          pageSize: 10,
          current: current + 1,
          showSizeChanger: false,
        }}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};

export default DesktopPartnerRegister;
