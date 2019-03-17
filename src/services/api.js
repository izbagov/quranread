export default class ApiServices {
  _apiBase = 'https://quran.com/api/api/v3';

  getData = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getChapter = async id => {
    const chapter = await this.getData(`/chapters/${id}/verses?translations=45&language=ru`);
    return chapter;
  };
}
