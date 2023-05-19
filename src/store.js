import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.card = [];
    this.cartItem = { total: 0, list: [] };
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  getCart() {
    return this.cartItem;
  }
  getCartItem(code) {
    let filteredItem = this.findItem(code);
    return filteredItem;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  setCart(newCartItem) {
    const currentTotal = this.cartItem.total || 0;
    const itemPrice = newCartItem.price; 

    const newTotal = currentTotal + itemPrice;

    this.cartItem = {
      total: newTotal,
      list: [...this.cartItem.list, newCartItem.code],
    };

    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
    addItem() {
      this.setState({
        ...this.state,
        list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
      })
    };

    addItemToCart(item) {
      const code = item.code;
      const updatedList = this.state.list.map((listItem) => {
        if (listItem.code === code) {
          return {
            ...listItem,
            selected: !listItem.selected,
            count: listItem.selected ? listItem.count : listItem.count + 1 || 1,
          };
        }
        return listItem;
      });
    
      const currentTotal = this.cartItem.total || 0;
      const updatedTotal = currentTotal + item.price;
    
      const updatedCartItem = {
        total: updatedTotal,
        list: [...this.cartItem.list, item.code],
      };
  
      this.setCart(updatedCartItem);
    }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };
  findItem(code) {
    return this.state.list.filter((item) => item.code === code);
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
