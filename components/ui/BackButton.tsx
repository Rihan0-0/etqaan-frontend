"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface BackButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function BackButton({
  label = "رجوع",
  className = "",
  onClick,
  href,
}: BackButtonProps) {
  const router = useRouter();

  const baseClasses = `flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-gray-700 hover:text-gray-900 rounded-xl transition-all font-arabic font-semibold group ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        <span className="transform transition-transform group-hover:-translate-x-1">
          ➡️
        </span>
        <span>{label}</span>
      </Link>
    );
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button onClick={handleClick} className={baseClasses}>
      <span className="transform transition-transform group-hover:-translate-x-1">
        ➡️
      </span>
      <span>{label}</span>
    </button>
  );
}
