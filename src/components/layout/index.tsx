import { FunctionComponent, ReactNode } from "react";
import "./styles.css";

type LayoutProps = {
  left: ReactNode;
  main: ReactNode;
};

export const Layout: FunctionComponent<LayoutProps> = ({ main, left }) => {
  return (
    <div className="layout">
      <div className="left">{left}</div>
      <div className="main">{main}</div>
    </div>
  );
};
