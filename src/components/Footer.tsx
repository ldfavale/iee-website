import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-iee-footer text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">Instituto Educativo Evangélico</h3>
            <p className="italic">"Un lugar para todos"</p>
            <p className="mt-4">Joaquín de Viana 873, Maldonado, Uruguay</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Contacto</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:contacto@iee.edu.uy" className="hover:text-iee-yellow">contacto@iee.edu.uy</a></li>
              <li><a href="tel:+59842242292" className="hover:text-iee-yellow">(+598) 4224 2292</a></li>
              <li><a href="tel:+59893915714" className="hover:text-iee-yellow">(+598) 093 915 714</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Síguenos</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="https://www.iee.edu.uy" target="_blank" rel="noopener noreferrer" className="hover:text-iee-yellow">www.iee.edu.uy</a></li>
              <li><a href="https://www.instagram.com/iee.maldonado" target="_blank" rel="noopener noreferrer" className="hover:text-iee-yellow">@iee.maldonado</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="italic">"Educación con propósito"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
