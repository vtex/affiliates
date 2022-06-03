export interface Affiliate {
  id?: string
  name?: string
  storeName?: string
  email?: string
  slug?: string
  refId?: string
  phone?: string
  isApproved: boolean
  address?: Address
  document?: string
  documentType?: string
  marketing?: Marketing
}

interface Address {
  city: string
  country: string
  neighborhood: string
  number: number
  postalCode: string
  reference: string
  street: string
  state: string
}

interface Marketing {
  instagram: string
  facebook: string
  whatsapp: string
  gtmId: string
}
