import React from 'react'
import { Modal, ActionMenu, IconOptionsDots, Spinner } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'
import type { QueryAffiliateOrderArgs } from 'vtex.affiliates-commission-service'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { storeMessages } from '../../../utils/messages'
import GET_ORDER from '../../../graphql/getAffiliateOrder.graphql'
import useDisclosure from '../../../utils/useDisclosure'
import type { AffiliateOrderQueryReturnType } from '../../../typings/tables'

interface Props {
  id: string
}

function ProfileModal(props: Props) {
  const { id } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const intl = useIntl()
  const {
    culture: { currency },
  } = useRuntime()

  const { data, loading } = useQuery<
    AffiliateOrderQueryReturnType,
    QueryAffiliateOrderArgs
  >(GET_ORDER, {
    variables: {
      orderId: id,
    },
  })

  const orderSkus = data?.affiliateOrder.orderItems

  return (
    <>
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <IconOptionsDots />,
        }}
        options={[
          {
            label: intl.formatMessage(
              storeMessages.affiliateProfileOrderDetails
            ),
            onClick: onOpen,
          },
        ]}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="small"
        aria-label="Orders Details"
        aria-describedby="modal-order-details"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <header className="mb-3">
              <h2 className="f3">{`${intl.formatMessage(
                storeMessages.affiliateProfileOrderTitle
              )} ${id}`}</h2>
            </header>
            <section>
              <h3 className="f4 bg-rebel-pink pa3 white-90 mb-0">
                {intl.formatMessage(storeMessages.affiliateProfileOrderItems)}
              </h3>
              {orderSkus?.map((item) => {
                return (
                  <div
                    className="bl-s b--rebel-pink mb-3 bg-light-silver w-100 flex p-2"
                    key={`item-${item.skuId}`}
                  >
                    <img
                      className="pr3"
                      src={item.skuImageUrl}
                      alt={`${item.skuId}`}
                    />
                    <div className="flex flex-row-s justify-between w-100">
                      <div className="flex flex-column-s justify-center-s ml3-ns w-50">
                        <h5 className="ma0-m">{item.skuName}</h5>
                        <p className="ma0-m">
                          <strong>
                            {intl.formatMessage(
                              storeMessages.affiliateProfileOrderItemsPrice
                            )}
                          </strong>
                          {intl.formatNumber(item.price / 100, {
                            style: 'currency',
                            currency,
                          })}
                        </p>
                      </div>
                      <div className="flex flex-column-s justify-center-s ml3-ns w-50">
                        <p className="ma0-m">
                          <strong>
                            {intl.formatMessage(
                              storeMessages.affiliateProfileOrderItemsCommission
                            )}
                          </strong>
                          {intl.formatNumber(
                            data?.affiliateOrder?.orderTotal
                              ? data.affiliateOrder.orderTotal *
                                  (item.commission / 100)
                              : 0,
                            {
                              style: 'currency',
                              currency,
                            }
                          )}
                        </p>
                        <p className="ma0-m">
                          <strong>
                            {intl.formatMessage(
                              storeMessages.affiliateProfileOrderItemsQuantity
                            )}
                          </strong>
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>
          </>
        )}
      </Modal>
    </>
  )
}

export default ProfileModal
