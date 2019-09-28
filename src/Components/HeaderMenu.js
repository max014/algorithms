import React from 'react';
import { Menu, Icon } from 'antd';

const HeaderMenu = (props) => {
	return (
		<Menu
			mode="horizontal"
			theme="dark"
			style={{ lineHeight: '64px' }}>
			<Menu.Item><span><Icon type="bar-chart" />Sorting Algorithms</span></Menu.Item>
		</Menu>
	);
}

export default HeaderMenu;