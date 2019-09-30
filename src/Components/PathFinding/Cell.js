import React from 'react';

const Cell = (props) => {
	return (
		<div style={{
			backgroundColor: '#fff',
			height: '52px',
			width: '52px',
			position: 'absolute',
			top: props.row * 52,
			left: props.col * 52,
			borderTop: !props.top ? '2px solid black' : 'none',
			borderRight: !props.right ? '2px solid black' : 'none',
			borderBottom: !props.bottom ? '2px solid black' : 'none',
			borderLeft: !props.left ? '2px solid black' : 'none',
		}}></div>
	);
}

export default Cell;