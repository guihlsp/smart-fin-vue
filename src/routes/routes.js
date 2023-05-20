import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import PageNotFound from "@/views/PageNotFound.vue"
import Cadastro from "@/views/Cadastro.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import UserProfile from "@/views/UserProfile.vue";
import Categorias from "@/views/Categorias/Listar.vue";
import Typography from "@/views/Typography.vue";
import Icons from "@/views/Icons.vue";
import Maps from "@/views/Maps.vue";
import Notifications from "@/views/Notifications.vue";
import UpgradeToPRO from "@/views/UpgradeToPRO.vue";

const routes = [
  // {
  //   path: '/site',
  //   name: 'Site',
  //   component: Site
  // },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Cadastro,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/pageNotFound",
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "categorias",
        name: "Categorias",
        component: Categorias,
      },
      {
        path: "categorias/adicionar",
        name: "AdicionarCategoria",
        component: () => import('@/views/Categorias/Adicionar.vue'),
      },
      {
        path: "categorias/editar/:id",
        name: "EditarCategoria",
        component: () => import('@/views/Categorias/Editar'),
      },
      {
        path: "categorias/visualizar/:id",
        name: "VisualizarCategoria",
        component: () => import('@/views/Categorias/Visualizar'),
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
      },
    ],
  },
];

export default routes;
