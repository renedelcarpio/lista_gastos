import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [usuario, cambiarUsuario] = useState();

	// Creamos un estado para saber cuando termina de cargar la comprobación de onAuthStateChanged
	const [cargando, cambiarCargando] = useState(true);

	// Efecto para ejecutar la comprobación una sola vez
	useEffect(() => {
		// Comprobamos si hay un usuario
		const CancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
			cambiarUsuario(usuario);
			cambiarCargando(false);
		});
		return CancelarSuscripcion;
	}, []);

	return (
		<AuthContext.Provider value={{ usuario: usuario }}>
			{/*Solamente retornamos los elementos hijos cuando no este cargando. De esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya sido estableciro.
            Si no hacemos esto al refrescar la página el componente children intenta cargar antes de haber comprobado que existe un usuario.*/}
			{!cargando && children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext, useAuth };
