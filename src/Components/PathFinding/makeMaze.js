function makeMaze(width, height){
	function index(i, j, width, height){
		if(i<0 || j<0 || i>height-1 || j>width-1){
			return -1;
		}
		return (i*width) + j;
	}
	function cell(i, j, width){
		this.row = i;
		this.col = j;
		this.top = false;
		this.right = false;
		this.bottom = false;
		this.left = false;
		this.visited = false;
		this.color = '#fff';
		this.checkNeighbors = () => {
			const neighbors = [];
			const top = {cell: arr[index(this.row-1, this.col, width, height)], pos: 'top', opp: 'bottom'};
			const right = {cell: arr[index(this.row, this.col+1, width, height)], pos: 'right', opp: 'left'};
			const bottom = {cell: arr[index(this.row+1, this.col, width, height)], pos: 'bottom', opp: 'top'};
			const left = {cell: arr[index(this.row, this.col-1, width, height)], pos: 'left', opp: 'right'};

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
				if(bottom.cell && Math.random() < 0.1){ // makes multiple solutions
					this.bottom = true;
					bottom.cell.top = true;
				}
				if(next.cell){
					next.cell[next.opp] = true;
					return next.cell; 
				} else {
					return undefined;
				}
			}
		}
	}

	const arr = [];
	for(let i=0; i<height; i++){
		for(let j=0; j<width; j++){
			arr.push(new cell(i, j, width));
		}
	}
	let current = arr[0];
	current.visited = true;
	const stack = [];
	stack.push(current);
	while(stack.length){
		let next = current.checkNeighbors();
		if(next !== undefined){
			stack.push(current);
			next.visited = true;
			current = next;
		} else {
			current = stack.pop();
		}
	}
	return arr;
}

export default makeMaze;