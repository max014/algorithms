import React, { Component } from 'react';
import Cell from './Cell';
import makeMaze from './makeMaze';
import {Button, Menu, Row, Col, Dropdown, Icon} from 'antd';
import styles from './index.module.css';

function index(i, j, width, height){
	if(i<0 || j<0 || i>height-1 || j>width-1){
		return -1;
	}
	return (i*width) + j;
}

function clone(cell){
	return {
		row: cell.row,
		col: cell.col,
		color: cell.color,
		top: cell.top,
		right: cell.right,
		bottom: cell.bottom,
		left: cell.left
	};
}

class PathFinding extends Component {
	state = {
		maze: [],
		steps: [],
		algo: 'Depth First Search',
		cellWidth: null
	}
	
	componentDidMount(){
		const elem = document.getElementById("maze")
		const cellWidth = elem.clientWidth / 35;
		this.setState({maze: makeMaze(35, 12), cellWidth: cellWidth});
	}

	makeMaze = () => {
		clearTimeout(this.animation);
		this.setState({maze: makeMaze(35, 12)});
	}

	dfs = async () => {
		const arr = this.state.maze;
		const steps = [];
		let current = arr[0];
		const stack = [];
		stack.push(current);
		while(stack.length){
			if(current === arr[arr.length - 1]){
				current.color = 'limegreen';
				let a = arr.map(cell => clone(cell));
				steps.push(a);
				break;
			}
			current.color = 'pink';
			const neighbors = [];
			if(current.top){
				let top = arr[index(current.row-1, current.col, 35, 12)];
				if(top.color !== 'pink' && top.color !== '#c00'){
					neighbors.push(top);
				}
			}
			if(current.right){
				let right = arr[index(current.row, current.col+1, 35, 12)];
				if(right.color !== 'pink' && right.color !== '#c00'){
					neighbors.push(right);
				}
			}
			if(current.bottom){
				let bottom = arr[index(current.row+1, current.col, 35, 12)];
				if(bottom.color !== 'pink' && bottom.color !== '#c00'){
					neighbors.push(bottom);
				}
			}
			if(current.left){
				let left = arr[index(current.row, current.col-1, 35, 12)];
				if(left.color !== 'pink' && left.color !== '#c00'){
					neighbors.push(left);
				}
			}
			if(neighbors.length > 0){
				stack.push(current);
				current = neighbors[0];
				
			} else {
				current.color = '#c00';
				current = stack.pop();
			}
			let a = arr.map(cell => clone(cell));
			steps.push(a);
		}
		await this.setState({steps: steps});
		this.animate(0);
	}

	bfs = async () => {
		const arr = this.state.maze;
		const steps = [];
		let current = null;
		const queue = [];
		queue.push(arr[0]);
		while(queue.length){
			current = queue.splice(0, 1)[0];
			if(current === arr[arr.length - 1]){
				current.color = 'limegreen';
				while(current.previous){
					current = current.previous;
					current.color = '#1890ff';
				}
				let a = arr.map(cell => clone(cell));
				steps.push(a);
				break;
			}
			current.color = 'pink';
			const neighbors = [];
			if(current.top){
				let top = arr[index(current.row-1, current.col, 35, 12)];
				if(top.color !== 'pink' && top.color !== '#c00'){
					neighbors.push(top);
				}
			}
			if(current.right){
				let right = arr[index(current.row, current.col+1, 35, 12)];
				if(right.color !== 'pink' && right.color !== '#c00'){
					neighbors.push(right);
				}
			}
			if(current.bottom){
				let bottom = arr[index(current.row+1, current.col, 35, 12)];
				if(bottom.color !== 'pink' && bottom.color !== '#c00'){
					neighbors.push(bottom);
				}
			}
			if(current.left){
				let left = arr[index(current.row, current.col-1, 35, 12)];
				if(left.color !== 'pink' && left.color !== '#c00'){
					neighbors.push(left);
				}
			}
			if(neighbors.length > 0){
				neighbors.forEach(n => {
					n.previous = current;
					queue.push(n)
				});
			}
			const a = arr.map(cell => clone(cell));
			steps.push(a);
		}
		await this.setState({steps: steps});
		this.animate(0);
	}

	animate = (i) => {
		if(this.state.steps[i+1]){
			this.animation = setTimeout(() => this.animate(i+1), 20);
		}
		this.setState({maze: this.state.steps[i]});
	}

	clear = () => {
		clearTimeout(this.animation);
		const maze = this.state.maze.map(cell => {
			cell.color = '#fff';
			return cell;
		});
		this.setState({maze: maze});
	}

	solve = () => {
		clearTimeout(this.animation);
	    switch(this.state.algo){
	      case 'Depth First Search':
	        this.dfs();
	        break;
	      case 'Breadth First Search':
	        this.bfs();
	        break;
	      default:
	        break;
	    }
	}

	select = e => {
	    this.setState({algo: e.key});
	    this.clear();
	}

	render() {
		const menu = (
		    <Menu 
				onClick={this.select}
				selectedKeys={[this.state.algo]}
				title={<span><Icon type="setting" />Choose Algorithm</span>}
				className={styles.Width}>
				<Menu.Item key={'Depth First Search'}>Depth First Search</Menu.Item>
				<Menu.Item key={'Breadth First Search'}>Breadth First Search</Menu.Item>
		    </Menu>
		);
		return (
			<React.Fragment>
				<div className={styles.DashBoard} id='maze'>
					<Row type="flex" justify="space-between">
						<Col>
							<div>
								<Dropdown overlay={menu}>
									<div>
										Algorithm: 
										<Button className={styles.AlgoDropDown}>
											{this.state.algo} <Icon type="down" />
										</Button>
									</div>
								</Dropdown>
							</div>
						</Col>
						<Col>
							<Row type="flex">
								<Col style={{marginRight: '10px'}}><Button onClick={this.makeMaze}>New Maze</Button></Col>
								<Col><Button type='primary' onClick={this.solve}>Go</Button></Col>
							</Row>
						</Col>
					</Row>
				</div>
				<div style={{position: 'relative'}}>
					{this.state.maze.map((cell, i) => <Cell key={i} {...cell} cellSize={this.state.cellWidth}/>)}
				</div>
			</React.Fragment>
		);
	}
}

export default PathFinding;