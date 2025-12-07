'use client';

import Container from '@/components/Container/page';
import { getCamperById } from '@/lib/serverApi';
import { Camper } from '@/types/camper';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './Truck.module.css';
import Image from 'next/image';
import TruckInfo from '@/components/TruckInfo/TruckInfo';
import Reviews from '@/components/Reviews/Reviews';
import Loader from '@/components/Loader/Loader';
import UserForm from '@/components/UserForm/UserForm';

export default function CamperPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCamperDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCamperById(id);
        setCamper(data);
      } catch (err) {
        console.error('Failed to fetch camper details:', err);
        setError('Не вдалося завантажити деталі кемпера.');
        setCamper(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCamperDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error || !camper) {
    return (
      <Container>
        <div className={css.errorPage}>{error || 'На жаль, цей кемпер не знайдено.'}</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={css.truckPage}>
        <div className={css.truckInfo}>
          <div className={css.truckName}>
            <h3>{camper.name}</h3>
            <div className={css.truckLocation}>
              <div className={css.truckRating}>
                <svg width={16} height={16} className={css.starIcon}>
                  <use href="/sprite.svg#icon-star" />
                </svg>
                <span>
                  {camper.rating}({camper.reviews.length} Reviews)
                </span>
              </div>
              <div className={css.camperCity}>
                <svg width={16} height={16} className={css.locationIcon}>
                  <use href="/sprite.svg#icon-map" />
                </svg>
                <span>{camper.location}</span>
              </div>
            </div>
            <div className={css.camperPrice}>
              <span>&euro;{camper.price.toFixed(2)}</span>
            </div>
          </div>

          <ul className={css.gallery}>
            {camper.gallery.map((item, index) => (
              <li key={index}>
                <Image
                  src={item.original}
                  width={290}
                  height={310}
                  alt={camper.description}
                  className={css.galleryItem}
                />
              </li>
            ))}
          </ul>

          <p className={css.descriptionText}>{camper.description}</p>

          <div className={css.boxBtn}>
            <button
              className={`${css.btn} ${activeTab === 'features' ? css.active : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`${css.btn} ${activeTab === 'reviews' ? css.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({camper.reviews.length})
            </button>
          </div>
        </div>

        <div className={css.information}>
          <div className={css.tabContent}>
            {activeTab === 'features' && <TruckInfo details={camper} />}
            {activeTab === 'reviews' && <Reviews reviews={camper.reviews} />}
          </div>
          <UserForm />
        </div>
      </div>
    </Container>
  );
}
