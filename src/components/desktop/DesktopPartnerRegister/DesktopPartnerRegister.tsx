import { Button, Popconfirm } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ReactComponent as AcceptIcon } from "../../../asset/icon/Accept.svg";
import { ReactComponent as DeleteIcon } from "../../../asset/icon/Delete.svg";
import { AppMode } from "../../../const/interface";
import {
  getApprovedAccount,
  getRegisterPartnerList,
} from "../../../service/partner.service";
import { openNotificationWithIcon } from "../../../utils/helpers";
// import { data } from "./mockup";
import MyTable from "../../common/MyTable/MyTable";
import { Row } from "../../common/StyledElements";
import TableFilter from "../../common/TableFilter/TableFilter";
import "./DesktopPartnerRegister.scss";
interface DesktopPartnerRegisterProps {
  mode?: AppMode;
}
const DesktopPartnerRegister: FunctionComponent<
  DesktopPartnerRegisterProps
> = ({ mode = "desktop" }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 100,
    },
    {
      title: <div style={{ paddingLeft: 20 }}>Hành động</div>,
      key: "action",
      fixed: mode === "desktop" ? "right" : undefined,
      width: 210,
      render: (text, record) => (
        <Row>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            okText="Chắc chắn"
            cancelText="Hủy"
            onConfirm={() => {
              acctionApprovedAccount({
                requestId: record?.id,
                status: "REJECTED",
              });
            }}
          >
            <Button type="text" className="btn delete-btn">
              <DeleteIcon />
              Xóa
            </Button>
          </Popconfirm>
          {record?.status !== "APPROVED" && (
            <Popconfirm
              title="Bạn chắc chắn muốn phê duyệt?"
              okText="Chắc chắn"
              cancelText="Hủy"
              onConfirm={() => {
                acctionApprovedAccount({
                  requestId: record?.id,
                  status: "APPROVED",
                });
              }}
            >
              <Button
                type="text"
                className="btn accept-btn"
                onClick={() => {
                  console.log("record", record);
                }}
              >
                <AcceptIcon />
                Phê duyệt
              </Button>{" "}
            </Popconfirm>
          )}
        </Row>
      ),
    },
  ];

  const getData = async (data) => {
    const req = getRegisterPartnerList(data);
    const exe = async () => {
      const response = await req;
      if (response?.data?.code === 200) {
        setData(response?.data?.data?.items || []);
        setTotal(response?.data?.data?.total);
        return true;
      }
    };
    return await exe();
  };
  const acctionApprovedAccount = async (data) => {
    const req = getApprovedAccount(data);
    const exe = async () => {
      const response = await req;
      console.log("first", response?.data);
      if (response?.data?.code === 200) {
        openNotificationWithIcon("success", "", response?.data?.message);
        fetchData();
        return true;
      } else {
        openNotificationWithIcon("error", "", response?.data?.message);
      }
    };
    return await exe();
  };
  const fetchData = useCallback(() => {
    setLoading(true);
    const req = getRegisterPartnerList(filter);
    const exe = async () => {
      try {
        const response = await req;
        if (response?.data?.code === 200) {
          setData(response?.data?.data?.items || []);
          setTotal(response?.data?.data?.total);
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
  }, [filter]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onChange = async (pagination) => {
    const { current } = pagination;
    setLoading(true);
    const result = await getData({ current: current - 1, ...filter });
    setLoading(false);
    if (result) {
      setCurrent(current - 1);
    }
  };

  const onChangeFilter = async (values) => {
    setFilter(values);
  };

  return (
    <div className="desktop-partner-register">
      <TableFilter mode={mode} onChangeFilter={onChangeFilter} />
      <div className="title">Tài khoản đăng ký</div>
      <MyTable
        columns={columns}
        dataSource={data}
        rowKey={(item) => item.id}
        scroll={mode === "desktop" ? { y: "calc(100vh - 440px)" } : {}}
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
