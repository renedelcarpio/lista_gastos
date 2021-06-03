import React from 'react';
import { Header, Titulo } from '../elements/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {
	Lista,
	ElementoLista,
	ListaDeCategorias,
	ElementoListaCategorias,
	Categoria,
	Descripcion,
	Valor,
	Fecha,
	ContenedorBotones,
	BotonAccion,
	BotonCargarMas,
	ContenedorBotonCentral,
	ContenedorSubtitulo,
	Subtitulo,
} from '../elements/ElementosDeLista';
import IconoCategoria from '../elements/IconoCategoria';
import convertirAMoneda from '../functions/convertirAMoneda';
import { ReactComponent as IconoEditar } from '../images/editar.svg';
import { ReactComponent as IconoBorrar } from '../images/borrar.svg';
import { Link } from 'react-router-dom';
import Boton from '../elements/Boton';

const ListaGastos = () => {
	const [gastos] = useObtenerGastos();

	return (
		<>
			<Helmet>
				<title>Lista de Gastos</title>
			</Helmet>

			<Header>
				<BtnRegresar />
				<Titulo>LISTA DE GASTOS</Titulo>
			</Header>

			<Lista>
				{gastos.map((gasto) => {
					return (
						<ElementoLista key={gasto.id}>
							<Categoria>
								<IconoCategoria id={gasto.categoria} />
								{gasto.categoria}
							</Categoria>

							<Descripcion>{gasto.descripcion}</Descripcion>

							<Valor>{convertirAMoneda(gasto.cantidad)}</Valor>

							<ContenedorBotones>
								<BotonAccion as={Link} to={`/editar/${gasto.id}`}>
									<IconoEditar />
								</BotonAccion>
								<BotonAccion>
									<IconoBorrar />
								</BotonAccion>
							</ContenedorBotones>
						</ElementoLista>
					);
				})}

				<ContenedorBotonCentral>
					<BotonCargarMas>Cargar más</BotonCargarMas>
				</ContenedorBotonCentral>
				{gastos.length === 0 && (
					<ContenedorSubtitulo>
						<Subtitulo>No hay gastos por mostrar</Subtitulo>
						<Boton as={Link} to='/'>
							Agregar Gasto
						</Boton>
					</ContenedorSubtitulo>
				)}
			</Lista>

			<BarraTotalGastado />
		</>
	);
};

export default ListaGastos;
