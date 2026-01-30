import { publish } from 'gh-pages';

publish(
  'dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/zamdim/convertRubAmdUsd',
    user: {
      name: 'vlad',
      email: 'zamyatinVlad44@gmail.com',
    },
    dotfiles: true,
  },
  () => {
    console.log('Деплой завершен!');
  },
);
