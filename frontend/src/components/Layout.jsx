// import { useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, [pathname]);
//   return null;
// }

// export default function Layout() {
//   return <><ScrollToTop /><Header /><Outlet /><Footer /></>;
// }


import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContactButtons from "./FloatingContactButtons";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <Outlet />

      <FloatingContactButtons />

      <Footer />
    </>
  );
}