import React from "react";
import useAffiliate from '../../../context/useAffiliate'

function TestTotalizer(){
  const affiliate = useAffiliate()

  console.log(`orders`, affiliate.orders)

  return(
    <h1>oi</h1>
  )
}

export default TestTotalizer
