import { IS_BROWSER } from "$fresh/runtime.ts";
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
    <form onSubmit={onSubmit} class="grid gap-5">
      <input
        name="code"
        type="text"
        placeholder="Text to embed in the QR code"
        required
        class="border-1 p-1 border-dashed text-lg"
      />
      <input class="border-1 p-1" type="submit" value="Generate" />
      <output name="result" for="code">
        {code != "" ? (
          <img
            class="w-80 m-auto"
            src={`/api/qr?d=${encodeURIComponent(code)}`}
          />
        ) : null}
      </output>
    </form>
  );
}
