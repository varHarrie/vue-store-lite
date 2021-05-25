# Vue Store Lite

Simple state management for Vue based on reactive API.

## Install

```bash
npm install --save vue-store-lite
```

## Usage

**createStore(options)**:

```javascript
import { createStore } from 'vue-store-lite';

export default createStore({
  state: {
    value: 0,
  },
  getters: {
    doubleValue() {
      return this.value * 2;
    },
  },
  actions: {
    add() {
      this.value += 1;
    },
  },
});
```

Or **createStoreFrom(object)**:

```javascript
export default createStoreFrom({
  value: 0,
  get doubleValue() {
    return this.value * 2;
  },
  add() {
    this.value += 1;
  },
});
```

Use it in component:

```javascript
import store from './store';

export default defineComponent({
  setup() {
    return {
      value: computed(() => store.value),
      doubleValue: computed(() => store.doubleValue),
      add: store.add,
    };
  },
});
```

## License

[MIT](./LICENSE)
