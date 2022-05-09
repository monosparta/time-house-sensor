import React from 'react'
import { CollectionCreateForm } from "./CollectionCreateForm";
function Modal({
    isModalVisible1,
    onFinish,
    onCancel,
    whichModal,
    selectedChair,
    member,
  }) {
  return (
    <div>  
            <CollectionCreateForm
            visible={isModalVisible1}
            onFinish={(e) => onFinish(e, 1)}
            onCancel={() => onCancel(1)}
            whichModal={1}
            chairInfo={selectedChair}
            member={""}
        />
  </div>
  )
}

export default Modal