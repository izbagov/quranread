import React, { useEffect } from 'react';

const Contacts = () => {
  useEffect(() => {
    document.title = 'Обратная связь - Quran Read';
  }, []);
  return (
    <div className="page">
      <div className="wrap">
        <div className="page__title">Обратная связь</div>
        <p>
          Если у вас возникли какие-либо вопросы или проблемы с сайтом, может вы просто хотите нас
          поблагодарить :) пишите по всем вопросам на почту{' '}
          <a href="mailto:hello@izbagov.com">hello@izbagov.com</a>
        </p>
      </div>
    </div>
  );
};

export default Contacts;
