const ContactoPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-iee-footer mb-8">Contacto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-iee-footer mb-4">Envíanos un mensaje</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensaje</label>
              <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-iee-footer mb-4">Información de contacto</h2>
          <ul className="space-y-2">
            <li>Joaquín de Viana 873, Maldonado, Uruguay</li>
            <li><a href="mailto:contacto@iee.edu.uy">contacto@iee.edu.uy</a></li>
            <li><a href="tel:+59842242292">(+598) 4224 2292</a></li>
            <li><a href="tel:+59893915714">(+598) 093 915 714</a></li>
            <li><a href="https://www.iee.edu.uy" target="_blank" rel="noopener noreferrer">www.iee.edu.uy</a></li>
            <li><a href="https://www.instagram.com/iee.maldonado" target="_blank" rel="noopener noreferrer">@iee.maldonado</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
