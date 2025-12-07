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
const PAGE_LIMIT = 4;

export default function Catalog() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<CamperResponse['items']>([]);
  const [isNewSearch, setIsNewSearch] = useState(false);

  const filterState = useFiltersStore((state) => state);
  const { favourites, toggleFavourite } = useFavouriteTrucksStore();
  const listRef = useRef<HTMLDivElement | null>(null);

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

  const {
    data: trucks,
    isFetching,
    isLoading,
  } = useQuery<CamperResponse, Error>({
    queryKey: ['campers', camperFilters, page],
    queryFn: () => getCampers({ ...camperFilters, limit: PAGE_LIMIT, page }),
  });

  useEffect(() => {
    if (!trucks) return;

    if (page === 1 || isNewSearch) {
      setItems(trucks.items);
    } else {
      setItems((prev) => [...prev, ...trucks.items]);
    }
    setIsNewSearch(false);
  }, [trucks, page, isNewSearch]);
  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleSearch = () => {
    setPage(1);
    setIsNewSearch(true);
  };

  useEffect(() => {
    if (isNewSearch && items.length > 0) {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsNewSearch(false);
    }
  }, [items, isNewSearch]);

  const totalItems = trucks?.total || 0;

  return (
    <Container>
      <div className={css.catalogContainer}>
        <Filters onSearch={handleSearch} />

        <div className={css.catalogListContainer} ref={listRef}>
          {isLoading && page === 1 && <Loader />}

          {!isLoading && items.length === 0 && (
            <NotFound message="На жаль, за вашими критеріями нічого не знайдено." />
          )}

          {items.length > 0 && (
            <ul className={css.trucksList}>
              {items.map((truck) => {
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

          {trucks && totalItems > items.length && (
            <button className={css.catalogButton} onClick={handleLoadMore} disabled={isFetching}>
              {isFetching ? 'Loading...' : 'Load more'}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
