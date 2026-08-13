import { SOCIAL_LINKS } from '../lib/socialLinks';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../lib/socialIcons';

/** Íconos flotantes de redes sociales, apilados justo arriba del botón de WhatsApp. */
const FloatingSocialButtons = () => (
  <div className="social-float-stack">
    <a
      href={SOCIAL_LINKS.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="social-float-btn social-float-instagram"
      aria-label="Instagram"
    >
      <InstagramIcon size={22} />
    </a>
    <a
      href={SOCIAL_LINKS.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="social-float-btn social-float-facebook"
      aria-label="Facebook"
    >
      <FacebookIcon size={22} />
    </a>
    <a
      href={SOCIAL_LINKS.tiktok}
      target="_blank"
      rel="noopener noreferrer"
      className="social-float-btn social-float-tiktok"
      aria-label="TikTok"
    >
      <TikTokIcon size={22} />
    </a>
  </div>
);

export default FloatingSocialButtons;
