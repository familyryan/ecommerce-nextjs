import Image from "next/image";
import Link from "next/link";

const DisplayMedium = ({imageSrc, title, subtitle, link}) => {
    return ( 
        <div className="mb-4 lg:mb-0 bg-light p-8 pb-0 hover:bg-light-200">
            <Link href={`${link}`}>
                <div className="flex flex-col justify-center items-center h-56">
                    <Image src={imageSrc} alt={title} width={100} height={50}  className="w-3/5"/>
                </div>
                <div className="mb-8">
                    <p className="text-3xl font-semibold mb-1">
                        {title}
                    </p>
                    <p className="text-xs text-gray-700">
                        {subtitle}
                    </p>
                </div>
            </Link>
        </div>
     );
}

export default DisplayMedium;