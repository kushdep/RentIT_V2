function Footer() {
  return (
    <>
      <footer className="navbar bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Rent-IT. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
