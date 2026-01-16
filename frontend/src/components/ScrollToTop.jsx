import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly reset scroll to the top-left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every time the URL path changes

  return null;
};

export default ScrollToTop;