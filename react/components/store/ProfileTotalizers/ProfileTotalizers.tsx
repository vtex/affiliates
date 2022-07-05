import React from 'react'

import ProfileTotalizerItem from '../ProfileTotalizerItem'
import useAffiliate from '../../../context/useAffiliate'

function ProfileTotalizer() {
  const affiliate = useAffiliate()

  return (
    <section className="flex justify-between mw9 ba b--light-gray br3 center mr-auto ml-auto my-3">
      <ProfileTotalizerItem
        value={
          affiliate?.totalizersProfile
            ? affiliate?.totalizersProfile?.totalOngoing
            : 0
        }
        type="approved"
        color="yellow"
      />
      <ProfileTotalizerItem
        value={
          affiliate?.totalizersProfile
            ? affiliate?.totalizersProfile?.totalCancelled
            : 0
        }
        type="cancelled"
        color="red"
      />
      <ProfileTotalizerItem
        value={
          affiliate?.totalizersProfile
            ? affiliate?.totalizersProfile?.totalInvoiced
            : 0
        }
        type="invoiced"
        color="green"
      />
    </section>
  )
}

export default ProfileTotalizer
