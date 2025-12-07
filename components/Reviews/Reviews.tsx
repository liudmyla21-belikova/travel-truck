import { CamperReview } from '@/types/camper';
import css from './Reviews.module.css';

interface ReviewsProps {
  reviews: CamperReview[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div>
      <ul className={css.reviewsList}>
        {reviews.map((review, i) => (
          <li key={i}>
            <div>
              <div className={css.reviewerAvatar}>{review.reviewer_name[0]}</div>
              <div className={css.reviewerInfo}>
                <p className={css.reviewrName}>{review.reviewer_name}</p>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(5)].map((_, i) => {
                    return (
                      <svg
                        key={i}
                        width={16}
                        height={16}
                        fill={i < review.reviewer_rating ? '#ffc531' : 'none'}
                        stroke={i < review.reviewer_rating ? '#ffc531' : '#d0d5dd'}
                      >
                        <use href="/sprite.svg#icon-star" />
                      </svg>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
