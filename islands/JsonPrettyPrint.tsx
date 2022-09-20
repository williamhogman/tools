import { IS_BROWSER } from "$fresh/runtime.ts";
import { useCallback, useState } from "preact/hooks";

function prettifyJSON(j: string): string {
  try {
    const parsed = JSON.parse(j);
    const pretty = JSON.stringify(parsed, null, 4);
    return pretty;
  } catch (e) {
    return j;
  }
}

export default function JsonPrettyPrint(props: Record<string, unknown>) {
  const [content, setContent] = useState<string>("");
  const onClick = useCallback(
    (e: Event) => {
      e.preventDefault();
      setContent((content: string) => prettifyJSON(content));
    },
    [setContent]
  );
  const onPaste = useCallback(() => {
    setTimeout(onClick, 1);
  }, [onClick]);
  const onInput = useCallback(
    (e: h.JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
      setContent(e?.currentTarget?.value ?? ""),
    [setContent]
  );
  return (
    <form onSubmit={onClick} class="w-full flex flex-col">
      <textarea
        autofocus
        onPaste={onPaste}
        onInput={onInput}
        class="w-full border-2 h-96 rounded outline-none"
        value={content}
      />
      <input
        class="bg-gray-700 text-white py-2 rounded border-2 border-gray-400"
        type="submit"
        disabled={!IS_BROWSER}
      >
        Prettify
      </input>
    </form>
  );
}
