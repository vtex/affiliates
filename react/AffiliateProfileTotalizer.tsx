import React from "react";
import AffiliateProvider from './context/AffiliateProvider'
import TestTotalizer from "./components/store/TestTotalizer";

function AffiliateProfileTotalizer() {

  return(
    <AffiliateProvider>
      <div>
        <TestTotalizer />
      </div>
    </AffiliateProvider>
  )
}
export default AffiliateProfileTotalizer
