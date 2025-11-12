
const ProductNameAndDescription = () => {
	return (
		<div>
			<input type="text" placeholder="Product Name" />
		</div>
	);
};

const productDialogViews: Record<string, React.ReactNode> = {
	"Basic Info": <ProductNameAndDescription />,
}

export default productDialogViews