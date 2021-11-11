export const json = jest
  .fn()
  .mockReturnValueOnce({
    slug: 'loja a',
    name: 'Loja A',
    email: 'loja@email.com',
  })
  .mockReturnValue({
    slug: 'lojaa',
    name: 'Loja A',
    email: 'loja@email.com',
  })
