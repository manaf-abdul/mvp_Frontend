import { AppstoreOutlined, MailOutlined, SettingOutlined,UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

const items = [
  {
    label: (<NavLink to='/home'>Home</NavLink>),
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: (<NavLink to='/home'>Chat</NavLink>),
    key: 'chat',
    icon: <AppstoreOutlined />,
    disabled: false,
  },
  {
    label: (<NavLink to='/home'>Events</NavLink>),
    key: 'events',
    icon:  <SettingOutlined />,
    disabled: false,
  },
  {
    label: (<NavLink to='/home'>My Profile</NavLink>),
    key: 'profile',
    icon:  <UserOutlined />,
    disabled: false,
  },
];

const Home = () => {
  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className='container'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="menu">
        {items.map(item => {
          if (item.children) {
            return (
              <Menu.SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
                className="menu-submenu"
              >
                {item.children.map(child => (
                  <Menu.Item key={child.key} className="menu-item">
                    {child.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                className="menu-item"
              >
                {item.label}
              </Menu.Item>
            )
          }
        })}
      </Menu>
    </div>
  )
};

export default Home;
