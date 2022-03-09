import { Breadcrumb, Col, Row } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ReactComponent as Cancel } from "../../../asset/icon/cancel.svg";
import { ReactComponent as Done } from "../../../asset/icon/done.svg";
import { AppMode } from "../../../const/interface";
import { routesPath } from "../../../const/routerPath";
import { getPartnerDetail } from "../../../service/partner.service";
import { numberWithCommas } from "../../../utils/helpers";
import MyTable from "../../common/MyTable/MyTable";
import "./DesktopPartnerDetail.scss";

interface DesktopPartnerDetailProps {
  mode?: AppMode;
}
const DesktopPartnerDetail: FunctionComponent<DesktopPartnerDetailProps> = ({
  mode = "desktop",
}) => {
  const [currentQueryParameters] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const { affiliationInfo } = data || {};
  const { userInfo, id, currentLevel, approvedTime } = affiliationInfo || {};
  const { name, email, bankAccount } = userInfo || {};

  const columns: any = [
    {
      title: "Tháng",
      dataIndex: "month",
      width: 120,
    },
    {
      title: "Doanh thu (VNĐ)",
      dataIndex: "gmv",
      render(v) {
        return numberWithCommas(v);
      },
    },
    {
      title: "Hoa hồng (VNĐ)",
      dataIndex: "commission",
      render(v) {
        return numberWithCommas(v);
      },
    },
    {
      title: <div>Trạng thái</div>,
      dataIndex: "paymentStatus",
      fixed: mode === "desktop" ? "right" : undefined,
      render: (status, record) => (
        <div className="status-col ">
          {status === "paid" && (
            <>
              <Done />
              <div className="test">Đã thanh toán</div>
            </>
          )}
          {status === "waiting_for_payment" && (
            <>
              <Cancel />
              Chưa thanh toán
            </>
          )}
        </div>
      ),
    },
  ];
  const colSize = mode === "mobile" ? 24 : 8;

  useEffect(() => {
    const id = currentQueryParameters.get("affiliationInfoId");
    if (!id) {
      return;
    }
    setLoading(true);
    const req = getPartnerDetail(id);
    const exe = async () => {
      try {
        const response = await req;
        if (response?.data?.code === 200) {
          setData(response?.data?.data);
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

  return (
    <div className="desktop-partner-detail">
      <div>
        <Breadcrumb separator={">"}>
          <Breadcrumb.Item className="title-root">
            <Link to="/partner/active">Đối tác hiện tại</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="dest">Chi tiết đối tác</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="dest-zone">
          <Col span={colSize} className="item">
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                CID:
              </Col>
              <Col span={12}>{id}</Col>
            </Row>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Họ và tên:
              </Col>
              <Col span={12}>{name}</Col>
            </Row>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Số điện thoại:
              </Col>
              <Col span={12}>{email}</Col>
            </Row>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Email:
              </Col>
              <Col span={12}>{email}</Col>
            </Row>
          </Col>
          <Col span={colSize} className="item">
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Ngân hàng:
              </Col>
              <Col span={12}>{bankAccount?.bankName}</Col>
            </Row>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Chủ Tài khoản:
              </Col>
              <Col span={12}>{bankAccount?.accountName}</Col>
            </Row>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Số tài khoản:
              </Col>
              <Col span={12}>{bankAccount?.accountNumber}</Col>
            </Row>
          </Col>
          <Col span={colSize}>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Level:
              </Col>
              <Col span={12}>{currentLevel}</Col>
            </Row>
            <Row className="row-dest">
              <Col span={12} className="title-dest">
                Ngày duyệt:
              </Col>
              <Col span={12}>{approvedTime}</Col>
            </Row>
          </Col>
        </Row>
        <div className="name-table">Doanh thu theo tháng</div>
        <MyTable
          columns={columns}
          dataSource={data?.revenueDetailList || []}
          rowKey={(item) => item.month}
          scroll={mode === "desktop" ? { y: "calc(100vh - 440px)" } : {}}
          loading={loading}
        />
      </div>
      <Link to={`${routesPath.partnerActive}`}>
        <div className="back-text">Quay lại</div>
      </Link>
    </div>
  );
};

export default DesktopPartnerDetail;
