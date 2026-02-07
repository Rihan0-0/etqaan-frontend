import Image from "next/image";

interface NotificationCardProps {
  type: "blue" | "green";
  date: string;
  text: string;
  icon?: string;
}

export default function NotificationCard({
  type,
  date,
  text,
  icon,
}: NotificationCardProps) {
  const bgColor = {
    blue: "bg-dashboardBlue",
    green: "bg-dashboardGreen",
  }[type];

  return (
    <div
      className={`${bgColor} p-5 mt-6 rounded-xl flex items-center justify-between shadow-lg`}
    >
      <div className="text-white">
        <h4 className="font-bold text-lg font-arabic mb-1">الإشعارات</h4>
        <p className="text-sm opacity-90 font-arabic mb-2">{date}</p>
        <p className="mt-1 text-base font-medium font-arabic leading-relaxed">
          {text}
        </p>
      </div>
      {icon && (
        <Image
          src={icon}
          alt="أيقونة"
          width={60}
          height={60}
          className="opacity-90"
        />
      )}
    </div>
  );
}
