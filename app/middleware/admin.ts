export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  
  if (!user.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  // If already logged in, no need to see the login page again
  if (user.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
