interface ReducerAction {
  type: 'clear' | 'submit' | 'change'
  value?: string
}

interface ReducerState {
  inputValue: string
}

export function useSearch(setOrderId: (orderId: string) => void) {
  return function reducer(
    rState: ReducerState,
    action: ReducerAction
  ): ReducerState {
    switch (action.type) {
      case 'change': {
        const { value = '' } = action

        return {
          ...rState,
          inputValue: value,
        }
      }

      case 'clear': {
        setOrderId('')

        return {
          inputValue: '',
        }
      }

      case 'submit': {
        setOrderId(rState.inputValue)

        return {
          ...rState,
        }
      }

      default: {
        return rState
      }
    }
  }
}
