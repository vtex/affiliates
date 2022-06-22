/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Table } from 'vtex.styleguide'

import useAffiliate from '../../../context/useAffiliate'

function ProfileTable() {
  const affiliate = useAffiliate()

  console.log(affiliate)

  const columns = {
    properties: {
      orderId: {
        title: 'Id',
      },
      orderDate: {
        title: 'Data',
      },
      orderTotal: {
        title: 'Venda',
      },
      orderTotalCommission: {
        title: 'Comissão',
      },
      status: {
        title: 'Status',
      },
    },
  }

  return (
    <section className="mw9 mr-auto ml-auto">
      {affiliate.orders ? (
        <Table
          className="mr-auto ml-auto"
          schema={columns}
          items={affiliate.orders}
          onRowClick={() => {
            alert(`you just clicked the row with oi`)
          }}
          fullWidth
          density="high"
          indexColumnLabel="Index"
        />
      ) : (
        <></>
      )}
    </section>
  )
}

export default ProfileTable
