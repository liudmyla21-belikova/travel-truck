import { Camper } from '@/types/camper';
import css from './TruckInfo.module.css';

interface TruckInfoProps {
  details: Camper;
}

export default function truckInfo({ details }: TruckInfoProps) {
  return (
    <div className={css.detailsBox}>
      <div className={css.camperFeatures}>
        {details.transmission && (
          <div>
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-diagram" />
            </svg>
            <span>{details.transmission[0].toUpperCase() + details.transmission.slice(1)}</span>
          </div>
        )}
        {details.engine && (
          <div>
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-fuel-pump" />
            </svg>
            <span>Petrol</span>
          </div>
        )}
        {details.kitchen && (
          <div>
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-cup" />
            </svg>
            <span>Kitchen</span>
          </div>
        )}
        {details.TV && (
          <div>
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-tv" />
            </svg>
            <span>TV</span>
          </div>
        )}
        {details.bathroom && (
          <div>
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-shower" />
            </svg>
            <span>Bathroom</span>
          </div>
        )}
        {details.AC && (
          <div>
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-wind" />
            </svg>
            <span>AC</span>
          </div>
        )}
      </div>
      <div>
        <h4 className={css.subTitle}>Vehicle details</h4>
        <ul className={css.list}>
          <li className={css.listItem}>
            <p>Form</p>
            <p>{details.form}</p>
          </li>
          <li className={css.listItem}>
            <p>Length</p>
            <p>{details.length}</p>
          </li>
          <li className={css.listItem}>
            <p>Width</p>
            <p>{details.width}</p>
          </li>
          <li className={css.listItem}>
            <p>Height</p>
            <p>{details.height}</p>
          </li>
          <li className={css.listItem}>
            <p>Tank</p>
            <p>{details.tank}</p>
          </li>
          <li className={css.listItem}>
            <p>Consumption</p>
            <p>{details.consumption}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
