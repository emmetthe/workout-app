import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ModalForm({ componentForm, modalState, handleClose }) {
  return (
    <>
      {modalState && (
        <div className="backdrop" onClick={handleClose}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="relative bg-white p-6 rounded-md shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
            >
              {/* Close Button */}
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
                <FaTimes className="h-5 w-5" />
              </button>
              {componentForm}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
