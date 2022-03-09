import { FunctionComponent } from 'react';
import './MyLoading.scss';

interface MyLoadingProps {}
const MyLoading: FunctionComponent<MyLoadingProps> = () => {
  return (
    <div className='my-loading'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MyLoading;
