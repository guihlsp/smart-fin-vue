import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Cadastro from "@/views/Cadastro.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import UserProfile from "@/views/UserProfile.vue";
import Categorias from "@/views/Categorias/Listar.vue";
import Tags from "@/views/Tags/Listar.vue";
import ContasBancarias from "@/views/ContasBancarias/Listar.vue";
import FormasPagamento from "@/views/FormasPagamento/Listar.vue";
import Movimentacoes from "@/views/Movimentacoes/Listar.vue";
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
    name: "Página não encontrada",
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
        name: "Adicionar categoria",
        component: () => import("@/views/Categorias/Adicionar.vue"),
      },
      {
        path: "categorias/editar/:id",
        name: "Editar categoria",
        component: () => import("@/views/Categorias/Editar"),
      },
      {
        path: "categorias/visualizar/:id",
        name: "Visualizar categoria",
        component: () => import("@/views/Categorias/Visualizar"),
      },
      {
        path: "contas_bancarias",
        name: "Contas bancárias",
        component: ContasBancarias,
      },
      {
        path: "contas_bancarias/adicionar",
        name: "Adicionar conta bancária",
        component: () => import("@/views/ContasBancarias/Adicionar.vue"),
      },
      {
        path: "contas_bancarias/editar/:id",
        name: "Editar conta bancária",
        component: () => import("@/views/ContasBancarias/Editar"),
      },
      {
        path: "contas_bancarias/visualizar/:id",
        name: "Visualizar conta bancária",
        component: () => import("@/views/ContasBancarias/Visualizar"),
      },
      {
        path: "tags",
        name: "Tags",
        component: Tags,
      },
      {
        path: "tags/adicionar",
        name: "Adicionar tag",
        component: () => import("@/views/Tags/Adicionar.vue"),
      },
      {
        path: "tags/editar/:id",
        name: "Editar tag",
        component: () => import("@/views/Tags/Editar"),
      },
      {
        path: "tags/visualizar/:id",
        name: "Visualizar tag",
        component: () => import("@/views/Tags/Visualizar"),
      },
      {
        path: "formas_pagamento",
        name: "Formas de pagamento",
        component: FormasPagamento,
      },
      {
        path: "formas_pagamento/adicionar",
        name: "Adicionar forma de pagamento",
        component: () => import("@/views/FormasPagamento/Adicionar.vue"),
      },
      {
        path: "formas_pagamento/editar/:id",
        name: "Editar forma de pagamento",
        component: () => import("@/views/FormasPagamento/Editar"),
      },
      {
        path: "formas_pagamento/visualizar/:id",
        name: "Visualizar forma de pagamento",
        component: () => import("@/views/FormasPagamento/Visualizar"),
      },
      {
        path: "movimentacoes",
        name: "Movimentacoes",
        component: Movimentacoes,
      },
      {
        path: "movimentacoes/adicionar",
        name: "Adicionar movimentação",
        component: () => import("@/views/Movimentacoes/Adicionar.vue"),
      },
      {
        path: "movimentacoes/editar/:id",
        name: "Editar movimentação",
        component: () => import("@/views/Movimentacoes/Editar"),
      },
      {
        path: "movimentacoes/visualizar/:id",
        name: "Visualizar movimentação",
        component: () => import("@/views/Movimentacoes/Visualizar"),
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
