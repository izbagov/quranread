import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../UI/Alert';

const NoMatch = () => {
  return (
    <div className="wrap">
      <Alert
        title="Вы перешлю на страницу которая не существует!"
        text={
          <p>
            Вернитесь на <Link to="/">главную страницу</Link> и выберите любую суру. Если вы нашли
            ошибку на сайте, тогда напишите нам на почту{' '}
            <a href="mailto:hello@izbagov.com?subject=Ошибка на сайте quranread.ru">
              hello@izbagov.com
            </a>
          </p>
        }
      />
    </div>
  );
};

export default NoMatch;
