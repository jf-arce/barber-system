import { COLORS } from "@/constants/colors";
import { Button as QuickUIButton } from "quick-ui-components"

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  className = "",
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick
}: CustomButtonProps) => {
  return (
    <QuickUIButton
      className={`w-full text-center ${className}`}
      colorBg={COLORS.primary}
      radius="sm"
      type={type}
      variant={variant}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </QuickUIButton>
  )
}
