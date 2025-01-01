import { useState } from 'react';

const modals = ['post'] as const;
type IModals = (typeof modals)[number];


export function useModalState() {
  const [modalsState, setModalsState] = useState<Map<IModals, boolean>>(
    new Map(modals.map((item) => [item, false]))
  );

  function openModal(modal: IModals) {

    const updatedState = new Map(modalsState);
    

    for (const key of updatedState.keys()) {
      updatedState.set(key, false);
    }
    
    updatedState.set(modal, true);
    setModalsState(updatedState);
  }

  function closeModel(modal: IModals) {
    const updatedState = new Map(modalsState);
    updatedState.set(modal, false);
    console.log('Updated Modal State:', modalsState); // Debug
    setModalsState(updatedState);
  }

  

  function getModelState() {
    return modalsState;
  }

  return {
    modalsState,
    openModal,
    closeModel,
    getModelState,
  };
}
