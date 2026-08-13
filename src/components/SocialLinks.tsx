import { SOCIAL_LINKS } from '../lib/socialLinks';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../lib/socialIcons';

// Fila de íconos discretos, usada en el footer.
const SocialLinks = () => (
  <div style={{ display: 'flex', gap: '0.75rem' }}>
    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="icon-toggle-btn" aria-label="Instagram">
      <InstagramIcon />
    </a>
    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="icon-toggle-btn" aria-label="Facebook">
      <FacebookIcon />
    </a>
    <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="icon-toggle-btn" aria-label="TikTok">
      <TikTokIcon />
    </a>
  </div>
);

export default SocialLinks;
