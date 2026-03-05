import { createBrowserRouter } from "react-router";

// Navigation
import Start from "./features/navigation/pages/Start";

// Informer
import InformerLogin from "./features/informer/pages/InformerLogin";
import InformerRegister from "./features/informer/pages/InformerRegister";
import InformerDashboard from "./features/informer/pages/InformerDashboard";
import InformerReport from "./features/informer/pages/InformerReport";
import InformerConformation from "./features/informer/pages/InformerConformation";

// Scout
import ScoutLogin from "./features/scout/pages/scoutLogin";
import ScoutRegister from "./features/scout/pages/ScoutRegister";
import ScoutDashboard from "./features/scout/pages/scoutDashboard";
import ActiveRescue from "./features/scout/pages/activeRescue";
import ScoutConformation from "./features/scout/pages/scoutConformation";

export const router = createBrowserRouter([
    // Landing 
    {
        path: "/",
        element: <Start />,
    },

    // Informer Routes 
    {
        path: "/informer/login",
        element: <InformerLogin />,
    },
    {
        path: "/informer/register",
        element: <InformerRegister />,
    },
    {
        path: "/informer/dashboard",
        element: <InformerDashboard />,
    },
    {
        path: "/informer/report",
        element: <InformerReport />,
    },
    {
        path:"/informer/conformation",
        element:<InformerConformation />
    },

    // Scout Routes
    {
        path: "/scout/login",
        element: <ScoutLogin />,
    },
    {
        path: "/scout/register",
        element: <ScoutRegister />,
    },
    {
        path: "/scout/dashboard",
        element: <ScoutDashboard />,
    },
    {
        path: "/scout/active-rescue",
        element: <ActiveRescue />,
    },
    {
        path:"/scout/conformation",
        element:<ScoutConformation />
    },
]);