type Address = {
  city?: string
  complement?: string
  country?: string
  neighborhood?: string
  number?: string
  postalCode?: string
  reference?: string
  state?: string
  street?: string
}

type Social = {
  instagram?: string
  whatsapp?: string
  facebook?: string
}

export type AffiliateInput = {
  slug: string
  name: string
  email: string
  phone?: string
  address?: Address
  cpf?: string
  cnpj?: string
  social?: Social
  isApproved: boolean
}
