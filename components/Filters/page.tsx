'use client';

import { useFiltersStore } from '@/lib/store/filterStore';
import css from './Filters.module.css';

export default function Filters({ onSearch }: { onSearch: () => void }) {
  const {
    location,
    AC,
    TV,
    kitchen,
    bathroom,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    form,
    setFilter,
  } = useFiltersStore();

  return (
    <div className={css.filterContainer}>
      <div className={css.location}>
        <label>
          <p>Location</p>
          <div>
            <input
              type="text"
              placeholder="Kyiv,Ukraine"
              value={location || ''}
              onChange={(e) => setFilter('location', e.target.value)}
            />
            <svg width={20} height={20}>
              <use href="/sprite.svg#icon-map" />
            </svg>
          </div>
        </label>
      </div>
      <p>Filters</p>
      <div className={css.equipment}>
        <div className={css.equipmentName}>
          <p>Vehicle equipment</p>
        </div>
        <div className={css.group}>
          <CustomCheckbox
            label="AC"
            icon="icon-wind"
            checked={AC || false}
            onChange={(v: boolean) => setFilter('AC', v)}
          />
          <CustomCheckbox
            label="TV"
            icon="icon-tv"
            checked={TV || false}
            onChange={(v: boolean) => setFilter('TV', v)}
          />
          <CustomCheckbox
            label="Kitchen"
            icon="icon-cup"
            checked={kitchen || false}
            onChange={(v: boolean) => setFilter('kitchen', v)}
          />
          <CustomCheckbox
            label="Bathroom"
            icon="icon-shower"
            checked={bathroom || false}
            onChange={(v: boolean) => setFilter('bathroom', v)}
          />
          <CustomCheckbox
            label="Radio"
            icon="icon-radio"
            checked={radio || false}
            onChange={(v: boolean) => setFilter('radio', v)}
          />
          <CustomCheckbox
            label="Refrigerator"
            icon="icon-fridge"
            checked={refrigerator || false}
            onChange={(v: boolean) => setFilter('refrigerator', v)}
          />
          <CustomCheckbox
            label="Microwave"
            icon="icon-microwave"
            checked={microwave || false}
            onChange={(v: boolean) => setFilter('microwave', v)}
          />
          <CustomCheckbox
            label="Gas"
            icon="icon-gas"
            checked={gas || false}
            onChange={(v: boolean) => setFilter('gas', v)}
          />
          <CustomCheckbox
            label="Water"
            icon="icon-water"
            checked={water || false}
            onChange={(v: boolean) => setFilter('water', v)}
          />
        </div>
      </div>
      <div>
        <div className={css.vehicleType}>
          <p>Vehicle type</p>
        </div>
        <div className={css.group}>
          <CustomRadio
            label="Van"
            icon="icon-grid-1x2"
            name="form"
            value="panelTruck"
            checked={form === 'panelTruck'}
            onChange={() => setFilter('form', 'panelTruck')}
          />
          <CustomRadio
            label="Fully Integrated"
            icon="icon-grid"
            name="form"
            value="fullyIntegrated"
            checked={form === 'fullyIntegrated'}
            onChange={() => setFilter('form', 'fullyIntegrated')}
          />
          <CustomRadio
            label="Alcove"
            icon="icon-grid-3x3-gap"
            name="form"
            value="alcove"
            checked={form === 'alcove'}
            onChange={() => setFilter('form', 'alcove')}
          />
        </div>
      </div>
      <button className={css.searchBtn} onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

type CustomCheckboxProps = {
  label: string;
  icon: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function CustomCheckbox({ label, icon, checked, onChange }: CustomCheckboxProps) {
  return (
    <label className={css.checkbox}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={css.boxIcon}>
        <svg width={32} height={32} className={`${css[`${label}`]}`}>
          <use href={`/sprite.svg#${icon}`} />
        </svg>
      </span>
      {label}
    </label>
  );
}

type CustomRadioProps = {
  label: string;
  icon: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
};

function CustomRadio({ label, icon, checked, name, value, onChange }: CustomRadioProps) {
  return (
    <label className={css.radio}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />

      <span className={css.radioIcon}>
        <svg width={32} height={32}>
          <use href={`/sprite.svg#${icon}`} />
        </svg>
      </span>

      {label}
    </label>
  );
}
