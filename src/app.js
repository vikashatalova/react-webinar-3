import React, {useCallback, useState, useEffect} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Count from './components/count';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getCart();
  const [count, setCount] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      const updatedModalItems = modalItems.filter((item) => item.code !== code);
      setModalItems(updatedModalItems);
      store.deleteItem(code);

      updateCartData();
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),
    addItemToCart: useCallback((item) => {
      store.addItemToCart(item);
      setModalItems([...modalItems, item]);
      updateCartData();
    },[cart, modalItems, list, updateCartData]),
  }

  const updateCartData = useCallback(() => {
    const count = cart.list.length;
    setCount(count);
  }, [cart, store]);

  const getCartItem = useCallback((code) => {
    return store.getCartItem(code);
  },[store]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    updateCartData();
  }, [updateCartData]);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenModal={() => openModal()}>
        <Count count={count} sum={cart.total}/>
      </Controls>
      {isOpen && <Modal 
              onCloseModal={() => closeModal()} 
              item={modalItems} 
              onDelete={callbacks.onDeleteItem}
              getCartItem={getCartItem}
      />}
      <List list={list}
            onSelectItem={callbacks.onSelectItem}
            onAddItem={callbacks.addItemToCart}
            />
    </PageLayout>
  );
}

export default App;
