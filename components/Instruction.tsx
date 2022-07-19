/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export default function Instruction({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div class={tw`mb-4`}>
      <h2 class={tw`text-xl`}>{heading}</h2>
      <p class={tw`text-lg`}>{description}</p>
    </div>
  );
}
