import { TDBUser } from '../../../Server/Service/serviceUser/model/types/Types'



export const getAbbreviatedUser = (user: TDBUser): string => {
  return `${user.surname} ${user.name
    ?.[0]
    .toUpperCase()}. ${user.lastName?.[0].toUpperCase()}`;
};
