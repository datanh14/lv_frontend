import { FunctionComponent } from 'react';
import './LeftMenu.scss';
import { Menu } from 'antd';
import { menuData } from './menu';
import { useLocation, Link } from 'react-router-dom';

const { SubMenu } = Menu;

interface LeftMenuProps {}
const LeftMenu: FunctionComponent<LeftMenuProps> = () => {
  const { pathname } = useLocation();

  const handleClick = (e) => {
    // console.log('click ', e);
  };
  const openKeys: Array<string> = [];
  menuData.forEach((item) => {
    const { keys = [], url, title } = item;
    if ((url || title) && keys?.indexOf(pathname) > -1) {
      openKeys.push(url || title);
    }
  });

  return (
    <div className='left-menu'>
      <Menu
        className='left-menu'
        onClick={handleClick}
        // defaultSelectedKeys={['1']}
        selectedKeys={[pathname]}
        defaultOpenKeys={openKeys}
        mode='inline'
      >
        {menuData.map((item) => {
          const { title, icon, url = '', children } = item;
          const props = {
            key: url || title,
            icon,
            title,
          };
          if (!children) {
            return (
              <Menu.Item {...props}>
                <Link to={url}>{title}</Link>
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu {...props}>
                {children.map((i) => (
                  <Menu.Item key={i.url || i.title} {...i}>
                    <Link to={i.url}>{i.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
        })}
      </Menu>
    </div>
  );
};

export default LeftMenu;
