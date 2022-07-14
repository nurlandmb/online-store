import React from 'react';
import telegramLogo from '../../src/img/telegram.png'
import instaLogo from '../../src/img/instagram.png'
import phone from '../../src/img/telephone.png'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer__title">Связаться с нами</h2>
        <nav className="footer__social">
          <Link to="/" className="footer__social-item">
            <img src={telegramLogo} alt="instagram" />
            <span className="footer__social-item__text">Telegram</span>
          </Link>
          <Link to="/" className="footer__social-item">
            <img src={instaLogo} alt="instagram" />
            <span className="footer__social-item__text">Instagram</span>
          </Link>
          <Link to="/" className="footer__social-item">
            <img src={phone} alt="instagram" />
            <span className="footer__social-item__text">+7 776 211 5300</span>
          </Link>
        </nav>
        <p className="footer__copy">© 2022 Restaurant. Все права защищены</p>
      </div>
    </footer>
  );
}

export default Footer;
