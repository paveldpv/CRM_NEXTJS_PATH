
import { TPropsNavLink } from "../UI/NavLink";

import NavLink from "../UI/NavLink";

type TListLink = {
  listLinks: TPropsNavLink[];
  className?: string;
  
};

export default function ListLinks({ listLinks = [], className }: TListLink) {   

  return (
    <>
      {listLinks.map((link, index) => (
        <NavLink          
          paramsHref={link?.paramsHref}
          id={link.id}
          title={link.title}
          href={link.href}
          key={index}
          description={link.description}
          className={className}
        />
      ))}
    </>
  );
}
