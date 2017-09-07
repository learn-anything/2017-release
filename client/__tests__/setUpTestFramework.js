class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const i18nMock = str => str;

const openMock = () => ({
  focus: jest.fn(),
  location: null,
});

global.localStorage = new LocalStorageMock;
global.__ = i18nMock;
global.openMock = openMock;
