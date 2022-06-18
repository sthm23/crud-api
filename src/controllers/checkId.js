import { validate, version } from 'uuid';

export const checkId = (id) => {
  return validate(id) && version(id) === 4;
};