import { nextTick, watch } from 'vue';
import { createStore, createStoreFrom } from '../src';

describe('createStore', () => {
  it('initial state', () => {
    const store = createStore({ state: { value: 0 } });
    expect(store.value).toBe(0);
  });

  it('getters', async () => {
    const store = createStore({
      state: { value: 0 },
      getters: {
        isOddNumber() {
          return this.value % 2 === 1;
        },
      },
    });

    expect(store.isOddNumber).toBe(false);
  });

  it('actions', () => {
    const store = createStore({
      state: { value: 0 },
      getters: {
        isOddNumber() {
          return this.value % 2 === 1;
        },
      },
      actions: {
        add() {
          this.value += 1;
        },
      },
    });

    expect(store.isOddNumber).toBe(false);

    store.add();

    expect(store.value).toBe(1);
    expect(store.isOddNumber).toBe(true);
  });

  it('observable', async () => {
    const store = createStore({
      state: { value: 0 },
      getters: {
        isOddNumber() {
          return this.value % 2 === 1;
        },
      },
      actions: {
        add() {
          this.value += 1;
        },
      },
    });

    const stateWatcher = jest.fn();
    const computedWatcher = jest.fn();

    watch(() => store.value, stateWatcher);
    watch(() => store.isOddNumber, computedWatcher);

    expect(stateWatcher).toHaveBeenCalledTimes(0);
    expect(computedWatcher).toHaveBeenCalledTimes(0);

    store.add();
    await nextTick();

    expect(stateWatcher).toHaveBeenCalledTimes(1);
    expect(computedWatcher).toHaveBeenCalledTimes(1);
  });
});

describe('createStoreFrom', () => {
  it('initial state', () => {
    const store = createStoreFrom({ value: 0 });
    expect(store.value).toBe(0);
  });

  it('getters', async () => {
    const store = createStoreFrom({
      value: 0,
      get isOddNumber() {
        return this.value % 2 === 1;
      },
    });

    expect(store.isOddNumber).toBe(false);
  });

  it('actions', () => {
    const store = createStoreFrom({
      value: 0,
      get isOddNumber() {
        return this.value % 2 === 1;
      },
      add() {
        this.value += 1;
      },
    });

    expect(store.isOddNumber).toBe(false);

    store.add();

    expect(store.value).toBe(1);
    expect(store.isOddNumber).toBe(true);
  });

  it('observable', async () => {
    const store = createStoreFrom({
      value: 0,
      get isOddNumber() {
        return this.value % 2 === 1;
      },
      add() {
        this.value += 1;
      },
    });

    const stateWatcher = jest.fn();
    const computedWatcher = jest.fn();

    watch(() => store.value, stateWatcher);
    watch(() => store.isOddNumber, computedWatcher);

    expect(stateWatcher).toHaveBeenCalledTimes(0);
    expect(computedWatcher).toHaveBeenCalledTimes(0);

    store.add();
    await nextTick();

    expect(stateWatcher).toHaveBeenCalledTimes(1);
    expect(computedWatcher).toHaveBeenCalledTimes(1);
  });
});
