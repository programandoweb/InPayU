import Inicio from '../app/sections/home/Inicio';
import Users from '../app/sections/users';
import Seeker from '../components/Plugins/Seeker';
import Blog from '../app/sections/blog';
import Auth from '../app/sections/auth';
import Dashboard from '../app/sections/dashboard';

import ListaCategorias from '../components/Plugins/ListaCategorias';

export const modules=[
  {
    name:"Home",
    slug:"*",
    component:Inicio,
    menu:true,
    private:false,
    items:[],
  },
  // {
  //   name:"Panel administración",
  //   slug:"/dashboard/*",
  //   component:Dashboard,
  //   menu:false,
  //   private:true,
  //   ico:false,
  //   items:[],
  // },
  {
    name:"Catálogo",
    slug:"/catalogo/*",
    component:Blog,
    menu:true,
    private:true,
    items:[

      {
        name:"Lista de categorías",
        slug:"/plugins/lista_categorias",
        component:ListaCategorias,
        menu:true,
        plugins:true,
        plugins_mobile:false,
        private:false,
        items:[],
      },

    ],
  },
  {
    name:"Blog",
    slug:"/blog/*",
    component:Blog,
    menu:true,
    private:true,
    items:[],
  },
  {
    name:"Auth",
    slug:"/auth/*",
    component:Auth,
    menu:false,
    private:false,
    items:[],
  },
  {
    name:"Buscador",
    slug:"/plugins/buscar",
    component:Seeker,
    menu:false,
    plugins:true,
    plugins_mobile:false,
    private:false,
    items:[],
  },
  {
    name:"dashboard",
    slug:"/dashboard/*",
    component:Dashboard,
    menu:false,
    private:false,
    ico:false,
    items:[],
  },
  // {
  //   name:"dashboard",
  //   slug:"/dashboard",
  //   component:Dashboard,
  //   menu:false,
  //   private:false,
  //   ico:false,
  //   items:[],
  // },

]


export const menu_user  = [
  {
    name:"Mi cuenta",
    slug:"/dashboard/account",
    component:Users,
    menu:true,
    private:true,
    ico:false,
    items:[],
  },
  {
    name:"Inicia sesión",
    slug:"/dashboard",
    component:Users,
    menu:true,
    private:false,
    ico:false,
    items:[],
  },
  {
    name:"Regístrate",
    slug:"/auth/register",
    component:Users,
    menu:true,
    private:false,
    ico:false,
    items:[],
  },
  {
    name:"Cerrar Sesión",
    slug:"/auth/exit",
    module:"user",
    method:"exit",
    component:Users,
    menu:true,
    private:true,
    ico:false,
    items:[],
  },
]
