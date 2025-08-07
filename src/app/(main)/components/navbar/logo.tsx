import Image from 'next/image';
import type { FC } from 'react';

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
    return (
        <Image alt='' src={'/scout-logo.png'} width={50} height={50}/>
    );
}

export default Logo;
