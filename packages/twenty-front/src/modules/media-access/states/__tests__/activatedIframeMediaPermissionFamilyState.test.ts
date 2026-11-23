import { createStore } from 'jotai';

const permission = {
  origin: 'https://dialer.example.com',
  microphone: true,
  camera: false,
};

const loadStateAsAfterPageReload = async () => {
  jest.resetModules();

  const { activatedIframeMediaPermissionFamilyState } = await import(
    '@/media-access/states/activatedIframeMediaPermissionFamilyState'
  );

  return activatedIframeMediaPermissionFamilyState;
};

describe('activatedIframeMediaPermissionFamilyState', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it('keeps the approval for an owner after a page reload', async () => {
    const state = await loadStateAsAfterPageReload();

    createStore().set(state.atomFamily('application:dialer'), permission);

    const reloadedState = await loadStateAsAfterPageReload();

    expect(createStore().get(reloadedState.atomFamily('application:dialer'))).toEqual(
      permission,
    );
  });

  it('does not share an approval between owners', async () => {
    const state = await loadStateAsAfterPageReload();

    createStore().set(state.atomFamily('application:dialer'), permission);

    const reloadedState = await loadStateAsAfterPageReload();

    expect(
      createStore().get(reloadedState.atomFamily('workspace-widget:other')),
    ).toBeNull();
  });

  it('forgets the approval once it is cleared', async () => {
    const state = await loadStateAsAfterPageReload();
    const store = createStore();

    store.set(state.atomFamily('application:dialer'), permission);
    store.set(state.atomFamily('application:dialer'), null);

    const reloadedState = await loadStateAsAfterPageReload();

    expect(
      createStore().get(reloadedState.atomFamily('application:dialer')),
    ).toBeNull();
  });
});
