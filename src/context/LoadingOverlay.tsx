import React, { createContext, useContext, useState } from "react";

interface LoadingOverlayContextType {
	isLoading: boolean;
	showLoading: () => void;
	hideLoading: () => void;
}

export const LoadingOverlayContext = createContext<
	LoadingOverlayContextType | undefined
>(undefined);

interface Props {
	children: React.ReactNode;
}

const LoadingOverlayProvider = ({ children }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const showLoading = () => setIsLoading(true);
	const hideLoading = () => setIsLoading(false);

	return (
		<LoadingOverlayContext.Provider
			value={{ isLoading, showLoading, hideLoading }}
		>
			{children}
		</LoadingOverlayContext.Provider>
	);
};

export const useLoadingOverlay = () => {
	const context = useContext(LoadingOverlayContext);
	if (!context)
		throw new Error(
			"useLoadingOverlay must be used within LoadingOverlayProvider",
		);
	return context;
};

export default LoadingOverlayProvider;
