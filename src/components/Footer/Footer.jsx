import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <Logo width="100px" />
            <p className="footer-copyright">
              &copy; 2025. All Rights Reserved.
            </p>
          </div>

          <div className="footer-links-section">
            <div>
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-links-list">
                <li>
                  <Link className="footer-link" to="/">
                    Features
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Affiliate
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-links-list">
                <li>
                  <Link className="footer-link" to="/">
                    Account
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Help
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Legals</h3>
              <ul className="footer-links-list">
                <li>
                  <Link className="footer-link" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
