import React, { FunctionComponent, useCallback, useState } from 'react';
import { AppMode } from '../../../const/interface';
import './DesktopPartnerDetail.scss';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { importFile, postUploadFile } from '../../../service/partner.service';
import axios from 'axios';
interface DesktopPartnerDetailProps {
  mode?: AppMode;
}
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log('checker', file);
    }
  },
};

const DesktopPartnerDetail: FunctionComponent<DesktopPartnerDetailProps> = ({
  mode = 'desktop',
}) => {
  const [file, setFile] = React.useState<any>();
  const [fileList, setFileList] = React.useState<any>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);
  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    fileUpload(file);
  };
  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };
  const fileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', fileList[0]);
    console.log('formData', formData, file);
    const req = postUploadFile({ file: formData });
    const exe = async () => {
      try {
        const response = await req;
        console.log('response1', response);

        if (response?.status === 200) {
        }
      } catch (error) {}
    };
    exe();
    return () => {
      if (req.isCancelable()) {
        req.cancel();
      }
    };
  };
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log('file', file);
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: false,
  };

  const ImportFileLocal = async () => {
    const data = new FormData();
    data.append('file', fileList[0]);
    const req = await importFile({ file: '1' });
    if (req?.status === 200) {
    }
  };

  return (
    <>
      <Upload {...props} fileList={fileList}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button onClick={() => ImportFileLocal()}>a</Button>
    </>
  );
};

export default DesktopPartnerDetail;
