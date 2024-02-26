import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  disabled?: boolean; //Loading durante envio do formulário
};

const Modal = ({ isOpen, onClose, title, body, disabled }: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 ${
        showModal ? "opacity-100" : "hidden opacity-0"
      }`}
    >
      {/*<!-- Main modal -->*/}
      <div
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full
        ${showModal ? "opacity-100" : "hidden opacity-0"}`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/*CONTENT*/}
          <div className="relative bg-white rounded-md shadow">
            {/*HEADER*/}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {/*CLOSE BUTTON*/}
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition"
                onClick={() => handleClose()}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/*BODY*/}
            <div className="relative p-4 md:p-5">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
