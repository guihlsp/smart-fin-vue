import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import PageNotFound from "@/views/PageNotFound.vue"
import Cadastro from "@/views/Cadastro.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import UserProfile from "@/views/UserProfile.vue";
import Categorias from "@/views/Categorias/Listar.vue";
import Tags from "@/views/Tags/Listar.vue";
import ContasBancarias from "@/views/ContasBancarias/Listar.vue";
import Icons from "@/views/Icons.vue";
import Notifications from "@/views/Notifications.vue";
import UpgradeToPRO from "@/views/UpgradeToPRO.vue";

const routes = [
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
        path: "contas_bancarias",
        name: "ContasBancarias",
        component: ContasBancarias,
      },
      {
        path: "contas_bancarias/adicionar",
        name: "AdicionarContaBancaria",
        component: () => import('@/views/ContasBancarias/Adicionar.vue'),
      },
      {
        path: "contas_bancarias/editar/:id",
        name: "EditarContaBancaria",
        component: () => import('@/views/ContasBancarias/Editar'),
      },
      {
        path: "contas_bancarias/visualizar/:id",
        name: "VisualizarContaBancaria",
        component: () => import('@/views/ContasBancarias/Visualizar'),
      },
      {
        path: "tags",
        name: "Tags",
        component: Tags,
      },
      {
        path: "tags/adicionar",
        name: "AdicionarTag",
        component: () => import('@/views/Tags/Adicionar.vue'),
      },
      {
        path: "tags/editar/:id",
        name: "EditarTag",
        component: () => import('@/views/Tags/Editar'),
      },
      {
        path: "tags/visualizar/:id",
        name: "VisualizarTag",
        component: () => import('@/views/Tags/Visualizar'),
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
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
