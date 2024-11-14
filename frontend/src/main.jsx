import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

import './index.css';

import Header from './components/header/index.jsx';

import PgLogin from './pages/login';
import PgHome from './pages/home';

import PgEpis from './pages/home/epi/index.jsx';

import PgFuncionarios from './pages/home/funcionarios/index.jsx';
import PgCadastroFuncionario from './pages/home/funcionarios/cadastroFuncionario/index.jsx';
import PgEditarFuncionario from './pages/home/funcionarios/editarFuncionario/index.jsx';

import PgPedidos from './pages/home/pedidos/index.jsx';

function MainLayout() {
    return (
        <>
            <Header />
            <Outlet /> {/* Renderiza o conteúdo das rotas */}
        </>
    );
}

const paginas = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <PgLogin /> },
            { path: "/home", element: <PgHome /> },
            { path: "/home/epis", element: <PgEpis /> },

            { path: "/home/funcionarios", element: <PgFuncionarios /> },
            { path: "/home/funcionarios/cadastro", element: <PgCadastroFuncionario /> },
            { path: "/home/funcionarios/editar/:id", element: <PgEditarFuncionario /> },

            { path: "/home/pedidos", element: <PgPedidos /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={paginas} />
    </StrictMode>
);
