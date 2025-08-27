<!-- @Layout:Evaluation -->
<slot />
<!-- /@Layout -->

<script>
  import { getContext, onDestroy, onMount, setContext } from 'svelte';
  import { outcomeValueStore } from '@app/stores/earl/resultStore/index.js';
  import subjects, { TestSubjectTypes } from '@app/stores/earl/subjectStore/index.js';
  import wcag from '@app/stores/wcagStore.js';

  const { scopeStore } = getContext('app');
  // Initialize

  // Create an Application subject
  let applicationSubject =
    $subjects.find((subject) => {
      return subject.type.indexOf(TestSubjectTypes.APPLICATION) >= 0;
    }) ||
    subjects.create({
      type: TestSubjectTypes.APPLICATION
    });

  let endSubscription;

  $: {
    applicationSubject.title = $scopeStore['SITE_NAME'];
    applicationSubject.description = $scopeStore['WEBSITE_SCOPE'];
  }

  setContext('Evaluation', {
    outcomeValues: outcomeValueStore,
    wcagCriteria: wcag
  });

  onMount(() => {
    // Stores that need to be up-to-date in background
    endSubscription = (() => {
      const unscribeOutcomeStore = outcomeValueStore.subscribe(() => {});
      const unscribeWcag = wcag.subscribe(() => {});

      return () => {
        unscribeOutcomeStore();
        unscribeWcag();
      };
    })();
  });

  onDestroy(() => {
    endSubscription();
  });
</script>
