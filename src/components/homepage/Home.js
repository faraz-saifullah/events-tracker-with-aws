import React, { Fragment } from "react";
import Hero from "./Hero";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
          {" "}
          <b>one stop destination for managing all your events</b>
        </p>
      </div>
      <HomeContent />
    </>
  );
}
