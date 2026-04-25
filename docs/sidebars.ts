import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Commit Crew',
      items: [
        {
          type: 'category',
          label: 'Ludarte Dashboard',
          items: [
            'Commit Crew/Ludarte Dashboard/ludarte',
            'Commit Crew/Ludarte Dashboard/backend',
            'Commit Crew/Ludarte Dashboard/database',
            'Commit Crew/Ludarte Dashboard/frontend',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
