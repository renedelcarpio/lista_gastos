import React from 'react';
import { Header, Titulo } from '../elements/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';

const GastosPorCategoria = () => {
	const gastos = useObtenerGastosDelMesPorCategoria();
	console.log(gastos);
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
