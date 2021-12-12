import React, { useState } from 'react';
import './App.css';
import { Layout, Avatar, Menu, Breadcrumb, Button } from 'antd';
import Icon from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
// import { Cricketer, ODICareer, Batting, Bowling, TestCareer } from './Cricketer';
// import CareerDetails from './CareerDetails';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [visible, setVisible] = useState(false);
  const onSelect = name => {
    setSelectedPlayer(name);
    setVisible(true);
  }

  const onClose = () => setVisible(false);
  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <Header style={{ padding: 10 }}>
          <Title style={{ color: 'white', textAlign: 'center' }} level={3}>Quản lý thí sinh</Title>
        </Header>
        <Layout>
          <Sider>
            <Menu defaultSelectedKeys={['Dashboard']} mode="inline">
              <Menu.Item key='Dashboard'>
                Dashboard
              </Menu.Item>
              <SubMenu
                title={
                  <span>
                    <Icon type="mail" />
                    <span>Thí sinh</span>
                  </span>
                }
              >
                <Menu.ItemGroup key='examinee'>
                  <Menu.Item key='create-examinee'> Thêm thí sinh</Menu.Item>
                  <Menu.Item key='import-examinee'> Import từ excel</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: '0 50px' }}>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Phần mềm quản lý thí sinh nhập học</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;