import React, { useEffect } from "react";

function useOutsideClick(
  insideRef: React.RefObject<Element>,
  callback: () => void,
  outsideRef?: React.RefObject<Element>
): void {
  const handleClick = (event: MouseEvent): void => {
    event.stopPropagation();

    if (!outsideRef) {
      if (
        insideRef.current &&
        !insideRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    } else if (
      insideRef.current &&
      !insideRef.current.contains(event.target as Node) &&
      outsideRef.current &&
      outsideRef.current.contains(event.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}

export default useOutsideClick;
