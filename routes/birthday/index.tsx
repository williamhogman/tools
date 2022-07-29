/** @jsx h */
import { h } from "preact";
import HyperList from "../../components/HyperList.tsx";
import Page from "../../components/Page.tsx";

const GROUPS = [
  {
    value: "2-room",
    text: "What's the probability of two people sharing a birthday",
  },
];

function inRoom(n: number, c: number) {
  return {
    value: `whats-the-probability-of-${c}-people-sharing-a-birthday-in-a-room-of-${n}-people`,
    name: `In a room of ${n} people`,
    group: `${c}-room`,
  };
}

const IN_ROOM = [
  inRoom(10, 2),
  inRoom(15, 2),
  inRoom(25, 2),
  inRoom(50, 2),
  inRoom(100, 2),
];

const VALUES = IN_ROOM;

export default function Birthday() {
  return (
    <Page
      heading="The Birthday Problem"
      description="What is the probability of two people sharing a birthday"
    >
      <HyperList urlBase="/birthday/" items={VALUES} groups={GROUPS} />
    </Page>
  );
}
