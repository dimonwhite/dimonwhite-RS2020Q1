import {
  getTimesOfDay, changeGeometry, objectAverage, getNextDay,
  celToFah, fahToCel, getResult, getSeason,
} from '../src/utils';

describe('getTimesOfDay', () => {
  test('should return defined', () => {
    expect(getTimesOfDay(1)).toBeDefined();
    expect(getTimesOfDay()).toBeUndefined();
  });
  const arr = [
    [1, 'night'], [2, 'night'], [3, 'night'], [4, 'night'],
    [5, 'morning'], [6, 'morning'], [7, 'morning'], [8, 'morning'], [9, 'morning'], [10, 'morning'], [11, 'morning'],
    [12, 'day'], [13, 'day'], [14, 'day'], [15, 'day'], [16, 'day'], [17, 'day'],
    [18, 'evening'], [19, 'evening'], [20, 'evening'], [21, 'evening'], [22, 'evening'], [23, 'evening']
  ];
  test('should return times of day', () => {
    arr.forEach((item) => {
      expect(getTimesOfDay(item[0])).toBe(item[1]);
    });
  });
});

describe('changeGeometry', () => {
  test('should return error', () => {
    expect(() => {
      changeGeometry(1);
    }).toThrow();
    expect(() => {
      changeGeometry();
    }).toThrow();
  });

  test.each([
    ['58.2345', '58°23\''], ['28.15', '28°15\''], ['14.1', '14°1\''],
  ])('should return %s=>%s', (geometry, expected) => {
    expect(changeGeometry(geometry)).toBe(expected);
  });
});

describe('objectAverage', () => {
  test('should return error', () => {
    expect(() => {
      objectAverage();
    }).toThrow();
  });

  test('should return NaN', () => {
    expect(objectAverage('a')).toBeNaN();
    expect(objectAverage(1)).toBeNaN();
  });

  test.each([
    [9, { a: 12, b: 6 }],
    [8.5, { a: 11, b: 6 }],
  ])('should return %i', (expected, object) => {
    expect(objectAverage(object)).toBe(expected);
  });
});

describe('getNextDay', () => {
  test('should return 0', () => {
    expect(getNextDay('a')).toBe(0);
    expect(getNextDay()).toBe(0);
  });

  const arr = [1, 2, 3, 4, 5, 6, 0];

  test('should return next day', () => {
    arr.forEach((nextDay, day) => {
      expect(getNextDay(day)).toBe(nextDay);
    });
  });
});

describe('celToFah', () => {
  test('should return NaN', () => {
    expect(celToFah('a')).toBeNaN();
    expect(celToFah()).toBeNaN();
  });

  test('should retunr fahrenheit', () => {
    expect(celToFah('')).toBe(32);
    expect(celToFah(0)).toBe(32);
    expect(celToFah(12)).toBe(54);
    expect(celToFah(-30)).toBe(-22);
  });
});

describe('fahToCel', () => {
  test('should return NaN', () => {
    expect(fahToCel('a')).toBeNaN();
    expect(fahToCel()).toBeNaN();
  });

  test('should retunr celsius', () => {
    expect(fahToCel('')).toBe(-18);
    expect(fahToCel(32)).toBe(0);
    expect(fahToCel(54)).toBe(12);
    expect(fahToCel(-22)).toBe(-30);
  });
});

describe('getResult', () => {
  test('should return error', () => {
    expect(() => {
      objectAverage();
    }).toThrow();
  });

  const obj = {
    a: {
      a1: 1,
      a2: 2,
    },
    b: {
      b1: 3,
      b2: 4,
    },
  };

  test('should retunr result', () => {
    expect(getResult(['a', 'a1'], obj)).toBe(1);
    expect(getResult(['a', 'a2'], obj)).toBe(2);
    expect(getResult(['b', 'b1'], obj)).toBe(3);
    expect(getResult(['b', 'b2'], obj)).toBe(4);
  });
});

describe('getSeason', () => {
  test('should retunr winter', () => {
    expect(getSeason()).toBe('winter');
    expect(getSeason('')).toBe('winter');
    expect(getSeason('123')).toBe('winter');
  });

  const obj = {
    winter: [0, 1, 11],
    spring: [2, 3, 4],
    summer: [5, 6, 7],
    autumn: [8, 9, 10],
  };

  test('should retunr season', () => {
    Object.keys(obj).forEach((season) => {
      obj[season].forEach((month) => {
        expect(getSeason(month)).toBe(season);
      });
    });
  });
});
