import { Button, Popover } from "antd";
// import * as React from 'react';
import { FunctionComponent } from "react";
import { ReactComponent as UserIcon } from "../../../asset/icon/user.svg";
import { ReactComponent as ArrowDown } from "../../../asset/icon/arrow_down.svg";
import { Col, Row, RowC, RowCC } from "../StyledElements";
import "./MyAvatar.scss";
import { AppMode } from "../../../const/interface";
import { useDispatch, useSelector } from "react-redux";
import MyImage from "../MyImage/MyImage";
import { TokenKeyName } from "../../../const/constant";
import { useNavigate } from "react-router-dom";
import { setUserInforAction } from "../../../modules/redux/actions/userAction";

interface MyAvatarProps {
  mode?: AppMode;
}
const MyAvatar: FunctionComponent<MyAvatarProps> = ({ mode = "desktop" }) => {
  const userInfo = useSelector((state: any) => state?.user?.userInfo);
  // console.log('userInfo', userInfo);
  const { email, name, profilePhoto } = userInfo || {};
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const UserComponent = userInfo ? (
    <Popover
      placement="bottomRight"
      content={
        <Col>
          <Button
            type="text"
            danger
            style={{ marginTop: 0 }}
            onClick={() => {
              localStorage.setItem(TokenKeyName, "");
              dispatch(setUserInforAction(undefined));
              // navigate('/');
            }}
          >
            Đăng xuất
          </Button>
        </Col>
      }
      overlayClassName="my-popover"
      trigger="click"
    >
      <RowC className="icon-container">
        {userInfo ? (
          <>
            {profilePhoto ? (
              <MyImage className="user-icon" src={profilePhoto} />
            ) : (
              <RowCC className="user-icon round">{(name || email)?.[0]}</RowCC>
            )}
            <ArrowDown />
          </>
        ) : (
          <UserIcon className="user-icon" />
        )}
      </RowC>
    </Popover>
  ) : (
    <RowC className="icon-container">
      <UserIcon className="user-icon" />
      {userInfo && <ArrowDown />}
    </RowC>
  );
  return (
    <Row className="my-avatar">
      {userInfo && mode === "desktop" && (
        <Col className="info">
          <div className="name">{name}</div>
          <div className="email">{email}</div>
        </Col>
      )}
      {UserComponent}
    </Row>
  );
};

export default MyAvatar;
