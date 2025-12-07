'use client';

import React from 'react';
import { useCamperStore } from '@/lib/store/camperStore';
import styles from '@/styles/LoadMoreButton.module.css';

export default function LoadMoreButton() {
  const { fetchCampers, isLoading, canLoadMore } = useCamperStore();

  const handleLoadMore = () => {
    fetchCampers(false);
  };

  if (isLoading || !canLoadMore) {
    return null;
  }

  return (
    <button onClick={handleLoadMore} disabled={isLoading} className={styles.loadMoreButton}>
      Load more
    </button>
  );
}
