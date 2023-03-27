import { useState, useEffect, useContext } from 'react'
import { Menu } from 'antd'
import './Home.css'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify'
import { AppstoreAddOutlined, CarryOutOutlined, TeamOutlined, CoffeeOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'

const { Item, SubMenu, ItemGroup } = Menu

const TopNav = () => {
    const [current, setCurrent] = useState('')

    const logOut = async () => {
        // handle logout logic
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

            <>
                {/* <Item
                    key="/login"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<LoginOutlined />}
                >
                    <NavLink to='/login'>Login</NavLink>
                </Item>
                <Item
                    key="/register"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<UserAddOutlined />}
                >
                    <NavLink to='/register'>Register</NavLink>
                </Item> */}
            </>
            <div className="menu-container">
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
            </div>
            <SubMenu
                icon={<CoffeeOutlined />}
                title={"Manaf"}
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
        </Menu>
    )
}

export default TopNav
