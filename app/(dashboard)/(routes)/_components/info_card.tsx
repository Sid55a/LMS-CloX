import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfocardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  varient?: "default" | "success";
}

export const InfoCard = ({
  icon: Icon,
  label,
  numberOfItems,
  varient,
}: InfocardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={varient} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
