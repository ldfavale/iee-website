
'use client';

import Image from 'next/image';
import Link from 'next/link';

interface EducationLevelCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const EducationLevelCard: React.FC<EducationLevelCardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <div className="group relative w-full overflow-visible">
      <Link href={link} className="block w-full aspect-[1.618/1]">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/70"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
          <div className="overflow-hidden">
            <h3 className="font-serif text-4xl italic opacity-100 transition-all duration-500 ease-in-out group-hover:translate-y-[-100%] group-hover:opacity-0">
              {title}
            </h3>
            <div className="h-10">
              <p className="mt-2 max-w-xs translate-y-full text-sm opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 h-1.5 w-full translate-y-full bg-iee-blue opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"></div>
    </div>
  );
};

export default EducationLevelCard;
