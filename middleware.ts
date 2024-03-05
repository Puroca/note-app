import { auth } from '@/auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_ROUTE,
  authRoutesPrefix,
  noteRoutePrefix,
} from '@/routes'

export default auth((req) => {
  const { nextUrl } = req
  const { auth } = req
  const isAuthRoute = nextUrl.pathname.startsWith(authRoutesPrefix)
  const isProtectedRoute = nextUrl.pathname.startsWith(noteRoutePrefix)
  const routePathname = nextUrl.pathname
  const params = nextUrl.searchParams
  const callbackRouteExist = params.has('callback')

  if (!!auth && isAuthRoute) {
    if (!!callbackRouteExist) {
      const callbackRoute = params.get('callback')
      return Response.redirect(new URL(`${callbackRoute}`, nextUrl))
    }
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!auth && isProtectedRoute) {
    return Response.redirect(
      new URL(`${LOGIN_ROUTE}?callback=${routePathname}`, nextUrl)
    )
  }

  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  unstable_allowDynamic: [
    '/node_modules/mongoose/dist/browser.umd.js',
    './lib/dbconnect.ts',
    './auth.ts',
    '/auth.ts',
    '/lib/utilities.js', // allows a single file
    '/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
  ],
}
