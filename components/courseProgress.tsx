import { UserProgress } from "@prisma/client";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  variant?: "default" | "success";
  value: number;
  size?: "default" | "sm";
}

export const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};
export const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress value={value} className="bg-slate-200 h-2" variant={variant} />
      <p
        className={cn(
          "font-medium text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
