import { WithSession } from './withSession'
import { WithSender } from './withSender'
import { CheckAdminAccess } from './checkAdminAccess'
import { CheckUserAccess } from './checkUserAccess'

export const schemaDirectives = {
  checkAdminAccess: CheckAdminAccess as any,
  checkUserAccess: CheckUserAccess as any,
  withSession: WithSession,
  withSender: WithSender,
}
