import React from 'react';

export default function ModalForm({ componentForm, modalState, handleClose }) {
  return (
    <>
      {modalState && (
        <div classname="backdrop" onClick={handleClose}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-light p-5 rounded-md shadow-lg">
              <button className="absolute top-2 right-2 text-gray-300 hover:text-gray-600" onClick={handleClose}>
                &times;
              </button>
              {componentForm}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
