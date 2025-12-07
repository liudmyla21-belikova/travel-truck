'use client';

import { useState } from 'react';
import css from './BookingForm.module.css';

interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

const submitBooking = async (data: BookingFormData, camperId: string) => {
  console.log(`➡️ Спроба бронювання кемпера #${camperId}:`, data);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { success: true, message: 'Ваше бронювання успішно надіслано!' };
};

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitBooking(formData, camperId);

      if (result.success) {
        setSuccessMessage(result.message);
        setFormData({ name: '', email: '', bookingDate: '', comment: '' });
      } else {
        setError('Помилка бронювання. Спробуйте пізніше.');
      }
    } catch (err) {
      console.error(err);
      setError('Виникла несподівана помилка мережі.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <h3 className={css.title}>Забронювати кемпер</h3>
      <p className={css.description}>Заповніть форму, і наш менеджер зв'яжеться з вами.</p>

      {successMessage && <div className={css.notificationSuccess}>🎉 {successMessage}</div>}
      {error && <div className={css.notificationError}>❌ {error}</div>}

      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Ваше ім'я"
            value={formData.name}
            onChange={handleChange}
            required
            className={css.inputField}
          />
        </div>

        <div className={css.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className={css.inputField}
          />
        </div>

        <div className={css.inputGroup}>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className={css.inputField}
          />
        </div>

        <div className={css.inputGroup}>
          <textarea
            name="comment"
            placeholder="Коментар (необов'язково)"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className={css.textareaField}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className={css.submitButton}>
          {isSubmitting ? 'Бронювання...' : 'Надіслати запит на бронювання'}
        </button>
      </form>
    </div>
  );
}
