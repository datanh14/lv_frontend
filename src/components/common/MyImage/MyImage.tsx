import * as React from 'react';
import { FunctionComponent } from 'react';
import clsx from 'clsx';
import './MyImage.scss';
import { ImageConfig } from '../../../const/ImageConfig';

interface MyImageProps {
  style?: any;
  src?: string;
  alt?: string;
  className?: string;
  width?: any;
  height?: any;
}
const MyImage: FunctionComponent<MyImageProps> = (props) => {
  const { src = '', alt, className, style, ...rest } = props;
  return (
    <img
      alt={alt || ''}
      className={clsx('my-image', className)}
      style={style}
      src={ImageConfig[src] || src}
      {...rest}
    />
  );
};

export default MyImage;
