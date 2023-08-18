'use client';

import Image from 'next/image';
import React from 'react';

interface AvtarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvtarProps> = ({src}) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avtar"
      src={src || `/images/placeholder.jpg`}
    />
  );
};

export default Avatar;
