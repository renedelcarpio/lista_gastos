import React from 'react';
import { Header, Titulo } from '../elements/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';

const ListaGastos = () => {
	return (
		<>
			<Helmet>
				<title>Lista de Gastos</title>
			</Helmet>

			<Header>
				<BtnRegresar />
				<Titulo>LISTA DE GASTOS</Titulo>
			</Header>
		</>
	);
};

export default ListaGastos;
