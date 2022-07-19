/** @jsx h */
import { tw } from "@twind";
import type { ComponentChildren } from "preact";
import { h } from "preact";
import Instruction from "./Instruction.tsx";
import Sidebar from "./Sidebar.tsx";
interface Props {
  children: ComponentChildren;
  heading?: string;
  description?: string;
}

export default function Page({ children, heading, description }: Props) {
  return (
    <div class={tw`flex flex-row flex-wrap-reverse gap-8 mt-4 mx-2`}>
      <Sidebar />
      <div class={tw`flex-grow w-80 max-w-xl lg:max-w-3xl`}>
        {description && heading ? (
          <Instruction heading={heading} description={description} />
        ) : null}
        {children}
      </div>
    </div>
  );
}
