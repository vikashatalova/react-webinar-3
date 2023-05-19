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
  const [isOpen, setOpen] = useState(false);


  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store])
  }

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onAdd={callbacks.onAddItem} onOpenModal={() => openModal()}>
        <Count count={'count'} sum={'sum'}/>
      </Controls>
      {isOpen && <Modal onCloseModal={() => closeModal()} item={list}/>}
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}/>
    </PageLayout>
  );
}

export default App;
