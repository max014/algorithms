import React from 'react';
import {Slider, Dropdown, Menu, Icon, Button, Row, Col} from 'antd';

const Visualizer = (props) => {
	const menu = (
		<Menu 
			onClick={props.select}
			selectedKeys={[props.current]}
			title={<span><Icon type="setting" />Choose Algorithm</span>}
			style={{width: '200px'}}>
			<Menu.Item key={'Quick Sort'}>Quick Sort</Menu.Item>
			<Menu.Item key={'Merge Sort'}>Merge Sort</Menu.Item>
			<Menu.Item key={'Selection Sort'}>Selection Sort</Menu.Item>
			<Menu.Item key={'Bubble Sort'}>Bubble Sort</Menu.Item>
		</Menu>
	);
	return (
		<div style={{backgroundColor: '#fff'}}>
			<div style={{padding: '15px'}}>
				<Row type="flex" justify="space-between">
					<Col>
						<div style={{marginBottom: '15px', width: '270px'}}>
							<Dropdown overlay={menu}>
								<div>
								    Algorithm: 
								    <Button style={{
								    	fontWeight: 'bold',
								    	marginLeft: '10px'
								    }}>{props.algo} <Icon type="down" /></Button>
								</div>
							</Dropdown>
						</div>
					</Col>
					<Col>
					<Row type="flex">
						<Col style={{marginRight: '10px'}}><Button onClick={props.makeArray}>Reset</Button></Col>
						<Col><Button type='primary' onClick={props.sort}>Sort</Button></Col>
					</Row>
					</Col>
				</Row>
				<div>
					Speed:
					<Slider
					onAfterChange={props.changeSpeed}
					defaultValue={250}
		            min={1}
		            max={500}
		            onChange={props.slideSpeed}/>
		        </div>
		        <div>
					Quantity:
					<Slider
					onAfterChange={props.mouseUp}
					defaultValue={30}
		            min={5}
		            max={200}
		            onChange={props.changeQty}/>
		        </div>
		    </div>

			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
				{props.arr.map((elem, i) => (
					<div
						key={i}
						style={{
							height: elem,
							backgroundColor: props.done ? 'limegreen' : props.highlight.includes(i) ? 'blue' : '#c00',
							flex: '1',
							marginRight: '1px'}}></div>
					))}
			</div>
		</div>
	);
}

export default Visualizer;