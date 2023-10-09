import React from 'react';
import './css/Carousel.css'
const emojis = [
	["🐳", "spouting whale"],
	["🐋", "whale"],
	["🐬", "dolphin"],
	["🐟", "fish"],
	["🐠", "tropical fish"],
	["🐡", "blowfish"],
	["🦈", "shark"],
	["🐟", "fish"],
	["🐬", "dolphin"],
];

const Carousel = () => {
	return (
		<div className="wrapper">
			<div className="carousel">
				{emojis.map((i, index) => (
					<div className="carousel__item" key={index}>
						<div className="carousel__item-head">
							{i[0]}
						</div>
						<div className="carousel__item-body">
							<p className="title">{i[1]}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;