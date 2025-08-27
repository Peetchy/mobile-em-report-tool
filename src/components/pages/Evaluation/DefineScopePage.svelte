<Page title="{TRANSLATED.PAGE_TITLE}" pageid="define-scope">
  <p>
    {@html TRANSLATED.INTRODUCTION}
  </p>
  <ResourceLink href="https://www.w3.org/TR/WCAG-EM/#step1">{TRANSLATED.RESOURCE_LINK_NAME}</ResourceLink>

  <form id="defineScopeForm" method="" novalidate>
    <Fieldset legend={TRANSLATED.TARGET_TYPE_LABEL} helptext={TRANSLATED.TARGET_TYPE_HELPTEXT}>
      <MultipleChoice
        id="target_type"
        type="radio"
        bind:value={$scopeStore['TARGET_TYPE']}
        options={[{ value: 'website', title: TRANSLATED.TARGET_TYPE_WEBSITE }, { value: 'application', title: TRANSLATED.TARGET_TYPE_APPLICATION }]}
      />
    </Fieldset>

    <Input
      id="site_name"
      label="{$scopeStore['TARGET_TYPE'] === 'application' ? TRANSLATED.APP_NAME_LABEL : TRANSLATED.SITE_NAME_LABEL}"
      helptext="{TRANSLATED.SITE_NAME_HELPTEXT}"
      bind:value="{$scopeStore['SITE_NAME']}"
    />

    {#if $scopeStore['TARGET_TYPE'] === 'application'}
      <Textarea
        id="app_scope"
        label="{TRANSLATED.APP_SCOPE_LABEL}"
        helptext="{TRANSLATED.APP_SCOPE_HELPTEXT}"
        bind:value="{$scopeStore['WEBSITE_SCOPE']}"
      />

      <Input id="app_platform" label="{TRANSLATED.APP_PLATFORM_LABEL}" helptext="{TRANSLATED.APP_PLATFORM_HELPTEXT}" bind:value="{$scopeStore['APP_PLATFORM']}" />
      <Input id="app_os_version" label="{TRANSLATED.APP_OS_VERSION_LABEL}" helptext="{TRANSLATED.APP_OS_VERSION_HELPTEXT}" bind:value="{$scopeStore['APP_OS_VERSION']}" />
      <Input id="app_version" label="{TRANSLATED.APP_VERSION_LABEL}" helptext="{TRANSLATED.APP_VERSION_HELPTEXT}" bind:value="{$scopeStore['APP_VERSION']}" />
      <Input id="device_types" label="{TRANSLATED.DEVICE_TYPES_LABEL}" helptext="{TRANSLATED.DEVICE_TYPES_HELPTEXT}" bind:value="{$scopeStore['DEVICE_TYPES']}" />
      <Input id="input_methods" label="{TRANSLATED.INPUT_METHODS_LABEL}" helptext="{TRANSLATED.INPUT_METHODS_HELPTEXT}" bind:value="{$scopeStore['INPUT_METHODS']}" />
      <Input id="assistive_tech" label="{TRANSLATED.ASSISTIVE_TECH_LABEL}" helptext="{TRANSLATED.ASSISTIVE_TECH_HELPTEXT}" bind:value="{$scopeStore['ASSISTIVE_TECH']}" />
      <Input id="distribution" label="{TRANSLATED.DISTRIBUTION_LABEL}" helptext="{TRANSLATED.DISTRIBUTION_HELPTEXT}" bind:value="{$scopeStore['DISTRIBUTION']}" />
    {:else}
      <Textarea
        id="website_scope"
        label="{TRANSLATED.SITE_SCOPE_LABEL}"
        helptext="{`
          <p>${TRANSLATED.SITE_SCOPE_HELPTEXT_P1}</p>
          <ul>
            <li>${TRANSLATED.SITE_SCOPE_HELPTEXT_LI1}</li>
            <li>${TRANSLATED.SITE_SCOPE_HELPTEXT_LI2}</li>
            <li>${TRANSLATED.SITE_SCOPE_HELPTEXT_LI3}</li>
          </ul>
        `}"
        bind:value="{$scopeStore['WEBSITE_SCOPE']}"
      />
    {/if}

    <Select
      id="wcag_version"
      label="{TRANSLATED.WCAG_VERSION_LABEL}"
      helptext="{TRANSLATED.WCAG_VERSION_HELPTEXT}"
      options="{wcagVersions}"
      value="{$scopeStore['WCAG_VERSION']}"
      on:change={updateWCAGversion}
    />

    <Select
      id="conformance_target"
      label="{TRANSLATED.CONFORMANCE_TARGET_LABEL}"
      helptext="{TRANSLATED.CONFORMANCE_TARGET_HELPTEXT}"
      options="{conformanceLevels}"
      value="{$scopeStore['CONFORMANCE_TARGET']}"
      on:change={updateConformanceTarget}
    />

    <Textarea
      id="as_baseline"
      label="{TRANSLATED.ACCESSIBILITY_SUPPORT_BASELINE_LABEL}"
      helptext="{TRANSLATED.ACCESSIBILITY_SUPPORT_BASELINE_HELPTEXT}"
      bind:value="{$scopeStore['AS_BASELINE']}"
    />

    <Textarea
      id="additional_requirements"
      label="{TRANSLATED.ADDITIONAL_REQUIREMENTS_LABEL}"
      helptext="{`
        <p>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_P1}</p>
        <ul>
          <li>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_LI1}</li>
          <li>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_LI2}</li>
          <li>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_LI3}</li>
        </ul>
      `}"
      bind:value="{$scopeStore['ADDITIONAL_REQUIREMENTS']}"
    />
  </form>
</Page>

<script>
  import { getContext, onMount } from 'svelte';

  import { CONFORMANCE_LEVELS, WCAG_VERSIONS, scopedWcagVersions } from '@app/stores/wcagStore.js';
  import assertions from '@app/stores/earl/assertionStore/index.js';
  import { CriteriaSelected } from '@app/stores/selectedCriteriaStore.js';
  import tests from '@app/stores/earl/testStore/index.js';
  import subjects, {
    TestSubjectTypes
  } from '@app/stores/earl/subjectStore/index.js';
  import { interactedOpenEvaluation } from '@app/stores/interactedStore.js';

  import Page from '@app/components/ui/Page.svelte';
  import Input from '@app/components/form/Input.svelte';
  import Select from '@app/components/form/Select.svelte';
  import Textarea from '@app/components/form/Textarea.svelte';
  import ResourceLink from '@app/components/ui/ResourceLink.svelte';
  import Fieldset from '@app/components/form/Fieldset.svelte';
  import MultipleChoice from '@app/components/form/MultipleChoice.svelte';

  const { translate } = getContext('app');
  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.SCOPE.TITLE'),
    INTRODUCTION: $translate('PAGES.SCOPE.INTRO'),
    RESOURCE_LINK_NAME: $translate('PAGES.SCOPE.RESOURCE_LINK_NAME'),
  TARGET_TYPE_LABEL: $translate('PAGES.SCOPE.LABEL_TARGET_TYPE'),
  TARGET_TYPE_HELPTEXT: $translate('PAGES.SCOPE.INF_TARGET_TYPE'),
  TARGET_TYPE_WEBSITE: $translate('PAGES.SCOPE.OPTION_TARGET_WEBSITE'),
  TARGET_TYPE_APPLICATION: $translate('PAGES.SCOPE.OPTION_TARGET_APPLICATION'),
    SITE_NAME_LABEL: $translate('PAGES.SCOPE.LABEL_SITE_NAME'),
    SITE_NAME_HELPTEXT: $translate('PAGES.SCOPE.INF_SITE_NAME'),
  APP_NAME_LABEL: $translate('PAGES.SCOPE.LABEL_APP_NAME'),
    SITE_SCOPE_LABEL: $translate('PAGES.SCOPE.LABEL_SITE_SCOPE'),
    SITE_SCOPE_HELPTEXT_P1: $translate('PAGES.SCOPE.INF_SITE_SCOPE_0'),
    SITE_SCOPE_HELPTEXT_LI1: $translate('PAGES.SCOPE.INF_SITE_SCOPE_LI0'),
    SITE_SCOPE_HELPTEXT_LI2: $translate('PAGES.SCOPE.INF_SITE_SCOPE_LI1'),
    SITE_SCOPE_HELPTEXT_LI3: $translate('PAGES.SCOPE.INF_SITE_SCOPE_LI2'),
  APP_SCOPE_LABEL: $translate('PAGES.SCOPE.LABEL_APP_SCOPE'),
  APP_SCOPE_HELPTEXT: $translate('PAGES.SCOPE.INF_APP_SCOPE'),
  APP_PLATFORM_LABEL: $translate('PAGES.SCOPE.LABEL_APP_PLATFORM'),
  APP_PLATFORM_HELPTEXT: $translate('PAGES.SCOPE.INF_APP_PLATFORM'),
  APP_OS_VERSION_LABEL: $translate('PAGES.SCOPE.LABEL_APP_OS_VERSION'),
  APP_OS_VERSION_HELPTEXT: $translate('PAGES.SCOPE.INF_APP_OS_VERSION'),
  APP_VERSION_LABEL: $translate('PAGES.SCOPE.LABEL_APP_VERSION'),
  APP_VERSION_HELPTEXT: $translate('PAGES.SCOPE.INF_APP_VERSION'),
  DEVICE_TYPES_LABEL: $translate('PAGES.SCOPE.LABEL_DEVICE_TYPES'),
  DEVICE_TYPES_HELPTEXT: $translate('PAGES.SCOPE.INF_DEVICE_TYPES'),
  INPUT_METHODS_LABEL: $translate('PAGES.SCOPE.LABEL_INPUT_METHODS'),
  INPUT_METHODS_HELPTEXT: $translate('PAGES.SCOPE.INF_INPUT_METHODS'),
  ASSISTIVE_TECH_LABEL: $translate('PAGES.SCOPE.LABEL_ASSISTIVE_TECH'),
  ASSISTIVE_TECH_HELPTEXT: $translate('PAGES.SCOPE.INF_ASSISTIVE_TECH'),
  DISTRIBUTION_LABEL: $translate('PAGES.SCOPE.LABEL_DISTRIBUTION'),
  DISTRIBUTION_HELPTEXT: $translate('PAGES.SCOPE.INF_DISTRIBUTION'),
    WCAG_VERSION_LABEL: $translate('PAGES.SCOPE.LABEL_WCAG_VERSION'),
    WCAG_VERSION_HELPTEXT: $translate('PAGES.SCOPE.INFO_WCAG_VERSION'),
    CONFORMANCE_TARGET_LABEL: $translate('PAGES.SCOPE.LABEL_CONFORMANCE_TGT'),
    CONFORMANCE_TARGET_HELPTEXT: $translate('PAGES.SCOPE.INF_CONF_TGT'),
    ACCESSIBILITY_SUPPORT_BASELINE_LABEL: $translate('PAGES.SCOPE.LABEL_SUPPORT_BASE'),
    ACCESSIBILITY_SUPPORT_BASELINE_HELPTEXT: $translate('PAGES.SCOPE.INF_SUPPORT_BASE'),
    ADDITIONAL_REQUIREMENTS_LABEL: $translate('PAGES.SCOPE.LABEL_EXTRA_REQUIREMENTS'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_P1: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_0'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_LI1: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI0'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_LI2: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI1'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_LI3: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI2'),
    CONFORMANCE_LEVEL: $translate('WCAG.COMMON.CONFORMANCE_LEVEL'),
    DATA_LOSS_WARNING: $translate('PAGES.SCOPE.DATA_LOSS_WARNING')
  };

  let wcagVersions = [...WCAG_VERSIONS].reverse().map((version) => {
    return {
      title: `WCAG ${version}`,
      value: version
    };
  });

  $: conformanceLevels = CONFORMANCE_LEVELS.map((level) => {
    return {
      title: `${TRANSLATED.CONFORMANCE_LEVEL} ${level}`,
      value: level
    };
  });

  const { scopeStore } = getContext('app');

  let oldwcag = $scopeStore['WCAG_VERSION'];
  let oldtarget = $scopeStore['CONFORMANCE_TARGET'];

  function updateWCAGversion(event){
    oldwcag = $scopeStore['WCAG_VERSION'];
    $scopeStore['WCAG_VERSION'] = event.target.value;
  }

  function updateConformanceTarget(event){
    oldtarget = $scopeStore['CONFORMANCE_TARGET'];
    $scopeStore['CONFORMANCE_TARGET'] = event.target.value;
  }

  // Used to display subject.title
  export let subject = {};

  // Used for id creation (test.id)
  export let test = {};

  let assertionsToRemove = [];
  $: {
    // Get or create an Assertion
    //$assertions = [];
    const available = [];
    $CriteriaSelected.forEach((criteria) => {
      const check = criteria.num;
      available.push(check);
      subject = $subjects.find((subject) => {
        return subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
    });

    test = $tests.find(($test) => {
      return $test.num === check  && $test.id === "WCAG"+$scopeStore['WCAG_VERSION'].split('.').join("")+":"+criteria.id;
    });

      
    if(test != undefined){
    $assertions.find(($assertion) => {
      const matchedTest = $assertion.test.num === test.num;
      const matchedSubject = $assertion.subject === subject;

      return matchedTest && matchedSubject;
      }) || assertions.create({ subject, test });
      }
    });

    $assertions.forEach(($assertion) => {
      var updater = $tests.find(($test) => {
        return $test.num === $assertion.test.num && $test.id.startsWith("WCAG"+$scopeStore['WCAG_VERSION'].split('.').join(""));
      });
      if(updater != undefined){
        $assertion.test = updater;
      }
    });
    
    assertionsToRemove = $assertions.filter((assertion) => {
      return available.indexOf(assertion.test.num) == -1;
    });

    if(assertionsToRemove.length > 0){
      let answeredCount = 0;
      assertionsToRemove.forEach((assertion) => {
        if(assertion.result.outcome.id != "earl:untested"){
          answeredCount++;
        }
      });

      if(answeredCount > 0){
        var allowDataLoss = true;
        if($interactedOpenEvaluation != true){
          allowDataLoss = window.confirm(TRANSLATED.DATA_LOSS_WARNING)
        }
        if (allowDataLoss) {
          assertionsToRemove.forEach((assertion) => {
            assertions.remove(assertion);
          });
        } else {
          $scopeStore['WCAG_VERSION'] = oldwcag;
          $scopeStore['CONFORMANCE_TARGET'] = oldtarget;
        }
      }else{
        assertionsToRemove.forEach((assertion) => {
          assertions.remove(assertion);
        });
      }
    }
    $interactedOpenEvaluation = false;
  }  

</script>
