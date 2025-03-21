import React from "react";
import logo from "./assets/logo2.png";
import Socials from "./components/socials";



export default function Footer() {
  return (
    <div style={styles.footer}>
      <img style={styles.logo} src={logo} alt="Logo" />
      <div style={styles.footerHeader}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
        </svg>+381 32 302700</h4>
        <h4>8:00 am – 11:30 pm</h4>
      </div>
      <div className="social-media">
        <Socials />
      </div>
      <div style={styles.footerNav}>
        <p style={styles.copyright}>
          Copyright © {new Date().getFullYear()} Metoda. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

const styles = {
  footer: {
    backgroundColor: "#121618",
    height: "350px",
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    margin: 0,
  },
  logo: {
    width: "200px",
    opacity: 0.6,
  },
  footerHeader: {
    marginBottom: "15px",
  },
  footerNav: {
    marginTop: "10px",
  },
  copyright: {
    fontSize: "1rem",
    opacity: 0.7,
  },
};
