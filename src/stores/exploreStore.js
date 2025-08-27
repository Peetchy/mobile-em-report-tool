import { writable } from 'svelte/store';

export const initialExploreStore = {
  ESSENTIAL_FUNCTIONALITY: '',
  // Application-specific exploration notes
  CRITICAL_FLOWS: '',
  DYNAMIC_STATES: '',
  PERMISSIONS: '',
  OFFLINE_BEHAVIOR: '',
  EMBEDDED_WEBVIEWS: ''
};

const exploreStore = writable({ ...initialExploreStore });

export default exploreStore;
