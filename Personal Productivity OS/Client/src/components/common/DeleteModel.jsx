import React from "react";

const DeleteModel = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 right-0 z-999 flex flex-col justify-center items-center w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden bg-opacity-50 bg-gray-200/50 backdrop-blur-sm">
      {/*Model content */}
      <div className="relative md:w-[700px] min-w-[250px] max-h-[250px]">
        <div className="relative bg-white m-4 rounded-lg shadow-sm">
          {/*Model header */}
          <div className="flex items-center justify-between p-4 md:p-5">
            <h1 className="text-2xl">{title}</h1>
            <button
              type="button"
              className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-400 dark:hover:text-white cursor-pointer absolute right-0 top-0"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmls="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Model body */}
          <div className="p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
