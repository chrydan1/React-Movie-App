import React, { useEffect, useState } from "react";
import "../App.css";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <footer className="footer">
      <p className="footer__name">Built by Christian Avila Pertuz</p>
      <div className="footer__links">
        <a
          href="https://github.com/chrydan1/React-Movie-App"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          GitHub
        </a>
        <a
          href="https://chrydan.com/software"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/christian-daniel-avila-pertuz-/"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          LinkedIn
        </a>
        <button className="footer__button" onClick={() => setIsModalOpen(true)}>
          How I built this
        </button>
      </div>
      {isModalOpen && (
        <div className="modal__overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal__close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>How I built this</h2>
            <ul>
              <li>
                Forked an open-source React + TMDB movie search app as a
                learning base
              </li>
              <li>
                Secured the API key using environment variables instead of
                hardcoding it
              </li>
              <li>
                Redesigned the visual identity: custom color palette,
                typography, and a signature film-strip element
              </li>
              <li>
                Refactored all CSS class names to follow the BEM naming
                convention
              </li>
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;
