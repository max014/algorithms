import React from 'react';

const Cell = (props) => {
	const size = props.cellSize;
	return (
		<div style={{
			backgroundColor: props.color,
			height: size + 'px',
			width: size + 'px',
			position: 'absolute',
			top: props.row * size,
			left: props.col * size,
			borderTop: !props.top ? '2px solid black' : 'none',
			borderRight: !props.right ? '2px solid black' : 'none',
			borderBottom: !props.bottom ? '2px solid black' : 'none',
			borderLeft: !props.left ? '2px solid black' : 'none',
		}}></div>
	);
}

export default Cell;