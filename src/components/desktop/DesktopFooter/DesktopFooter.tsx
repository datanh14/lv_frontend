import { FunctionComponent } from 'react';
import { RowCS } from '../../common/StyledElements';
import './DesktopFooter.scss';

interface DesktopFooterProps {}
const DesktopFooter: FunctionComponent<DesktopFooterProps> = () => {
  return (
    <RowCS className='desktop-footer'>
      <span>
        Copyright © 2021 <span className='highlight'>Tripi</span>. Powered by{' '}
        <span className='highlight'>Tripi</span> All Right Reserved
      </span>
      <span>Tổng đài chăm sóc miễn phí: 1900 2084 (8h15 - 21h00)</span>
    </RowCS>
  );
};

export default DesktopFooter;
