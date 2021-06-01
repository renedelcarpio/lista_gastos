import React, { useState } from 'react';
import Boton from '../elements/Boton';
import { ReactComponent as IconoPlus } from '../images/plus.svg';
import SelectCategorias from './SelectCategorias';
import {
	ContenedorFiltros,
	Formulario,
	Input,
	InputGrande,
	ContenedorBoton,
} from '../elements/ElementosDeFormulario';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useAuth } from '../context/AuthContext';

const FormularioGasto = () => {
	const [inputDescripcion, cambiarInputDescripcion] = useState('');
	const [inputCantidad, cambiarInputCantidad] = useState('');
	const [categoria, cambiarCategoria] = useState('hogar');
	const [fecha, cambiarFecha] = useState(new Date());
	const { usuario } = useAuth();

	const handleChange = (e) => {
		if (e.target.name === 'descripcion') {
			cambiarInputDescripcion(e.target.value);
		} else if (e.target.name === 'cantidad') {
			cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let cantidad = parseFloat(inputCantidad).toFixed(2);

		agregarGasto({
			categoria: categoria,
			descripcion: inputDescripcion,
			cantidad: cantidad,
			fecha: getUnixTime(fecha),
			uidUsuario: usuario.uid,
		});
	};

	return (
		<Formulario onSubmit={handleSubmit}>
			<ContenedorFiltros>
				<SelectCategorias
					categoria={categoria}
					cambiarCategoria={cambiarCategoria}
				/>
				<DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
			</ContenedorFiltros>

			<div>
				<Input
					type='text'
					name='descripcion'
					id='descripcion'
					placeholder='Descripción del Gasto'
					value={inputDescripcion}
					onChange={handleChange}
				/>
				<InputGrande
					type='text'
					name='cantidad'
					id='cantidad'
					placeholder='$0,00'
					value={inputCantidad}
					onChange={handleChange}
				/>
			</div>
			<ContenedorBoton>
				<Boton as='button' primario conIcono type='submit'>
					Agregar Gasto
					<IconoPlus />
				</Boton>
			</ContenedorBoton>
		</Formulario>
	);
};

export default FormularioGasto;
