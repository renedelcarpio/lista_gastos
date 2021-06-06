import { useState, useEffect } from 'react';
import useObtenerGastosDelMes from './useObtenerGastosDelMes';

const useObtenerGastosDelMesPorCategoria = () => {
	const [gastosPorCategoria, cambiarGastosPorCategoria] = useState([]);
	const gastos = useObtenerGastosDelMes();

	useEffect(() => {
		const sumaDeGastos = gastos.reduce(
			(objetoResultante, objetoActual) => {
				const categoriaActual = objetoActual.categoria;
				const cantidadActual = objetoActual.cantidad;

				objetoResultante[categoriaActual] += cantidadActual;

				return objetoResultante;
			},
			{
				// prettier-ignore
				'comida': 0,
				// prettier-ignore
				'cuentas y pagos': 0,
				// prettier-ignore
				'hogar': 0,
				// prettier-ignore
				'transporte': 0,
				// prettier-ignore
				'ropa': 0,
				// prettier-ignore
				'salud e higiene': 0,
				// prettier-ignore
				'compras': 0,
				// prettier-ignore
				'diversion': 0,
			}
		);
		//console.log(sumaDeGastos);

		cambiarGastosPorCategoria(
			Object.keys(sumaDeGastos).map((elemento) => {
				return { categoria: elemento, cantidad: sumaDeGastos[elemento] };
			})
		);
	}, [cambiarGastosPorCategoria, gastos]);

	return gastosPorCategoria;
};

export default useObtenerGastosDelMesPorCategoria;
