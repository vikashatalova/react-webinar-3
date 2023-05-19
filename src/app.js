import React, {useCallback, useState} from 'react';
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
  console.log(cart);
  const [isOpen, setOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);


  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
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
      console.log('Товар добавлен:', item);
    },[cart, modalItems]),
  }

  const getCartItem = useCallback((code) => {
    store.getCartItem(code);
  },[store]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenModal={() => openModal()}>
        <Count count={cart.list.length} sum={cart.total}/>
      </Controls>
      {isOpen && <Modal 
              onCloseModal={() => closeModal()} 
              item={modalItems} 
              onAddItem={callbacks.addItemToCart} 
              getCartItem={getCartItem}
      />}
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            onAddItem={callbacks.addItemToCart}
            />
    </PageLayout>
  );
}

export default App;
