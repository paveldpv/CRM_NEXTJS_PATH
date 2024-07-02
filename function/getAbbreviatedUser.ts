import { TDBUser } from "@/Types/Types";

export const getAbbreviatedUser = (user: TDBUser): string => {
  return `${user.surname} ${user.name
    ?.[0]
    .toUpperCase()}. ${user.lastName?.[0].toUpperCase()}`;
};
