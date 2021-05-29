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

			<BrowserRouter>
				<Contenedor>
					<Switch>
						<Route path='/iniciar-sesion' component={InicioSesion} />
						<Route path='/crear-cuenta' component={RegistroUsuarios} />
						<Route path='/categorias' component={GastosPorCategoria} />
						<Route path='/lista' component={ListaGastos} />
						<Route path='/editar/:id' component={EditarGasto} />
						<Route path='/' component={App} />
					</Switch>
				</Contenedor>
			</BrowserRouter>

			<Fondo />
		</>
	);
};

ReactDOM.render(<Index />, document.getElementById('root'));
