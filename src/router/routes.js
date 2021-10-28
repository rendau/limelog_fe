import { cns } from 'boot/cns'

function formatRoutes (routes) {
  if (!routes || !routes.length) return

  for (let i = 0; i < routes.length; i++) {
    let r = routes[i]

    r.props = r.props || {}

    if (r.name) {
      r.props.rn = r.name
    }

    formatRoutes(r.children)
  }
}

export default function ({ store }) {
  let routes = [
    {
      path: '/',
      meta: { requiresAuth: true },
      component: () => import('layouts/Layout.vue'),
      redirect: { name: cns.indexRouteName },
      children: [
        {
          path: 'index',
          name: cns.indexRouteName,
          component: () => import('pages/Index.vue'),
        },
      ],
    },
    {
      path: '/auth',
      meta: { restrictAuth: true },
      name: cns.authRouteName,
      component: () => import('pages/Auth.vue'),
    },
  ]

  // Always leave this as last one
  routes.push({
    path: '*',
    redirect: '/',
  })

  formatRoutes(routes)

  return routes
}
