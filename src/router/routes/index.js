import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  //admin
  {
    path: '/admin/home',
    component: lazy(() => import('../../views/admin/Home'))
  },
  {
    path: '/admin/categorias/index',
    component: lazy(() => import('../../views/admin/categorias/index'))
  },
  {
    path: '/admin/categorias/cadastrar',
    component: lazy(() => import('../../views/admin/categorias/cadastrar'))
  },
  {
    path: '/admin/categorias/editar/:id',
    component: lazy(() => import('../../views/admin/categorias/editar'))
  },
  {
    path: '/admin/afiliados/index',
    component: lazy(() => import('../../views/admin/afiliado/index'))
  },
  {
    path: '/admin/afiliados/cadastrar',
    component: lazy(() => import('../../views/admin/afiliado/cadastrar'))
  },
  {
    path: '/admin/afiliados/editar/:id',
    component: lazy(() => import('../../views/admin/afiliado/editar'))
  },
  {
    path: '/admin/cupom/index',
    component: lazy(() => import('../../views/admin/cupom/index'))
  },
  {
    path: '/admin/cupom-resgatado/index',
    component: lazy(() => import('../../views/admin/cuponsRegatados/index'))
  },
  //---------

  //afiliado
  {
    path: '/afiliado/home',
    component: lazy(() => import('../../views/afiliado/Home'))
  },
  {
    path: '/afiliado/perfil',
    component: lazy(() => import('../../views/afiliado/perfil/index'))
  },
  {
    path: '/afiliado/cupons/index',
    component: lazy(() => import('../../views/afiliado/cupons/index'))
  },
  {
    path: '/afiliado/cupons/cadastrar',
    component: lazy(() => import('../../views/afiliado/cupons/cadastrar'))
  },
  {
    path: '/afiliado/cupons-resgatados/index',
    component: lazy(() => import('../../views/afiliado/cuponsResgatados/index'))
  },
  {
    path: '/afiliado/cupons-resgatados/cadastrar',
    component: lazy(() => import('../../views/afiliado/cuponsResgatados/cadastrar'))
  },
//---

{
  path: '/error',
    component: lazy(() => import('../../views/Error')),
      layout: 'BlankLayout'
}
]

export { DefaultRoute, TemplateTitle, Routes }
