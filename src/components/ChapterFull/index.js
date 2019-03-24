import React from 'react';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import s from './ChapterFull.module.scss';

const Api = new ApiServices();

class ChapterFull extends React.Component {
  state = {
    loading: false,
    items: [],
    offset: 10,
    totalPages: null,
    currentPage: null
  };

  chapterId = this.props.match.params.id;

  onScroll = () => {
    const { totalPages, currentPage, offset, loading } = this.state;
    if (totalPages === currentPage || loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.body.offsetHeight - 50
    ) {
      this.setState({ loading: true });
      Api.getChapterWithOffset(this.chapterId, offset).then(({ meta, verses }) => {
        this.setState(state => ({
          loading: false,
          currentPage: meta.current_page,
          offset: state.offset + 10,
          items: [...state.items, ...verses]
        }));
      });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.mounted = true;
    this.setState({ loading: true });
    Api.getChapter(this.chapterId).then(({ meta, verses }) => {
      if (this.mounted) {
        this.setState({
          loading: false,
          currentPage: meta.current_page,
          totalPages: meta.total_pages,
          items: verses
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    this.mounted = false;
  }

  render() {
    const { items, loading } = this.state;
    return (
      <div className="wrap">
        <div className={s.title}>{Chapters[this.chapterId - 1].text.name}</div>
        {items.map(verse => (
          <Verse key={verse.id} {...verse} />
        ))}
        {loading && <div>Загружаю информацию..</div>}
      </div>
    );
  }
}

export default ChapterFull;
