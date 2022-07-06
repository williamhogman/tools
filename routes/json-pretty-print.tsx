/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import JsonPrettyPrint from "../islands/JsonPrettyPrint.tsx";

export default function JsonPrettyPrintPage() {
  return (
    <div class={tw`flex flex-row`}>
      <div class={tw`w-30`}>
      </div>
      <div class={tw`flex-1 max-w-xl mx-4`}>
        <div class={tw`mb-4`}>
          <h2 class={tw`text-xl`}>Json Pretty Print</h2>
          <p class={tw`text-l`}>This pretty prints your JSON</p>
        </div>
        <JsonPrettyPrint />
      </div>
    </div>

  )
}