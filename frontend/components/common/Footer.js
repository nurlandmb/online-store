import React from 'react';
import telegramLogo from '../../public/images/telegram.png';
import instaLogo from '../../public/images/instagram.png';
import phone from '../../public/images/telephone.png';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer__title">Связаться с нами</h2>
        <nav className="footer__social">
          <Link href="/" className="footer__social-item">
            <Image src={telegramLogo} alt="instagram" />
            <span className="footer__social-item__text">Telegram</span>
          </Link>
          <Link href="/" className="footer__social-item">
            <Image src={instaLogo} alt="instagram" />
            <span className="footer__social-item__text">Instagram</span>
          </Link>
          <Link href="/" className="footer__social-item">
            <Image src={phone} alt="instagram" />
            <span className="footer__social-item__text">+7 776 211 5300</span>
          </Link>
        </nav>
        <p className="footer__copy">© 2022 Restaurant. Все права защищены</p>
      </div>
    </footer>
  )
}

export default Footer;
