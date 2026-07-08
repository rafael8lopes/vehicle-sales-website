import { useState } from 'react';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import '@/features/vehicles/components/ImageGallery/ImageGallery.scss';

type ImageGalleryProps = {
	imageUrls: string[];
	alt: string;
};

export function ImageGallery({ imageUrls, alt }: ImageGalleryProps) {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);
	const [errorIndexes, setErrorIndexes] = useState<Set<number>>(new Set());

	const validImages = imageUrls.filter((_, i) => !errorIndexes.has(i));
	const hasImages = validImages.length > 0;
	const hasMultiple = imageUrls.length > 1;

	const handleImageError = (index: number) => {
		setErrorIndexes((prev) => new Set(prev).add(index));
	};

	const handlePrev = () => {
		setActiveIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setActiveIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
	};

	const handleThumbnailClick = (index: number) => {
		setActiveIndex(index);
	};

	if (!hasImages) {
		return (
			<div className="image-gallery">
				<div className="image-gallery__placeholder" aria-hidden="true">
					<Car size={64} strokeWidth={1} />
				</div>
			</div>
		);
	}

	return (
		<div className="image-gallery">
			<div className="image-gallery__main">
				{errorIndexes.has(activeIndex) ? (
					<div className="image-gallery__placeholder" aria-hidden="true">
						<Car size={64} strokeWidth={1} />
					</div>
				) : (
					<img
						className="image-gallery__image"
						src={imageUrls[activeIndex]}
						alt={t('imageGallery.imageAlt', {
							alt,
							current: activeIndex + 1,
							total: imageUrls.length,
						})}
						onError={() => handleImageError(activeIndex)}
					/>
				)}

				{hasMultiple && (
					<>
						<button
							className="image-gallery__nav image-gallery__nav--prev"
							type="button"
							onClick={handlePrev}
							aria-label={t('imageGallery.previousImage')}
						>
							<ChevronLeft size={20} />
						</button>
						<button
							className="image-gallery__nav image-gallery__nav--next"
							type="button"
							onClick={handleNext}
							aria-label={t('imageGallery.nextImage')}
						>
							<ChevronRight size={20} />
						</button>
						<span className="image-gallery__counter" aria-hidden="true">
							{activeIndex + 1} / {imageUrls.length}
						</span>
					</>
				)}
			</div>

			{hasMultiple && (
				<div className="image-gallery__thumbnails" role="list">
					{imageUrls.map((url, index) => (
						<button
							key={url}
							type="button"
							className={`image-gallery__thumbnail ${index === activeIndex ? 'image-gallery__thumbnail--active' : ''}`}
							onClick={() => handleThumbnailClick(index)}
							aria-label={t('imageGallery.viewImage', { number: index + 1 })}
							role="listitem"
						>
							{errorIndexes.has(index) ? (
								<Car size={16} strokeWidth={1} aria-hidden="true" />
							) : (
								<img
									src={url}
									alt=""
									loading="lazy"
									onError={() => handleImageError(index)}
								/>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
