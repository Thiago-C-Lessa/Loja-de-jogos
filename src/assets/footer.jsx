function Footer() {
  return (
    <footer className="py-3 my-4" style={{ color: "white" }}>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <div id="conteinerInternoFooter" style={{ display: "flex" }}>
          <div id="LinksFooter" style={{ display: "flex", flexDirection: "row" }}>
            <li className="nav-item">
              <a href="/" className="nav-link px-2" style={{ color: "white" }}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2" style={{ color: "white" }}>Contato</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2" style={{ color: "white" }}>Redes</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2" style={{ color: "white" }}>Perguntas Frequentes</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2" style={{ color: "white" }}>Sobre</a>
            </li>
          </div>
        </div>   
      </ul>
      <p className="text-center" style={{ color: "white" }}>© 2024 Jogo.com, Inc</p>
    </footer>
  );
}

export default Footer;