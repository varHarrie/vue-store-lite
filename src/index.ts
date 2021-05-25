import { reactive, computed } from 'vue-demi';

/**
 * Type of state
 */
type State = Record<string, unknown>;

/**
 * Type of getters
 */
type Getters = Record<string, Function>;

/**
 * Type of actions
 */
type Actions = Record<string, Function>;

/**
 * Type of computed state from getters
 */
type Computed<G extends Getters> = {
  readonly [K in keyof G]: G[K] extends () => infer R ? R : never;
};

/**
 * Type of store context
 */
type Context<S extends State, G extends Getters, A extends Actions> = S & A & Computed<G>;

/**
 * Options of `createStore`
 */
type CreateOptions<S extends State, G extends Getters, A extends Actions> = ThisType<Context<S, G, A>> & {
  state: S;
  getters?: G;
  actions?: A;
};

/**
 * Creates `computed` from getters
 */
function buildComputed<G extends Getters, C extends Computed<G>, S>(getters: G, store: S): Computed<G> {
  return Object.keys(getters).reduce<C>((result: C, key: keyof G) => {
    result[key] = computed(getters[key].bind(store)) as C[keyof G];
    return result;
  }, {} as C);
}

/**
 * Creates actions
 */
function buildActions<A extends Actions, S>(actions: A, store: S): Actions {
  return Object.keys(actions).reduce<A>((result: A, key: keyof A) => {
    result[key] = actions[key].bind(store);
    return result;
  }, {} as A);
}

/**
 * Creates store from options
 */
export function createStore<S extends State = State, G extends Getters = Getters, A extends Actions = Actions>(
  options: CreateOptions<S, G, A>,
): Context<Readonly<S>, G, A> {
  const store = reactive(options.state);

  return Object.assign(
    store as S,
    buildComputed(options.getters || {}, store) as Computed<G>,
    buildActions(options.actions || {}, store) as A,
  );
}

/**
 * Creates store from a JS object
 */
export function createStoreFrom<T>(proto: T): T {
  const state: State = {};
  const getters: Getters = {};
  const actions: Actions = {};

  Object.keys(proto).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (!descriptor) return;

    if ('value' in descriptor) {
      if (typeof descriptor.value === 'function') actions[key] = descriptor.value;
      else state[key] = descriptor.value;
    } else if (descriptor.get) {
      getters[key] = descriptor.get;
    }
  });

  return createStore({ state, getters, actions }) as T;
}
