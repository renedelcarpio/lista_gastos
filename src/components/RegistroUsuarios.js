import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from '../elements/Header';
import Boton from '../elements/Boton';
import {
	Formulario,
	Input,
	ContenedorBoton,
} from '../elements/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from '../images/registro.svg';
import styled from 'styled-components';
import { auth } from '../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import Alerta from '../elements/Alerta';

const Svg = styled(SvgLogin)`
	width: 100%;
	max-height: 6.25rem; /* 100px */
	margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {
	const history = useHistory();

	// Se definen estados (que pasaremos al value), uno para cada input
	const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');
	const [password2, establecerPassword2] = useState('');

	// Definimos el estado para el mensaje de éxito o error
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	// Definimos los valores que ingrese el usuario
	const handleChange = (e) => {
		switch (e.target.name) {
			case 'email':
				establecerCorreo(e.target.value);
				break;
			case 'password':
				establecerPassword(e.target.value);
				break;
			case 'password2':
				establecerPassword2(e.target.value);
				break;
			default:
				break;
		}
	};

	// Configuramos la funcionalidad del submit y validamos si los datos que ingresó el usuario son correctos
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Configuramos el estado de nuestro mensaje de alerta
		cambiarEstadoAlerta(false);
		cambiarAlerta({});

		// Comprobamos del lado del cliente que los datos sean válidos.
		const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
		if (!expresionRegular.test(correo)) {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor ingresa un correo electrónico válido',
			});
			return;
		}
		if (correo === '' || password === '' || password2 === '') {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor ingresa todos los datos',
			});
			return;
		}
		if (password !== password2) {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Las contraseñas no son iguales',
			});
			return;
		}

		// Con la función createUserWith... creamos el usuario en firebase. Luego validamos según los errores del lado del servidor.

		try {
			await auth.createUserWithEmailAndPassword(correo, password);
			history.push('/iniciar-sesion');
		} catch (error) {
			cambiarEstadoAlerta(true);
			let mensaje;
			switch (error.code) {
				case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres';
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con éste correo electrónico';
					break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido';
					break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta';
					break;
			}
			cambiarAlerta({
				tipo: 'error',
				mensaje: mensaje,
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>Crear Cuenta</title>
			</Helmet>

			<Header>
				<ContenedorHeader>
					<Titulo>Crear Cuenta</Titulo>
					<div>
						<Boton to='/iniciar-sesion'>Iniciar Sesión</Boton>
					</div>
				</ContenedorHeader>
			</Header>

			<Formulario onSubmit={handleSubmit}>
				<Svg />
				<Input
					type='email'
					name='email'
					placeholder='Correo Electrónico'
					value={correo}
					onChange={handleChange}
				/>
				<Input
					type='password'
					name='password'
					placeholder='Contraseña'
					value={password}
					onChange={handleChange}
				/>
				<Input
					type='password'
					name='password2'
					placeholder='Repetir la Contraseña'
					value={password2}
					onChange={handleChange}
				/>
				<ContenedorBoton>
					<Boton as='button' primario type='submit'>
						Crear Cuenta
					</Boton>
				</ContenedorBoton>
			</Formulario>
			<Alerta
				tipo={alerta.tipo}
				mensaje={alerta.mensaje}
				estadoAlerta={estadoAlerta}
				cambiarEstadoAlerta={cambiarEstadoAlerta}
			/>
		</>
	);
};

export default RegistroUsuarios;
