import Image from 'next/image';

type LogoProps = {
  light?: boolean;
  className?: string;
};

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/grotera-mark.png"
        alt=""
        aria-hidden="true"
        width={48}
        height={48}
        className="h-11 w-11 object-contain drop-shadow-[0_5px_12px_rgba(242,169,59,0.2)] sm:h-12 sm:w-12"
      />
    </span>
  );
}
