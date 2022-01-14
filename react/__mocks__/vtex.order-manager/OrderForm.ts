export const setOrderFormSpy = jest.fn()

export const useOrderForm = () => {
  return {
    orderForm: { id: 'mockedOrderFormId' },
    setOrderForm: setOrderFormSpy,
  }
}
