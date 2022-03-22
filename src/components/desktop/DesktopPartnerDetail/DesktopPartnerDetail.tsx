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
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    console.log('hehehehe');
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const handleSubmission = async () => {
    const a = await toBase64(selectedFile);
    pushData(a);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const pushData = async (data) => {
    const response = await importFile({ file: data, extension: 'xls' });
    if (response?.data?.code === 200) {
      return true;
    }
  };

  return (
    <>
      <div>
        <input type='file' name='file' onChange={changeHandler} />
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default DesktopPartnerDetail;
