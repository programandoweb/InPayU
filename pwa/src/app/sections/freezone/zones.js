import Inicio from '../home/Inicio';
import Seeker from '../../../components/Plugins/Seeker';
import Blog from '../blog';
import Contactos from '../contactos';
import ListaCategorias from '../../../components/Plugins/SubmenuListaCategorias';
import Categoria from '../categorias';
import ShoppingCart from '../shoppingCart';



export const modules=[
  {
    name:"Home",
    slug:"/",
    component:Inicio,
    menu:true,
    private:false,
    items:[],
  },
  // {
  //   name:"Categorías",
  //   slug:"/categorias",
  //   component:ListaCategorias,
  //   params:{
  //     slug:"/categorias/",
  //     system:"categorias",
  //   },
  //   menu:true,
  //   plugins:true,
  //   plugins_mobile:false,
  //   private:false,
  //   items:[],
  // },
  {
    name:"Categoria",
    slug:"/categorias/*",
    component:Categoria,
    menu:false,
    plugins:false,
    plugins_mobile:false,
    private:false,
    items:[],
  },
  {
    name:"Contactos",
    slug:"/contacto/*",
    url:"/contacto",
    component:Contactos,
    menu:true,
    plugins:false,
    plugins_mobile:false,
    private:false,
    items:[],
  },
  {
    name:"Pago de compras",
    slug:"/shoppingCart/*",
    url:"/shoppingCart",
    component:ShoppingCart,
    menu:false,
    plugins:false,
    plugins_mobile:false,
    private:false,
    items:[],
  },
  {
    name:"Blog",
    slug:"/blog/*",
    component:Blog,
    menu:false,
    private:true,
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
]
