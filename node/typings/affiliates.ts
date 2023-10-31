export type Maybe<T> = T | null

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
  id: string
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

export type AffiliateLead = {
  affiliateId: string
  affiliateStartDate: string
}

export type GetOrderFormInput = {
  orderFormId: string
}

export interface Affiliates {
  slug: string
  name: string
  storeName?: string
  email: string
  phone?: string
  refId?: string
  address?: {
    city?: string
    complement?: string
    country?: string
    neighborhood?: string
    number?: string
    postalCode?: string
    reference?: string
    state?: string
    street?: string
    [k: string]: unknown
  }
  document?: string
  documentType?: string
  isApproved: boolean
  marketing?: {
    instagram?: string
    whatsapp?: string
    facebook?: string
    gtmId?: string
    [k: string]: unknown
  }
  [k: string]: unknown
}

export interface UserAffiliation {
  email: string
  affiliateId?: string
  affiliateStartDate?: string
  [k: string]: unknown
}
