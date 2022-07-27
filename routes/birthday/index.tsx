/** @jsx h */
import { h } from "preact";
import Page from "../../components/Page.tsx";

export default function Birthday() {
  return (
    <Page
      heading="The Birthday Problem"
      description="What is the probability of two people sharing a birthday"
    >
      <HyperList />
    </Page>
  );
}
