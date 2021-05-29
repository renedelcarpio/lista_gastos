import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Puntos } from '../images/puntos.svg';

const Svg = styled.svg`
	height: 50vh;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 0;
	path {
		fill: rgba(135, 182, 194, 0.15);
	}
`;

const PuntosArriba = styled(Puntos)`
	position: fixed;
	z-index: 1;
	top: 2.5rem; /* 40px */
	left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
	position: fixed;
	z-index: 1;
	bottom: 2.5rem; /* 40px */
	right: 2.5rem; /* 40px */
`;

const Fondo = () => {
	return (
		<>
			<PuntosArriba />
			<Svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1440 320'
				preserveAspectRatio='none'
			>
				<path
					fillOpacity='1'
					d='M0,32L48,48C96,64,192,96,288,128C384,160,480,192,576,224C672,256,768,288,864,272C960,256,1056,192,1152,160C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
				></path>
			</Svg>
			<PuntosAbajo />
		</>
	);
};

export default Fondo;
