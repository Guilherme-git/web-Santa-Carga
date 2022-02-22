import { useEffect } from 'react'
import { Disc } from 'react-feather'

const rotas = JSON.parse(localStorage.getItem("tipo")) === "admin" ? [
  {
    id: 'admin/home',
    title: 'Home',
    icon: <Disc size={20} />,
    navLink: '/admin/home'
  },
  {
    id: 'admin/afiliados/index',
    title: 'Afiliados',
    icon: <Disc size={20} />,
    navLink: '/admin/afiliados/index'
  },
  {
    id: '/admin/cupom/index',
    title: 'Cupons',
    icon: <Disc size={20} />,
    navLink: '/admin/cupom/index'
  },
  {
    id: '/admin/cupom-resgatado/index',
    title: 'Cupons resgatados',
    icon: <Disc size={20} />,
    navLink: '/admin/cupom-resgatado/index'
  },
  {
    id: 'admin/categorias/index',
    title: 'Categorias',
    icon: <Disc size={20} />,
    navLink: '/admin/categorias/index'
  }
] : [
    {
      id: 'afiliado/home',
      title: 'Home',
      icon: <Disc size={20} />,
      navLink: '/afiliado/home'
    },
    {
      id: '/afiliado/cupons/index',
      title: 'Cupons',
      icon: <Disc size={20} />,
      navLink: '/afiliado/cupons/index'
    },
    {
      id: '/afiliado/cupons-resgatados/index',
      title: 'Cupons resgatados',
      icon: <Disc size={20} />,
      navLink: '/afiliado/cupons-resgatados/index'
    }
  ]
export default rotas