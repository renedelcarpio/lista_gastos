import React from 'react';
import { Header, Titulo } from '../elements/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

const GastosPorCategoria = () => {
	return (
		<>
			<Helmet>
				<title>Gastos por Categoría</title>
			</Helmet>

			<Header>
				<BtnRegresar />
				<Titulo>GASTOS POR CATEGORÍA</Titulo>
			</Header>
			<BarraTotalGastado />
		</>
	);
};

export default GastosPorCategoria;
