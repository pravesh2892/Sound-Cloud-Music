import React from "react";
import "../../styles/header.css";

function Footer() {
  const hrStyle = {
    borderColor: "#f50", 
  };

  return (
    <>
      <footer>
        <div className="container-xxl p-1  bg-dark text-white  fixed-bottom">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-6 col-lg-3 text-decoration-none text-primar">
                  <a
                    className="link-light link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                  >
                    About Us
                  </a>
                </div>

                <div className="col-6 col-lg-3">
                  <a
                    className="link-light link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </div>

                <div className="col-6 col-lg-3">
                  <a
                    className="link-light link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="row">
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://www.facebook.com/SoundCloud/"
                      >
                        <i className="fab fa-facebook-f fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://www.instagram.com/soundcloud/?hl=en"
                      >
                        <i className="fab fa-instagram fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://www.youtube.com/c/SoundCloud"
                      >
                        <i className="fab fa-youtube fontawesome-style"></i>
                      </a>
                    </div>
                    <div className="col-3 mx-auto">
                      <a
                        className="link-light"
                        href="https://twitter.com/SoundCloud?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                      >
                        <i className="fab fa-twitter fontawesome-style"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
              <div className="mt-1">
                <p className="main-hero-para text-center w-100">
                  Copyright @ 2023 Sound Cloud. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
   
  );
}

export default Footer;
