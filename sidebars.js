/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'fate-condensed/intro',
    {
      type: 'category',
      label: 'Fate 濃縮版',
      collapsible: true,
      collapsed: false,
      items: [
        'fate-condensed/introduction',
        'fate-condensed/getting-start',
        'fate-condensed/taking-action-rolling-dice',
        'fate-condensed/aspects-and-fate-points',
        'fate-condensed/challenges-conflicts-and-contests',
        'fate-condensed/advancement',
        'fate-condensed/being-game-master',
        'fate-condensed/optional-rules',
      ]
    },
  ],
};

module.exports = sidebars;
