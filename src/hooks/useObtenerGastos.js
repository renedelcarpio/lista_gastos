import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';

const useObtenerGastos = () => {
	const { usuario } = useAuth();
	const [gastos, cambiarGastos] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection('gastos')
			.where('uidUsuario', '==', usuario.uid)
			.orderBy('fecha', 'desc')
			.limit(10)
			.onSnapshot((snapshot) => {
				cambiarGastos(
					snapshot.docs.map((gasto) => {
						return { ...gasto.data(), id: gasto.id };
					})
				);
			});
		return unsubscribe;
	}, [usuario]);

	return [gastos];
};

export default useObtenerGastos;
