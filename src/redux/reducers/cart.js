const initialState = {
  items: {},
  totalPrice: 0, // итоговая сумма добавленных пицц
  totalCount: 0, // количество пицц
};

const getTotalPrice = (arr) => {
  return arr.reduce((sum, obj) => obj.price + sum, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], items);
      const totalPricePizzas = getTotalPrice(allPizzas);

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: totalPricePizzas,
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    default:
      return state;
  }
};
export default cart;
