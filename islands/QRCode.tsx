/** @jsx h */
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

export default function QRCode() {
  const [code, setCode] = useState("");
  const onSubmit = useCallback(
    (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
      e.preventDefault();
      const t = e.currentTarget;
      if (t == null) {
        return;
      }
      const fd = new FormData(t);
      const newCode = fd.get("code");
      setCode(newCode?.toString() ?? "");
    },
    []
  );
  return (
    <form onSubmit={onSubmit} class={tw`grid gap-5`}>
      <input
        name="code"
        type="text"
        placeholder="Text to embed in the QR code"
        required
        class={tw`border-1 p-1 border-dashed text-lg`}
      />
      <input class={tw`border-1 p-1`} type="submit" value="Generate" />
      <output name="result" for="code">
        {code != "" ? (
          <img
            class={tw`w-80 m-auto`}
            src={`/api/qr?d=${encodeURIComponent(code)}`}
          />
        ) : null}
      </output>
    </form>
  );
}
