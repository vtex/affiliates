import React from 'react'
import { act, render } from '@vtex/test-tools/react'
import { MockedProvider, wait } from '@apollo/react-testing'

// eslint-disable-next-line jest/no-mocks-import
import { mocks } from '../__mocks__/isAffiliateValidQuery'
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
      <MockedProvider mocks={mocks} addTypename={false}>
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
})
