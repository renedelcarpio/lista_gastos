import React from 'react';
import { Header, Titulo } from '../elements/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import { useParams } from 'react-router-dom';
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {
	const { id } = useParams();
	const [gasto] = useObtenerGasto(id);

	console.log(gasto);

	return (
		<>
			<Helmet>
				<title>Editar Gasto</title>
			</Helmet>

			<Header>
				<BtnRegresar />
				<Titulo>Editar Gasto</Titulo>
			</Header>
			<FormularioGasto />
			<BarraTotalGastado />
		</>
	);
};

export default EditarGasto;
