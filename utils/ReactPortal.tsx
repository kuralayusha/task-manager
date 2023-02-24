// src/components/ReactPortal.js
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  wrapperId: string;
};

const ReactPortal = ({ children, wrapperId }: Props) => {
  return createPortal(children, document.getElementById(wrapperId)!);
};
export default ReactPortal;
