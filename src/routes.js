import { Navigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import UserMangement from './pages/UserManagement';
import Vehicles from './pages/Vehicles';
import LoginPage from './pages/LoginPage';
import Project from './pages/Project';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour vérifier l'état d'authentification
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(token);
        // L'utilisateur est connecté, vous pouvez le laisser accéder aux pages protégées
      } else {
        // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
        console.log("nothing")
      }
    };
  
    checkAuthentication();
  }, []);
  const checkAuthentications = () => {
    // Vérifiez ici l'état d'authentification (par exemple, en vérifiant la présence d'un token JWT dans le stockage local)
    const token = localStorage.getItem('token');
    console.log(token);
    setIsAuthenticated(!!token); // Met à jour l'état d'authentification en fonction de la présence du token
  };

  // Utilisez la fonction checkAuthentication pour décider quelles routes afficher en fonction de l'état d'authentification
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'users', element: <UserMangement /> },
        { path: 'user', element: <UserPage /> },
        { path: 'vehicle', element: <Vehicles /> },
        { path: 'project', element: <Project /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <LoginPage onLogin={checkAuthentications} />, // Affiche la page de connexion si l'utilisateur n'est pas authentifié
      index: true,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
