import { useState, useEffect, useContext } from 'react'
import { Menu } from 'antd'
import './TopBar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { AppstoreAddOutlined, CarryOutOutlined, TeamOutlined, CoffeeOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import { UserState } from '../../Context';

const { Item, SubMenu, ItemGroup } = Menu

const TopNav = () => {
    const navigate=useNavigate()
    const { user, setUser } = UserState()
    const [current, setCurrent] = useState('')

    console.log({user})

    const logOut = async () => {
        // handle logout logic
        setUser({})
        localStorage.removeItem('userInfo')
        navigate('/')
    }

    return (
        <Menu mode='horizontal' selectedKeys={[current]}  theme='dark' style={{ backgroundColor: '#3255F1' ,lineHeight: '64px', color: '#FFFFFF' }} >
            <Item
                key="/"
                style={{float:"left"}}
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreAddOutlined />}
            >
                <NavLink to='/'>App</NavLink>
            </Item>
            {/* <div className="menu-container">
            <Item
                key="/instructor/course/create"
                onClick={(e) => setCurrent(e.key)}
                icon={<CarryOutOutlined />}
            >
                <NavLink to='/instructor/course/create'>Home</NavLink>
            </Item>

            <Item
                key="/user/become-instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
            >
                <NavLink to='/user/become-instructor'>Chat</NavLink>
            </Item>

            <Item
                key="/instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
            >
                <NavLink to='/instructor'>Events</NavLink>
            </Item>
            </div> */}
           { user && user.accessToken ?
            <SubMenu
                icon={<CoffeeOutlined />}
                title={user && user.name}
                className="float-right"
                style={{ position: "absolute", right: "2rem" }}
            >
                <ItemGroup className='float-right'>
                    <Item
                        key="/user"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<UserAddOutlined />}
                    >
                        <NavLink to='/user'>Upgarde Premium</NavLink>
                    </Item>
                    <Item
                        key="/user"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<UserAddOutlined />}
                    >
                        <NavLink to='/user'>DashBoard</NavLink>
                    </Item>
                    <Item
                        key="/user"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<UserAddOutlined />}
                    >
                        <NavLink to='/user'>DashBoard</NavLink>
                    </Item>
                    <Item
                        onClick={logOut}
                        icon={<LogoutOutlined />}
                        style={{ "float": "end" }}
                    >
                        Logout
                    </Item>
                </ItemGroup>
            </SubMenu>
            :   
            <Item
            onClick={logOut}
            className="float-right"
            icon={<LogoutOutlined />}
            // style={{ "float": "end" }}
            style={{ position: "absolute", right: "1rem" }}
        >
            LogIn
        </Item>}
        </Menu>
    )
}

export default TopNav
