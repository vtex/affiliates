import React from 'react'
import { useFullSession, useUpdateSession } from 'vtex.session-client'
import { canUseDOM } from 'vtex.render-runtime'

const TestAdmin = () => {
  const { loading, data, error } = useFullSession()
  const updateSession = useUpdateSession()

  const dataDom = canUseDOM
  ? window.localStorage.getItem('foo')
  : ''

  console.log("dataDom --->", dataDom)

  if (loading) {
    return <>Session is loading</>
  }

  if (error) {
    return <>Session has errors</>
  }

  console.log({ session: data?.session })
  const accountName = data?.session.namespaces.account.accountName.value
  return <h1>Session is ready {accountName} <button onClick={() =>
    updateSession({
      variables: {
        fields: { foo: 'bar', baz: 123 },
      },
    })
  }>Session</button></h1>
}

export default TestAdmin
