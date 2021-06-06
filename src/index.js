import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InicioSesion from './components/InicioSesion';
import GastosPorCategoria from './components/GastosPorCategoria';
import EditarGasto from './components/EditarGasto';
import ListaGastos from './components/ListaGastos';
import RegistroUsuarios from './components/RegistroUsuarios';
import { Helmet } from 'react-helmet';
import favicon from './images/logo.png';
import Fondo from './elements/Fondo';
import { AuthProvider } from './context/AuthContext';
import RutaPrivada from './components/RutaPrivada';
import { TotalGastadoProvider } from './context/TotalGastadoEnElMesContext';

WebFont.load({
	google: {
		families: ['Roboto:400,500,700', 'sans-serif'],
	},
});

const Index = () => {
	return (
		<>
			<Helmet>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Helmet>

			<AuthProvider>
				<TotalGastadoProvider>
					<BrowserRouter>
						<Contenedor>
							<Switch>
								<Route path='/iniciar-sesion' component={InicioSesion} />
								<Route path='/crear-cuenta' component={RegistroUsuarios} />

								<RutaPrivada path='/categorias'>
									<GastosPorCategoria />
								</RutaPrivada>
								<RutaPrivada path='/lista'>
									<ListaGastos />
								</RutaPrivada>
								<RutaPrivada path='/editar/:id'>
									<EditarGasto />
								</RutaPrivada>
								<RutaPrivada path='/'>
									<App />
								</RutaPrivada>
							</Switch>
						</Contenedor>
					</BrowserRouter>
				</TotalGastadoProvider>
			</AuthProvider>

			<Fondo />
		</>
	);
};

ReactDOM.render(<Index />, document.getElementById('root'));
