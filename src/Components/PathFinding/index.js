import React, { Component } from 'react';
import Cell from './Cell';
import makeMaze from './makeMaze';
import {Button} from 'antd';

function index(i, j, width, height){
	if(i<0 || j<0 || i>height-1 || j>width-1){
		return -1;
	}
	return (i*width) + j;
}

class PathFinding extends Component {
	state = {
		maze: [],
		steps: []
	}
	
	componentDidMount(){
		this.setState({maze: makeMaze(35, 13)});
	}

	dfs = async () => {
		const arr = [...this.state.maze];
		const steps = [];
		let current = arr[0];
		const stack = [];
		stack.push(current);
		while(stack.length){
			if(current.row === 12 && current.col === 34){
				current.color = 'limegreen';
				let a = arr.map(cell => {
					return {
						row: cell.row,
						col: cell.col,
						color: cell.color,
						top: cell.top,
						right: cell.right,
						bottom: cell.bottom,
						left: cell.left
					};
				});
				steps.push(a);
				break;
			}
			current.color = 'pink';
			const neighbors = [];
			if(current.top){
				let top = arr[index(current.row-1, current.col, 35, 13)];
				if(top.color !== 'pink' && top.color !== 'red'){
					neighbors.push(top);
				}
			}
			if(current.right){
				let right = arr[index(current.row, current.col+1, 35, 13)];
				if(right.color !== 'pink' && right.color !== 'red'){
					neighbors.push(right);
				}
			}
			if(current.bottom){
				let bottom = arr[index(current.row+1, current.col, 35, 13)];
				if(bottom.color !== 'pink' && bottom.color !== 'red'){
					neighbors.push(bottom);
				}
			}
			if(current.left){
				let left = arr[index(current.row, current.col-1, 35, 13)];
				if(left.color !== 'pink' && left.color !== 'red'){
					neighbors.push(left);
				}
			}
			if(neighbors.length > 0){
				current = neighbors[0];
				stack.push(current);
			} else {
				current.color = 'red';
				current = stack.pop();
			}
			let a = arr.map(cell => {
				return {
					row: cell.row,
					col: cell.col,
					color: cell.color,
					top: cell.top,
					right: cell.right,
					bottom: cell.bottom,
					left: cell.left
				};
			});
			steps.push(a);
		}
		await this.setState({steps: steps});
		this.animate(0);
	}

	animate = (i) => {
		if(this.state.steps[i+1]){
			this.animation = setTimeout(() => this.animate(i+1), 100 );
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

	render() {
		return (
			<React.Fragment>
				<Button onClick={this.dfs}>
					dfs
				</Button>
				<Button onClick={this.clear}>
					clear
				</Button>
				<div style={{position: 'relative'}}>
					{this.state.maze.map((cell, i) => <Cell key={i} {...cell} cellSize={34}/>)}
				</div>
			</React.Fragment>
		);
	}
}

export default PathFinding;