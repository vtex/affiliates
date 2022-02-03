export const getSlug = () => {
  const splitPathname = window.location?.pathname.split('/')

  return splitPathname && splitPathname[splitPathname.length - 1]
}

export const setSortOrder = (sortOrder: string | undefined) => {
  return sortOrder === 'DSC' ? 'DESC' : 'ASC'
}
