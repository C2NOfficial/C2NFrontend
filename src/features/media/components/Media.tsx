import { useState } from "react";
import styles from "./Media.module.css";
import useUploadMedia from "../hooks/useUploadMedia";
import type { MediaUpload } from "../model";
import { useFetchMedia } from "../hooks/useFetchMedia";
import sharedStyles from "../../shared/shared.module.css";
import { copyToClipboard } from "../../../utils/random_helpers";

const MediaDialog = () => {
  const [media, setMedia] = useState<MediaUpload>({
    images: [],
    videos: [],
  });
  const { uploadMedia } = useUploadMedia();
  const [showDialog, setShowDialog] = useState(false);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchMedia();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setMedia((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(files)],
    }));
  };

  const removeImage = (index: number) => {
    setMedia((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setMedia((prev) => ({
      ...prev,
      videos: [...prev.videos, ...Array.from(files)],
    }));
  };

  const removeVideo = (index: number) => {
    setMedia((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return <p className={sharedStyles.initialLoadingText}>Loading...</p>;
  }

  if (!data) {
    return <p className={sharedStyles.initialLoadingText}>No data</p>;
  }

  return (
    <section className={styles.mediaSection}>
      <button
        className={sharedStyles.addButton}
        onClick={() => setShowDialog(true)}
      >
      UPLOAD 
      </button>

      {showDialog && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <button
              className={styles.closeButton}
              onClick={() => setShowDialog(false)}
            >
              &times;
            </button>

            <h2 className={styles.title}>Manage Media</h2>

            <div className={styles.uploadSection}>
              <label className={styles.uploadLabel}>
                Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className={styles.uploadInput}
                />
              </label>

              <label className={styles.uploadLabel}>
                Upload Videos
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  className={styles.uploadInput}
                />
              </label>
            </div>

            {media.images.length > 0 && (
              <>
                <h3 className={styles.sectionTitle}>Images</h3>
                <div className={styles.mediaGrid}>
                  {media.images.map((file, idx) => (
                    <div key={idx} className={styles.mediaItem}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className={styles.previewMedia}
                      />
                      <button
                        className={styles.removeButton}
                        onClick={() => removeImage(idx)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {media.videos.length > 0 && (
              <>
                <h3 className={styles.sectionTitle}>Videos</h3>
                <div className={styles.mediaGrid}>
                  {media.videos.map((file, idx) => (
                    <div key={idx} className={styles.mediaItem}>
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className={styles.previewMedia}
                      />
                      <button
                        className={styles.removeButton}
                        onClick={() => removeVideo(idx)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              className={styles.submitButton}
              onClick={() => uploadMedia(media)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {/* Existing media gallery */}
      <div className={styles.librarySection}>
        <h3 className={styles.sectionTitle}>Media Library</h3>

        <div className={styles.mediaGrid}>
          {data.images.map((url) => (
            <div key={url} className={styles.mediaItem} onDoubleClick={()=> copyToClipboard(url)}>
              <img src={url} className={styles.previewMedia} />
            </div>
          ))}

          {data.videos.map((url) => (
            <div key={url} className={styles.mediaItem}>
              <video src={url} controls className={styles.previewMedia} onDoubleClick={()=> copyToClipboard(url)}/>
            </div>
          ))}
        </div>
        <div className={sharedStyles.paginationContainer}>
          {isFetchingNextPage && (
            <p className={sharedStyles.loadingText}>Loading...</p>
          )}
          {!hasNextPage && (
            <p className={sharedStyles.noMoreText}>No more media to load.</p>
          )}
          {hasNextPage && !isFetchingNextPage && (
            <button
              className={sharedStyles.loadMoreButton}
              onClick={() => fetchNextPage()}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaDialog;
