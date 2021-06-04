import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const useObtenerGastosDelMes = () => {
	const [gastos, establecerGastos] = useState([]);
	const { usuario } = useAuth();

	useEffect(() => {
		const inicioDeMes = getUnixTime(startOfMonth(new Date()));
		const finDeMes = getUnixTime(endOfMonth(new Date()));

		if (usuario) {
			const darDeBaja = db
				.collection('gastos')
				.orderBy('fecha', 'desc')
				.where('gastos', '>=', inicioDeMes)
				.where('gastos', '<=', finDeMes)
				.where('uidusuario', '==', usuario.uid)
				.onSnapshot((snapshot) => {
					establecerGastos(
						snapshot.docs.map((documento) => {
							return {
								...documento.data(),
								id: documento.id,
							};
						})
					);
				});
			// useEffect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente.
			// En este caso queremos que ejecuta el darDeBaja a la colleccion de firestore.
			return darDeBaja;
		}
	}, [usuario]);

	return [gastos];
};

export default useObtenerGastosDelMes;
