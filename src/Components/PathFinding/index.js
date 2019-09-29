import React, { Component } from 'react';
import Cell from './Cell';

function index(i, j){
	if(i<0 || j<0 || i>8 || j>21){
		return -1;
	}
	return (i*22) + j;
}

function makeGrid(){
	const arr = [];
	function cell(i, j){
		this.row = i;
		this.col = j;
		this.top = false;
		this.right = false;
		this.bottom = false;
		this.left = false;
		this.visited = false;
		this.checkNeighbors = () => {
			const neighbors = [];
			const top = {cell: arr[index(this.row-1, this.col)], pos: 'top', opp: 'bottom'};
			const right = {cell: arr[index(this.row, this.col+1)], pos: 'right', opp: 'left'};
			const bottom = {cell: arr[index(this.row+1, this.col)], pos: 'bottom', opp: 'top'};
			const left = {cell: arr[index(this.row, this.col-1)], pos: 'left', opp: 'right'};

			if(top.cell && !top.cell.visited){
				neighbors.push(top);
			}
			if(right.cell && !right.cell.visited){
				neighbors.push(right);
			}
			if(bottom.cell && !bottom.cell.visited){
				neighbors.push(bottom);
			}
			if(left.cell && !left.cell.visited){
				neighbors.push(left);
			}

			if(neighbors.length > 0){
				const next = neighbors[Math.floor(Math.random() * neighbors.length)];
				this[next.pos] = true;
				if(next.cell){
					next.cell[next.opp] = true;
				}
				return next.cell; 
			}
		}
	}

	for(let i=0; i<9; i++){
		for(let j=0; j<22; j++){
			arr.push(new cell(i, j));
		}
	}
	return arr;
}


class PathFinding extends Component {
	state = {
		maze: []
	}
	
	componentDidMount(){
		const grid = makeGrid();

		let current = grid[0];
		current.visited = true;

		let i = 0;
		while(i < 100){
			let next = current.checkNeighbors();
			if(next){
				next.visited = true;
				current = next;
			}
			i++;
		}

		this.setState({maze: grid});
	}

	render() {
		return (
			<div style={{position: 'relative'}}>
				{this.state.maze.map((cell, i) => <Cell key={i} {...cell}/>)}
			</div>
		);
	}
}

export default PathFinding;