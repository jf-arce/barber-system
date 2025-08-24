interface PageContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => (
	<div
		className={`w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto ${className || ""}`}
	>
		{children}
	</div>
);