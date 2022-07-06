/** @jsx h */
import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

function prettifyJSON(j: string): string {
  try {
    const parsed = JSON.parse(j);
    const pretty = JSON.stringify(
      parsed,
      null,
      4
    )
    return pretty
  } catch (e) {
    return j
  }
}

export default function JsonPrettyPrint(props: {}) {
  const [content, setContent] = useState<string>("");
  const onClick = useCallback(
    () => setContent((content: string) => prettifyJSON(content)),
    [setContent]
  );
  return (
    <div class={tw`w-full flex flex-col h-50`}>
      <textarea autofocus onPaste={() => setTimeout(onClick, 1)} onInput={e => setContent(e.target.value)} class={tw`w-full border-2 h-96 rounded outline-none`} value={content} />
      <button
        class={tw`bg-gray-700 text-white py-2 rounded border-2 border-gray-400`}
        onClick={onClick}
        disabled={!IS_BROWSER}
      >
        Prettify
      </button>
    </div>
  );
}
