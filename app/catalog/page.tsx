'use client';

import Container from '@/components/Container/page';
import { getCampers } from '@/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import css from './Catalog.module.css';
import Loader from '@/components/Loader/Loader';
import Filters from '@/components/Filters/page';
import { useFiltersStore } from '@/lib/store/filterStore';
import NotFound from '@/components/NotFound/NotFound';
import Link from 'next/link';
import { useFavouriteTrucksStore } from '@/lib/store/camperStore';
import { CamperResponse } from '@/types/camper';

const SPRITE_PATH = '/sprite.svg';

export default function Catalog() {
  const [limit, setLimit] = useState<number>(4);

  const filterState = useFiltersStore((state) => state);

  const camperFilters = {
    location: filterState.location,
    form: filterState.form,
    AC: filterState.AC,
    TV: filterState.TV,
    kitchen: filterState.kitchen,
    bathroom: filterState.bathroom,
    gas: filterState.gas,
    water: filterState.water,
  };

  const { favourites, toggleFavourite } = useFavouriteTrucksStore();

  const listRef = useRef<HTMLDivElement | null>(null);
  const page = 1;

  const { data: trucks, isPending } = useQuery<CamperResponse>({
    queryKey: ['campers', camperFilters, limit],
    queryFn: () => getCampers({ ...camperFilters, limit, page }),
  });

  const handleLoadMore = () => {
    setLimit((prev) => prev + 4);
  };

  // Прокрутка при догрузці
  useEffect(() => {
    if (trucks?.items && trucks.items.length > 4) {
      listRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [limit]);

  if (isPending) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  const currentItemsCount = trucks?.items?.length || 0;
  const totalItems = trucks?.total || 0;

  return (
    <Container>
      <div className={css.catalogContainer}>
        <Filters onSearch={handleLoadMore} />

        <div className={css.catalogListContainer} ref={listRef}>
          {currentItemsCount === 0 && (
            <NotFound message="На жаль, за вашими критеріями нічого не знайдено." />
          )}

          {currentItemsCount > 0 && (
            <ul className={css.trucksList}>
              {trucks!.items.map((truck) => {
                const isSelected = favourites.some((fav) => fav.id === truck.id);
                return (
                  <li key={truck.id} className={css.trucksItem}>
                    <Image
                      src={truck.gallery[0].original}
                      alt={truck.name}
                      width={292}
                      height={320}
                      className={css.truckImage}
                    />

                    <div className={css.truckInfo}>
                      <div>
                        <div className={css.truckName}>
                          <h3>{truck.name}</h3>

                          <div className={css.truckPrice}>
                            <span>&euro;{truck.price.toFixed(2)}</span>

                            <button onClick={() => toggleFavourite(truck)}>
                              <svg
                                width={24}
                                height={21}
                                className={isSelected ? css.selected : ''}
                              >
                                <use href={`${SPRITE_PATH}#icon-heart`} />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className={css.truckLocation}>
                          <div className={css.truckRating}>
                            <svg width={16} height={16} className={css.star}>
                              <use href={`${SPRITE_PATH}#icon-star`} />
                            </svg>
                            <span>
                              {truck.rating} ({truck.reviews.length} Reviews)
                            </span>
                          </div>

                          <div className={css.truckCity}>
                            <svg width={16} height={16}>
                              <use href={`${SPRITE_PATH}#icon-map`} />
                            </svg>
                            <span>{truck.location}</span>
                          </div>
                        </div>
                      </div>

                      <p>{truck.description.slice(0, 60)}...</p>

                      <div className={css.truckEquipment}>
                        {truck.transmission && (
                          <div>
                            <svg width={20} height={20}>
                              <use href={`${SPRITE_PATH}#icon-diagram`} />
                            </svg>
                            <span>
                              {truck.transmission[0].toUpperCase() + truck.transmission.slice(1)}
                            </span>
                          </div>
                        )}

                        {truck.engine && (
                          <div>
                            <svg width={20} height={20}>
                              <use href={`${SPRITE_PATH}#icon-fuel-pump`} />
                            </svg>
                            <span>{truck.engine}</span>
                          </div>
                        )}

                        {truck.kitchen && (
                          <div>
                            <svg width={20} height={20}>
                              <use href={`${SPRITE_PATH}#icon-cup`} />
                            </svg>
                            <span>Kitchen</span>
                          </div>
                        )}

                        {truck.TV && (
                          <div>
                            <svg width={20} height={20}>
                              <use href={`${SPRITE_PATH}#icon-tv`} />
                            </svg>
                            <span>TV</span>
                          </div>
                        )}

                        {truck.bathroom && (
                          <div>
                            <svg width={20} height={20}>
                              <use href={`${SPRITE_PATH}#icon-shower`} />
                            </svg>
                            <span>Bathroom</span>
                          </div>
                        )}

                        {truck.AC && (
                          <div>
                            <svg width={20} height={20}>
                              <use href={`${SPRITE_PATH}#icon-wind`} />
                            </svg>
                            <span>AC</span>
                          </div>
                        )}
                      </div>

                      <Link className={css.truckButton} href={`/catalog/${truck.id}`}>
                        Show more
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {totalItems > limit && (
            <button className={css.catalogButton} onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
