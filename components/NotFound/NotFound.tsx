import css from './NotFound.module.css';

interface NotFoundProps {
  message: string;
}

export default function NotFound({ message }: NotFoundProps) {
  const displayMessage =
    message || "Bad request. On your filters trucks dont't exist. Please change filters.";
  return (
    <div className={css.notFound}>
      <h2>{displayMessage}</h2>
    </div>
  );
}
