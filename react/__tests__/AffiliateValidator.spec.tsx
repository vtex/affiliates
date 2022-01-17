/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { act, render } from '@vtex/test-tools/react'
import { MockedProvider, wait } from '@apollo/react-testing'

import { mocks as queryMocks } from '../__mocks__/isAffiliateValidQuery'
import { mocks as mutationMocks } from '../__mocks__/setOnOrderFormMutation'
import { setOrderFormSpy } from '../__mocks__/vtex.order-manager/OrderForm'
import AffiliateValidator from '../AffiliateValidator'

describe('Affiliate Validator', () => {
  const MockedValidComponent = () => <div data-testid="validDiv" />
  const MockedInvalidComponent = () => <div data-testid="invalidDiv" />

  const renderTest = async (path: string) => {
    Object.defineProperty(window, 'location', {
      get() {
        return { pathname: path }
      },
    })

    const renderObject = render(
      <MockedProvider
        mocks={[...queryMocks, ...mutationMocks]}
        addTypename={false}
      >
        <AffiliateValidator
          Valid={MockedValidComponent}
          Invalid={MockedInvalidComponent}
        />
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
    })

    return renderObject
  }

  it.todo('Test query loading state')

  it('Should render Valid Component if the slug in the URL is valid', async () => {
    const { getByTestId } = await renderTest('/validId')

    expect(getByTestId('validDiv')).toBeInTheDocument()
  })

  it('Should render Invalid Component if the slug in the URL is invalid', async () => {
    const { getByTestId } = await renderTest('/invalidId')

    expect(getByTestId('invalidDiv')).toBeInTheDocument()
  })

  it('Should render Invalid Component if query throws an error', async () => {
    const { getByTestId } = await renderTest('/malformedId')

    expect(getByTestId('invalidDiv')).toBeInTheDocument()
  })

  it('Should call mutation to set affiliateId on orderForm when the slug is valid', async () => {
    await renderTest('/validId')

    const mutationSpy = mutationMocks[0].result

    expect(mutationSpy).toHaveBeenCalled()
  })

  it('Should update OrderFormContext after sucessfully calling the mutation', async () => {
    await renderTest('/validId')

    const mutationMockedResult =
      mutationMocks[0].result().data.setAffiliateOnOrderForm

    expect(setOrderFormSpy).toHaveBeenCalledWith(mutationMockedResult)
  })
})
