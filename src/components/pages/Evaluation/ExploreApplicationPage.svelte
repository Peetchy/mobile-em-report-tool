<Page title="{TRANSLATED.PAGE_TITLE}" pageid="explore-application">
  <p>{@html TRANSLATED.INTRODUCTION}</p>
  <ResourceLink href="https://www.w3.org/TR/WCAG-EM/#step2">{TRANSLATED.RESOURCE_LINK_NAME}</ResourceLink>

  <form action="" novalidate>
    <h2>{TRANSLATED.OPTIONAL_EXPLORATION_NOTES_HEADING}</h2>
    <p>{@html TRANSLATED.OPTIONAL_EXPLORATION_NOTES_P1}</p>

    <Textarea
      id="essential_functionality"
      label="{TRANSLATED.ESSENTIAL_FUNCTIONALITY_LABEL}"
      helptext="{TRANSLATED.ESSENTIAL_FUNCTIONALITY_HELPTEXT}"
      bind:value="{$exploreStore['ESSENTIAL_FUNCTIONALITY']}"
    />

    <Textarea id="critical_flows" label="{TRANSLATED.CRITICAL_FLOWS_LABEL}" helptext="{TRANSLATED.CRITICAL_FLOWS_HELPTEXT}" bind:value="{$exploreStore['CRITICAL_FLOWS']}" />
    <Textarea id="dynamic_states" label="{TRANSLATED.DYNAMIC_STATES_LABEL}" helptext="{TRANSLATED.DYNAMIC_STATES_HELPTEXT}" bind:value="{$exploreStore['DYNAMIC_STATES']}" />
    <Textarea id="permissions" label="{TRANSLATED.PERMISSIONS_LABEL}" helptext="{TRANSLATED.PERMISSIONS_HELPTEXT}" bind:value="{$exploreStore['PERMISSIONS']}" />
    <Textarea id="offline_behavior" label="{TRANSLATED.OFFLINE_BEHAVIOR_LABEL}" helptext="{TRANSLATED.OFFLINE_BEHAVIOR_HELPTEXT}" bind:value="{$exploreStore['OFFLINE_BEHAVIOR']}" />
    <Textarea id="embedded_webviews" label="{TRANSLATED.EMBEDDED_WEBVIEWS_LABEL}" helptext="{TRANSLATED.EMBEDDED_WEBVIEWS_HELPTEXT}" bind:value="{$exploreStore['EMBEDDED_WEBVIEWS']}" />
  </form>
</Page>

<script>
  import { getContext } from 'svelte';

  import Page from '@app/components/ui/Page.svelte';
  import ResourceLink from '@app/components/ui/ResourceLink.svelte';
  import Textarea from '@app/components/form/Textarea.svelte';

  const { exploreStore, translate } = getContext('app');
  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.EXPLORE.TITLE'),
    INTRODUCTION: $translate('PAGES.EXPLORE.INTRO'),
    RESOURCE_LINK_NAME: $translate('PAGES.EXPLORE.RESOURCE_LINK_NAME'),
    OPTIONAL_EXPLORATION_NOTES_HEADING: $translate('PAGES.EXPLORE.HD_NOTE_TAKING'),
    OPTIONAL_EXPLORATION_NOTES_P1: $translate('PAGES.EXPLORE.INF_NOTE_TAKING'),
    ESSENTIAL_FUNCTIONALITY_LABEL: $translate('PAGES.EXPLORE.LABEL_ESSENT_FUNC'),
    ESSENTIAL_FUNCTIONALITY_HELPTEXT: $translate('PAGES.EXPLORE.INF_ESSENT_FUNC'),
    CRITICAL_FLOWS_LABEL: $translate('PAGES.EXPLORE.LABEL_CRITICAL_FLOWS'),
    CRITICAL_FLOWS_HELPTEXT: $translate('PAGES.EXPLORE.INF_CRITICAL_FLOWS'),
    DYNAMIC_STATES_LABEL: $translate('PAGES.EXPLORE.LABEL_DYNAMIC_STATES'),
    DYNAMIC_STATES_HELPTEXT: $translate('PAGES.EXPLORE.INF_DYNAMIC_STATES'),
    PERMISSIONS_LABEL: $translate('PAGES.EXPLORE.LABEL_PERMISSIONS'),
    PERMISSIONS_HELPTEXT: $translate('PAGES.EXPLORE.INF_PERMISSIONS'),
    OFFLINE_BEHAVIOR_LABEL: $translate('PAGES.EXPLORE.LABEL_OFFLINE_BEHAVIOR'),
    OFFLINE_BEHAVIOR_HELPTEXT: $translate('PAGES.EXPLORE.INF_OFFLINE_BEHAVIOR'),
    EMBEDDED_WEBVIEWS_LABEL: $translate('PAGES.EXPLORE.LABEL_EMBEDDED_WEBVIEWS'),
    EMBEDDED_WEBVIEWS_HELPTEXT: $translate('PAGES.EXPLORE.INF_EMBEDDED_WEBVIEWS')
  };
</script>
