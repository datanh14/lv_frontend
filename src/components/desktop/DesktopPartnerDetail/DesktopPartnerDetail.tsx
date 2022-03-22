import React, { FunctionComponent, useCallback, useState } from 'react';
import { AppMode } from '../../../const/interface';
import './DesktopPartnerDetail.scss';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {
  getPartnerList,
  importFile,
  postUploadFile,
} from '../../../service/partner.service';
import axios from 'axios';
interface DesktopPartnerDetailProps {
  mode?: AppMode;
}

const DesktopPartnerDetail: FunctionComponent<DesktopPartnerDetailProps> = ({
  mode = 'desktop',
}) => {
  const [fileList, setFileList] = React.useState<any>([]);
  function getBase64(file) {
    console.log('file', file);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  const handleChange = async (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    const a = await getBase64(info.file.originFileObj);
    console.log('getBase64', a);
    a && pushData(a);
    setFileList(fileList);
  };
  const pushData = async (data) => {
    const response = await importFile({ file: data, extension: 'xls' });
    if (response?.data?.code === 200) {
      return true;
    }
  };
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: false,
  };
  return (
    <>
      <button>check</button>
      <Upload {...props} fileList={fileList}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
};

export default DesktopPartnerDetail;
