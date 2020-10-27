export default class ApiServices {
  _apiBase = "http://api.quran.com/api/v3";

  getData = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getChapter = async (id) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?translations=45&language=ru`
    );
    return chapter;
  };

  getVersesRange = async (id, offset, limit) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?offset=${
        offset - 1
      }&limit=${limit}&translations=45&language=ru`
    );
    return chapter;
  };

  getChapterVerse = async (id, offset) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?offset=${
        offset - 1
      }&limit=1&translations=45&language=ru`
    );
    return chapter;
  };

  getChapterWithOffset = async (id, offset) => {
    const chapter = await this.getData(
      `/chapters/${id}/verses?offset=${offset}&limit=10&translations=45&language=ru`
    );
    return chapter;
  };
}
