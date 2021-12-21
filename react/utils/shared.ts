export const getSlug = () => {
  const splitPathname = window.location?.pathname.split('/')

  return splitPathname && splitPathname[splitPathname.length - 1]
}
