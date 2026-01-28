import type { SelectMediaDialogProps } from "../model";
import { useFetchMedia } from "../hooks/useFetchMedia";
import styles from "./SelectMediaDialog.module.css";
import type { MediaItem } from "../../products/model";

const SelectMediaDialog = ({
	dialogRef,
	onSelect,
	selectedMedia,
	setSelectedMedia,
}: SelectMediaDialogProps) => {
	const { data, fetchNextPage, hasNextPage } = useFetchMedia();
	if (!dialogRef) {
		return null;
	}

	const handleMediaItemClick = (mediaItem: MediaItem) => {
		const index = selectedMedia.findIndex(
			(item) => item.url === mediaItem.url,
		);
		if (index > -1) {
			setSelectedMedia([
				...selectedMedia.slice(0, index),
				...selectedMedia.slice(index + 1),
			]);
		} else {
			setSelectedMedia([...selectedMedia, mediaItem]);
		}
	};

	return (
		<dialog ref={dialogRef} className={styles.nativeDialog}>
			<header className={styles.dialogHeader}>
				<h3>Select Media</h3>
				<button
					onClick={() => {
						onSelect(selectedMedia);
						dialogRef.current?.close();
					}}
					className={styles.closeButton}
				>
					&times;
				</button>
			</header>

			<div className={styles.mediaGrid}>
				{data &&
					data.images.map((url) => (
						<img
							key={url}
							src={url}
							onClick={() => {
								handleMediaItemClick({
									type: "image",
									url: url,
								});
							}}
							className={
								selectedMedia.some((item) => item.url === url)
									? styles.mediaItem
									: styles.mediaItemInactive
							}
						/>
					))}
			</div>

			<div className={styles.mediaGrid}>
				{data?.videos.map((url) => (
					<video
						key={url}
						src={url}
						className={
							selectedMedia.some((item) => item.url === url)
								? styles.mediaItem
								: styles.mediaItemInactive
						}
						muted
						loop
						playsInline
						preload="metadata"
						onMouseEnter={(e) => e.currentTarget.play()}
						onMouseLeave={(e) => {
							e.currentTarget.pause();
							e.currentTarget.currentTime = 0;
						}}
						onClick={() => {
							handleMediaItemClick({ type: "video", url: url });
						}}
					/>
				))}
			</div>

			{hasNextPage && (
				<button
					onClick={() => fetchNextPage()}
					className={styles.loadMore}
				>
					Load more
				</button>
			)}
		</dialog>
	);
};

export default SelectMediaDialog;
