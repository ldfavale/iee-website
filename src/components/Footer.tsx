import Image from 'next/image';
import Link from 'next/link';
import SocialIcon from './SocialIcon';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { MapPin, Phone, Smartphone, Mail } from 'lucide-react';

const Footer = () => {
  const missionText = "Cultivar los principios cristianos tomando como fundamento la Biblia, integrándose a la educación y formación de individuos de diferentes contextos y realidades sociales.";

  return (
    <footer className="bg-iee-footer text-white">
      <div className="container mx-auto px-8 py-8 lg:px-6 lg:py-12">
        <div className="md:flex md:items-start md:justify-between ">
          
          {/* Columna Izquierda: Logo y Misión */}
          <div className="md:w-2/3 lg:w-4/6 xl:w-3/6 2xl:w-3/8 mb-10 md:mb-0 md:mr-8 ">
            <div className="flex flex-col items-center lg:flex-row md:items-center ">
              <Link href="/" className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 md:order-2 lg:order-0 lg:flex ">
                <Image 
                  src="/assets/logo.png" 
                  alt="IEE Logo" 
                  width={120} 
                  height={120}
                />
              </Link>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold mb-2">Misión</h3>
                <p className="text-gray-300 text-sm pb-6">
                  {missionText}
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Contacto y Redes Sociales */}
          <div className="md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="text-gray-300 text-sm space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/UmcYbdnZ7g4nCcb19" target="_blank" rel="noopener noreferrer" className="hover:text-iee-yellow transition-colors">
                  Joaquín de Viana 873, Maldonado, Uruguay
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                <a href="tel:+59842242292" className="hover:text-iee-yellow transition-colors"> 
                  (+598) 4224 2292
                </a>
              </li>
              <li className="flex items-center">
                <Smartphone className="w-5 h-5 mr-3 flex-shrink-0" />
                <a href="tel:+59893915714" className="hover:text-iee-yellow transition-colors">
                  (+598) 093 915 714
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <SocialIcon href="https://www.facebook.com/InstitutoEducativoEvangelico">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/iee.maldonado/">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href="https://wa.me/59893915714">
                <WhatsAppIcon />
              </SocialIcon>
              <SocialIcon href="mailto:contacto@iee.edu.uy">
                <Mail />
              </SocialIcon>
            </div>
          </div>

        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Instituto Educativo Evangélico. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
