import { publish } from 'gh-pages';

publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/J3Jab/CSARCH2_WebApp.git',
    user: {
      name: 'J3Jab',
      email: 'jason_jan_jabanes@dlsu.edu.ph'
    },
    dotfiles: true
  },
  () => {
    console.log('Deploy Complete!');
  }
);