import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

const PRESET_CLASSES = {
  blue: "text-blue-500 bg-blue-500/30",
  red: "text-red-500 bg-red-500/30",
  yellow: "text-yellow-500 bg-yellow-500/30",
  green: "text-green-500 bg-green-500/30"
};

export default function StatItem({
  title,
  value,
  icon,
  color
}: PropsWithChildren<{
  title: string;
  value: number | string;
  icon: JSX.Element;
  color: keyof typeof PRESET_CLASSES;
}>) {
  return (
    <div className="bg-secondary p-3 flex items-center gap-3">
      <div className={cn("rounded-full p-3", PRESET_CLASSES[color])}>
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
