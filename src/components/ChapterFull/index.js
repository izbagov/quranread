import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import Bismillah from '../../UI/Bismillah';
import Alert from '../../UI/Alert';
import RandomSura from '../RandomSura';
import { generateTitle } from '../../helpers';
import s from './ChapterFull.module.scss';

const Api = new ApiServices();

const ChapterFull = (props) => {
  const [loading, setLoading] = useState(true);
  const [ref, inView, entry] = useInView({ rootMargin: '200px' });
  const [items, setItems] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const [meta, setMeta] = useState({
    current_page: null,
    next_page: null,
    prev_page: null,
    total_pages: null,
    total_count: null,
    offset: 10,
  });

  const chapterId = props.match.params.id;

  useEffect(() => {
    if (items.length >= meta.total_count || loading) return;
    if (inView && entry.boundingClientRect.top > 500) {
      setLoading(true);
      Api.getChapterWithOffset(chapterId, meta.offset).then(({ meta: metaInfo, verses }) => {
        setLoading(false);
        setMeta((prevMeta) => ({
          ...prevMeta,
          ...metaInfo,
          offset: prevMeta.offset + 10,
        }));
        setItems((items) => [...items, ...verses]);
      });
    }
  }, [inView]);

  useEffect(() => {
    const queryParams = {
      translations: 45,
      language: 'ru',
    };
    Api.getVerses(chapterId, queryParams).then(({ meta, verses }) => {
      setLoading(false);

      setMeta((prevMeta) => ({
        ...prevMeta,
        ...meta,
      }));
      setItems(verses);
    });
    document.title = generateTitle(chapterId);
  }, []);

  if (chapterId > 114) {
    document.title = 'Не существующая сура - Quran Read';
    return (
      <div className="wrap">
        <Alert
          title="Вы открыли суру которая не существует!"
          text={
            <p>
              Вернитесь на главную страницу и найдите необходимую суру. Например <RandomSura />
            </p>
          }
        />
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className={s.title}>{Chapters[chapterId - 1].text.name}</div>
      <Bismillah chapter={chapterId} />
      {items.map((verse, idx) => (
        <Verse
          key={verse.id}
          verse={verse}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
          activeAudio={activeAudio}
          setActiveAudio={setActiveAudio}
          ref={items.length - 1 === idx ? ref : null}
        />
      ))}
      {loading && <div>Загружаю суру..</div>}
    </div>
  );
};

export default ChapterFull;
