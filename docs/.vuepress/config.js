
module.exports = {
  title: 'Feathers+ CLI',
  description: 'Wiring and auditing FeathersJS apps.',
  themeConfig: {
    /**
     * Navbar
     */
    nav: [
      { text: 'Homexx', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', items: [
              { text: '- Chinese1', link: '/language/chinese' },
              { text: '- Chinese2', link: '/language/japanese' }
            ] },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ],

    /**
     * Sidebar
     */
    sidebarDepth: 2,
    sidebar: [
      '/quick-start/',
      '/guide/',
      '/api/'
    ]
  },

  /**
   * Github editing
   */

  // Assumes GitHub. Can also be a full GitLab url.
  repo: 'feathers-plus/docs',
  // if your docs are not at the root of the repo
  docsDir: 'docs',
  // optional, defaults to master
  docsBranch: 'master',
  // defaults to true, set to false to disable
  editLinks: true,
  // custom text for edit link. Defaults to "Edit this page"
  editLinkText: 'Help us improve this page!',

  /**
   * misc
   */
  // base: '/softtoy',
  markdown: {
    toc: { includeLevel: [2, 3] } // doesn't seem to work
  }
}
