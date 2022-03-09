import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "antd";
import { ReactComponent as EyeIcon } from "../../../asset/icon/Eye.svg";
import MyTable from "../../common/MyTable/MyTable";
import TableFilter from "../../common/TableFilter/TableFilter";
import "./DesktopPartnerActive.scss";
import { Link } from "react-router-dom";
import { routesPath } from "../../../const/routerPath";
import { AppMode } from "../../../const/interface";
import { getPartnerList } from "../../../service/partner.service";
import { numberWithCommas } from "../../../utils/helpers";

interface DesktopPartnerActiveProps {
  mode?: AppMode;
}
const DesktopPartnerActive: FunctionComponent<DesktopPartnerActiveProps> = ({
  mode = "desktop",
}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      // width: 100,
    },
    {
      title: "Họ và tên",
      dataIndex: "userInfo",
      key: "name",
      // width: 150,
      render(v) {
        return v?.name;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "userInfo",
      key: "sdt",
      // width: 120,
      render(v) {
        return v?.email?.indexOf("@") === -1 ? v?.email : "";
      },
    },
    {
      title: "Email",
      dataIndex: "userInfo",
      key: "email",
      // width: 150,
      render(v) {
        return v?.email?.indexOf("@") > -1 ? v?.email : "";
      },
    },
    {
      title: "GMV",
      dataIndex: "currentGMV",
      // width: 100,
      render(v) {
        return numberWithCommas(Math.round(v));
      },
    },
    {
      title: "Level",
      dataIndex: "currentLevel",
      // width: 60,
    },
    {
      title: "Ngày duyệt",
      dataIndex: "approvedTime",
      render(v) {
        return new Date(v).toLocaleDateString();
      },
      // width: 120,
    },
    {
      title: <div style={{ textAlign: "center" }}>Hành động</div>,
      key: "action",
      width: 150,
      fixed: mode === "desktop" ? "right" : undefined,
      render: (v, record) => (
        <Link
          to={`${routesPath.partnerActiveDetail}?affiliationInfoId=${record?.id}`}
        >
          <Button type="text" className="btn detail-btn">
            <EyeIcon />
            Xem chi tiết
          </Button>
        </Link>
      ),
    },
  ];

  const getData = async (data) => {
    const req = getPartnerList(data);
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
  useEffect(() => {
    setLoading(true);
    const req = getPartnerList(filter);
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
    <div className="desktop-partner-active">
      <TableFilter mode={mode} onChangeFilter={onChangeFilter} />
      <div className="title">Đối tác hiện tại</div>
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

export default DesktopPartnerActive;
