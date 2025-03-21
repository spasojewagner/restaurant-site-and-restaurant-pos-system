import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlusG, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './socials.css';

const Socials = () => {
    return (
        <div className="social-media">
          <ul>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      );
    };

export default Socials;