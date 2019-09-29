import React, {useState, useEffect} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';

const HeaderMenu = (props) => {
	const [location, setLocation] = useState('');

	useEffect(() => setLocation(window.location.pathname), []);

	return (
		<Menu
			onClick={(e) => setLocation(e.key)}
			mode="horizontal"
			theme="dark"
			style={{ lineHeight: '64px' }}
			selectedKeys={[location]}>
			<Menu.Item key="/sort">
				<Link to="/sort"><span><Icon type="bar-chart" />Sorting Algorithms</span></Link>
			</Menu.Item>
			<Menu.Item key="/path-finding">
				<Link to="/path-finding"><span><Icon type="drag" />Path Finding Algorithms</span></Link>
			</Menu.Item>
		</Menu>
	);
}

export default HeaderMenu;