/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Page from "../components/Page.tsx";

export default function Home() {
  return (
    <Page>
      <hgroup>
        <h1 class={tw`text-6xl`}>More stupid tools</h1>
        <h2 class={tw`text-xl text-gray-500`}>
          everyone else is too damn smart
        </h2>
      </hgroup>
    </Page>
  );
}
