export default class ApiServices {
  // _apiBase = 'https://ru.quranacademy.org/quran/js-api';

  getData = async url => {
    const res = await fetch(`${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getSurahList = async () => {
    const res = await this.getData('/suras');
    return res;
  };
}
