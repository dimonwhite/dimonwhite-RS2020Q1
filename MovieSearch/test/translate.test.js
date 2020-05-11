import fetchJSON from "../src/utils";
import { yandexTranslate } from "../src/constants";

describe('Translate', () => {
  test('should return the translation "трансформеры"', () => {
    return fetchJSON(`${yandexTranslate}${encodeURIComponent('трансформеры')}`).then(data => {
      const text = 'transformers';
      expect(data.text[0]).toEqual(text);
      expect(data.code).toEqual(200);
    });
  });

  test('should return the translation "мечта"', () => {
    return fetchJSON(`${yandexTranslate}${encodeURIComponent('мечта')}`).then(data => {
      const text = 'dream';
      expect(data.text[0]).toEqual(text);
    });
  });

  test('should return a key error API', () => {
    return fetchJSON(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=123&lang=ru-en&text=${encodeURIComponent('мечта')}`).then(data => {
      const message = 'API key is invalid';
      expect(data.message).toEqual(message);
      expect(data.code).toEqual(401);
    });
  });
});