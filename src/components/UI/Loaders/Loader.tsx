"use client";
import { useLoader } from "../../../../store/storeLoader";
import { Jura } from "next/font/google";
import { memo } from "react";
const jura = Jura({ subsets: ["cyrillic"], weight: ["700"] });

function Loader() {
  const [visibleLoader, text]: [boolean, string] = useLoader((state) => [state.visible, state.text]);

  return (
    <span className={`Loader  ${jura.className} `} style={visibleLoader ? { display: "block" } : { display: "none" }}>
      {text}
    </span>
  );
}
export default memo(Loader)