interface MainContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const MainContainer = ({ children, className }: MainContainerProps) => (
	<main
		className={`w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto ${className || ""}`}
	>
		{children}
	</main>
);