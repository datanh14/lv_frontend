// import React from 'react';
import styled from 'styled-components';
// import { GREY_100, GREY_500, PRIMARY, RED } from '@styles/configs/colors';

//?-------------- variables ------------------//
const gray = '#677072';
const Grey = '#677072';
const Grey900 = '#0b0c0d';
const Grey600 = '#3f4445';
const Grey3 = '#d9dbdc';
const Grey2 = '#b2b8b9';
const pink = '#ff1284';
const Pink300 = '#ff1284';
const twelve = '0.86rem';
const f16 = '1.143rem';
const f14 = '1rem';
const f10 = '0.7142857142857143rem';
const f24 = '1.7142857142857142rem';

export const redMark = <span style={{ color: 'red' }}>*</span>;

export const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: const  {GREY_100};
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: const  {GREY_100};
`;

export const Wrapper = styled.div`
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 300ms;
  min-width: 100%;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const DivC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const RowAS = styled.div`
  display: flex;
  align-items: start;
`;

export const RowC = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const RowCC = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RowCS = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const RowSS = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ColC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ColAC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FieldDiv = styled.div`
  margin-right: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MobileMaxDiv = styled.div`
  margin: auto;
  max-width: 500px;
`;

//?-------------- for title element -----------------//

export const SpGreyCer = styled.span`
  font-size: 1rem;
  color: ${Grey};
  text-align: center;
`;
export const Sp16Grey = styled.span`
  font-size: ${f16};
  color: ${Grey};
`;
export const Sp16GreyCer = styled.span`
  font-size: ${f16};
  color: ${Grey};
  text-align: center;
`;
export const Sp14GreyCer = styled.span`
  font-size: ${f14};
  color: ${Grey};
  text-align: center;
`;
export const Sp14Grey600Cer = styled.span`
  font-size: ${f14};
  color: ${Grey600};
  text-align: center;
`;
export const Sp24Grey900Cer = styled.span`
  font-size: ${f24};
  color: ${Grey900};
  text-align: center;
`;
export const Sp24Bold = styled.span`
  font-size: ${f24};
  font-weight: 600;
`;
export const Sp14Grey900Cer = styled.span`
  font-size: 1rem;
  color: ${Grey900};
  text-align: center;
`;
export const SpC = styled.span`
  text-align: center;
`;
export const Sp16C = styled.span`
  text-align: center;
  font-size: ${f16};
`;

export const Flex1 = styled.div`
  flex: 1;
`;

interface DateMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  placeholder: string;
}

export const SGray = styled.div`
  font-size: 0.86rem;
  color: ${Grey};
`;
