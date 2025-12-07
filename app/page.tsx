import Link from 'next/link';
import css from './Hero.module.css';
import { Metadata } from 'next';
import Container from '@/components/Container/page';

export const metadata: Metadata = {
  title: 'Catalog | TravelTrucks',
  description:
    'Rent the best campers in Ukraine. Fully equipped, comfortable and ready for adventure.',

  openGraph: {
    title: 'Rent Your Dream Camper | TravelTrucks',
    description: 'Find the perfect camper for your trip. AC, Kitchen, Shower & more!',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.heroContainer}>
          <h1 className={css.heroTitle}>Campers of your dreams</h1>
          <p className={css.heroParagraph}>You can find everything you want in our catalog</p>
          <Link href="/catalog">
            <button className={css.heroButton}>View Now</button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
