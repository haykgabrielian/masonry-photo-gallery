import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Home from './pages/Home';
import Photo from './pages/Photo';
import About from './pages/About';
import NotFound from './pages/NotFound';

const rootRoute = createRootRoute({
    component: () => (
        <div>
            <Outlet />
        </div>
    ),
    notFoundComponent: NotFound,
});

const HomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const PhotoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/$photoId',
    component: Photo,
});

const AboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
});

const routeTree = rootRoute.addChildren([AboutRoute, HomeRoute, PhotoRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default router;