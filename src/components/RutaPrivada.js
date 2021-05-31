import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../context/AuthContext';

const RutaPrivada = ({ children, ...restoDePropiedades }) => {
	const { usuario } = useAuth();

	if (usuario) {
		return <Route {...restoDePropiedades}>{children}</Route>;
	} else {
		return <Redirect to='/iniciar-sesion' />;
	}
};

export default RutaPrivada;
