import Home from '../app/sections/dashboard/Home';
import ProductoAdd from '../app/sections/productos/Productos'
import Productos from '../app/sections/productos';
import ProductosCategories from '../app/sections/productos/ProductosCategories';
import ProductosPublicaciones from '../app/sections/productos/ProductosPublicaciones';

import Scraping from '../app/sections/scraping/index';
import ScrapingResult from '../app/sections/scraping/Result';
import ScrapingView from '../app/sections/scraping/View';

import Ventas from '../app/sections/ventas';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LanIcon from '@mui/icons-material/Lan';

export const modules=[
  {
    name:"Home",
    slug:"/dashboard",
    component:Home,
    menu:true,
    private:true,
    icon:<HomeIcon/>,
    items:[],
  },


  // {
  //   name:"Scraping",
  //   slug:"/dashboard/scraping",
  //   component:Productos,
  //   menu:true,
  //   private:true,
  //   icon:<SettingsIcon/>,
  //   items:[
  //     {
  //       name:"Páginas",
  //       slug:"/dashboard/scraping/categorias",
  //       component:Productos,
  //       menu:true,
  //       private:true,
  //       icon:<CorporateFareIcon/>,
  //       items:[
  //         {
  //           name:"Generar",
  //           slug:"/dashboard/scraping/categorias/list/:id",
  //           url:"/dashboard/scraping/categorias/list",
  //           component:ScrapingView,
  //           menu:true,
  //           private:true,
  //           items:[],
  //         },
  //         {
  //           name:"Generar",
  //           slug:"/dashboard/scraping/categorias/list/*",
  //           url:"/dashboard/scraping/categorias/list",
  //           component:Scraping,
  //           menu:true,
  //           private:true,
  //           items:[],
  //         },
  //         {
  //           name:"Resultados",
  //           slug:"/dashboard/scraping/categorias/result",
  //           component:ScrapingResult,
  //           menu:true,
  //           private:true,
  //           items:[],
  //         },
  //       ],
  //     },
  //   ]
  // },
  {
    name:"Productos",
    slug:"/dashboard/payu",
    component:Productos,
    menu:true,
    private:true,
    icon:<SettingsIcon/>,
    items:[
      // {
      //   name:"Productos",
      //   slug:"/dashboard/productos",
      //   component:Productos,
      //   menu:true,
      //   private:true,
      //   icon:<LanIcon/>,
      //   items:[
      //     {
      //       name:"Productos",
      //       slug:"/dashboard/productos/productos/*",
      //       url:"/dashboard/productos/productos/list",
      //       component:Productos,
      //       menu:true,
      //       private:true,
      //       items:[],
      //     },
      //     {
      //       name:"Formulario de productos",
      //       slug:"/dashboard/productos/productos/list/:id",
      //       component:ProductoAdd,
      //       menu:true,
      //       private:true,
      //       items:[],
      //     },
      //   ],
      // },
      {
        name:"Pagos",
        slug:"/dashboard/payu",
        component:Productos,
        menu:true,
        private:true,
        icon:<LanIcon/>,
        items:[
          {
            name:"Botones",
            slug:"/dashboard/payu/botones/*",
            url:"/dashboard/payu/botones/list",
            component:Productos,
            menu:true,
            private:true,
            items:[],
          },
          {
            name:"Crear botón de pago",
            slug:"/dashboard/payu/botones/list/:id",
            component:ProductoAdd,
            menu:true,
            private:true,
            items:[],
          },
        ],
      },
      {
        name:"Publicidad",
        slug:"/dashboard/payu",
        component:Productos,
        menu:true,
        private:true,
        icon:<SettingsIcon/>,
        items:[
          {
            name:"Banners Home",
            slug:"/dashboard/payu/publicaciones/list/*",
            url:"/dashboard/payu/publicaciones/list",
            component:ProductosPublicaciones,
            menu:true,
            private:true,
            items:[],
          },
          {
            name:"Publicidad Home",
            slug:"/dashboard/payu/publicaciones2/list/*",
            url:"/dashboard/payu/publicaciones2/list",
            component:ProductosPublicaciones,
            menu:true,
            private:true,
            items:[],
          },
          // {
          //   name:"Publicaciones",
          //   slug:"/dashboard/productos/publicaciones/list/*",
          //   component:ProductosPublicaciones,
          //   menu:false,
          //   private:true,
          //   items:[],
          // },
          // {
          //   name:"Sliders",
          //   slug:"/dashboard/productos/publicaciones/create",
          //   url:"/dashboard/productos/publicaciones/create",
          //   component:ProductosPublicaciones,
          //   menu:true,
          //   private:true,
          //   items:[],
          // },
        ],
      },
    ],
  },

  {
    name:"Configuración",
    slug:"/dashboard/configuracion",
    component:Productos,
    menu:true,
    private:true,
    icon:<SettingsIcon/>,
    items:[
      {
        name:"Plataformas",
        slug:"/dashboard/configuracion",
        component:Productos,
        menu:true,
        private:true,
        icon:<LanIcon/>,
        items:[
          {
            name:"Empresas",
            slug:"/dashboard/configuracion/empresas/*",
            url:"/dashboard/configuracion/empresas/list",
            component:Productos,
            menu:true,
            private:true,
            items:[],
          },
        ],
      },
    ],
  },
  // {
  //   name:"Ventas",
  //   slug:"/dashboard/ventas",
  //   component:Ventas,
  //   menu:false,
  //   private:true,
  //   icon:<LeaderboardIcon/>,
  //   menu_simple:true,
  //   items:[
  //     {
  //       name:"Facturación",
  //       slug:"/dashboard/ventas/facturacion",
  //       component:Ventas,
  //       menu:true,
  //       private:true,
  //       items:[],
  //     },
  //     // {
  //     //   name:"Descuentos",
  //     //   slug:"/dashboard/ventas/descuentos",
  //     //   component:Ventas,
  //     //   menu:true,
  //     //   private:true,
  //     //   items:[],
  //     // },
  //     // {
  //     //   name:"Otros Ingresos",
  //     //   slug:"/dashboard/ventas/otrosingresos",
  //     //   component:Ventas,
  //     //   menu:true,
  //     //   private:true,
  //     //   items:[],
  //     // },
  //   ],
  // },

]
