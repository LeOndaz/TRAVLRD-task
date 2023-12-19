import React from "react";

interface IProps {
  message?: string;
}

const PageNotFound: React.FC<IProps> = ({message}) => {
  return <p>{message || "Page not found."}</p>
}
export default PageNotFound;