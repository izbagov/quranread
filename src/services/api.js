import qs from 'query-string';

export default class ApiServices {
  _apiBase = 'https://api.quran.com/api/v3';

  getData = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getChapter = async (id) => {
    const chapter = await this.getData(`/chapters/${id}/verses?translations=45&language=ru`);
    return chapter;
  };

  getVerses = async (chapterId, params) => {
    const query = qs.stringify(params);
    const verses = await this.getData(`/chapters/${chapterId}/verses?${query}`);
    return verses;
  };

  getVersesRange = async (id, offset, limit = 10) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?offset=${offset - 1}&limit=${limit}&translations=45&language=ru`,
    );
    return chapter;
  };

  getChapterVerse = async (id, offset) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?offset=${offset - 1}&limit=1&translations=45&language=ru`,
    );
    return chapter;
  };

  getChapterWithOffset = async (id, offset) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?offset=${offset}&limit=10&translations=45&language=ru`,
    );
    return chapter;
  };
}
