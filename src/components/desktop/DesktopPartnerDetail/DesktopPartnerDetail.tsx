import React, { FunctionComponent, useCallback, useState } from 'react';
import { AppMode } from '../../../const/interface';
import './DesktopPartnerDetail.scss';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { postUploadFile } from '../../../service/partner.service';
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
  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    fileUpload(file);
  };

  const fileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('formData', formData,file);
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
  return (
    <form onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input type='file' onChange={onChange} />
      <button type='submit'>Upload</button>
    </form>
    // <>
    //   <Upload {...props}>
    //     <Button icon={<UploadOutlined />}>Upload</Button>
    //   </Upload>
    // </>
  );
};

export default DesktopPartnerDetail;
