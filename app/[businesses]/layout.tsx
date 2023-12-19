import React, {PropsWithChildren} from "react";

export const metadata = {
  title: 'Manage business',
  description: '',
}

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="wtf flex flex-col items-center p-4 container m-auto">
      {children}
    </div>
  )
}

export default RootLayout;