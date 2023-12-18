import React, {PropsWithChildren} from "react";


// HTML is borrowed from tailwind website and converted manually to JSX

interface IProps extends PropsWithChildren{
  show: boolean;
  title: string;
  onClose: () => void;
  footer: React.ReactNode;
}

const Modal: React.FC<IProps> = ({children, footer, onClose, title, show}) => {
  return (
    <>
          {show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    {/* should be an icon, ignored intentionally for the sake of the task */}
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  {children}
                </div>
                {footer}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
export default Modal;