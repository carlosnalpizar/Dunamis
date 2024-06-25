import React from 'react';
import '../Css/footer.styles.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-innova">
          <h1 className='titulo' >Innova</h1>
        </div>
        <div className="footer-contact">
       
          <p><i className="pi pi-envelope" />info@tuempresa.com</p>
          <p><i className="pi pi-phone" />  +1 234 567 890</p>
          <p><i className="pi pi-map-marker" /> Calle Principal 123, Ciudad</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 INNOVA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;