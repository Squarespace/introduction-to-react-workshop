// copy and paste this file over to the main src directory

export const avatarNames = [
  'ade',
  'chris',
  'christian',
  'daniel',
  'elliot',
  'helen',
  'jenny',
  'joe',
  'justen',
  'laura',
  'matt',
  'nan',
  'steve',
  'stevie',
  'veronika',
];

export default function getAvatarUrl(name, size) {
  return `https://semantic-ui.com/images/avatar/${size}/${name}.jpg`;
}
