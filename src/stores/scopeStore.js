import { writable } from 'svelte/store';

export const initialScopeStore = {
  ADDITIONAL_REQUIREMENTS: '',
  AS_BASELINE: '',
  CONFORMANCE_TARGET: 'AA',
  TARGET_TYPE: 'application',
  SITE_NAME: '',
  WCAG_VERSION: '2.2',
  WEBSITE_SCOPE: '',
  // Application-specific metadata (used when TARGET_TYPE === 'application')
  APP_PLATFORM: '',
  APP_OS_VERSION: '',
  APP_VERSION: '',
  DEVICE_TYPES: '',
  INPUT_METHODS: '',
  ASSISTIVE_TECH: '',
  DISTRIBUTION: ''
};

const scopeStore = writable({...initialScopeStore});

export default scopeStore;
