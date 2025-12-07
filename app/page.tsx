import Link from 'next/link';
import css from './Hero.module.css';
import Container from '@/components/Container/page';

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
