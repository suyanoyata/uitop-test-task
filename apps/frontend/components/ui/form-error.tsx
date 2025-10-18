import { CircleAlert } from "lucide-react";

export const FormError = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-red-400 text-sm flex gap-1 [&_svg]:size-4 items-center">
      <CircleAlert />
      {children}
    </p>
  );
};
