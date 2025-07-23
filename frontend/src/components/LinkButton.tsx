import Link from "next/link"
import { Button as QuickUIButton } from "quick-ui-components"
import { Button as AppButton } from "@/components/Button"
import type { ComponentProps } from "react"
import { COLORS } from "@/constants/colors";

type ButtonProps = ComponentProps<typeof AppButton>;

interface LinkButtonProps extends ButtonProps {
    href: string;
}

export const LinkButton = ({ href, ...props }: LinkButtonProps) => {
  return (
    <QuickUIButton
        asChild
        className={`${props.className}`}
        colorBg={COLORS.primary}
        radius="sm"
        type={props.type}
        variant={props.variant}
        loading={props.loading}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        <Link
          href={href}
          className={`text-center ${props.className}`}
        >
          {props.children} 
        </Link>
    </QuickUIButton>
  )
}
