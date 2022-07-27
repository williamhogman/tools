/** @jsx h */
import { h } from "preact";
import HyperList from "../../components/HyperList.tsx";
import Page from "../../components/Page.tsx";
import { getNames } from "../../data/countries.ts";

const OFFSET = 127397;

function countryCodeToEmoji(letters: string): string {
  if (letters.length != 2) {
    throw new Error("Not a country code");
  }

  const codePoints = [...letters.toUpperCase()].map(
    (c) => (c.codePointAt(0) ?? 0) + OFFSET
  );
  return String.fromCodePoint(...codePoints);
}

export default function JsonPrettyPrintPage() {
  const names: Record<string, string> = getNames("en", { select: "alias" });
  return (
    <Page
      heading="Countries"
      description="Find the country you are looking for below"
    >
      <HyperList
        urlBase={"/countries/"}
        items={Object.entries(names).map(([code, name]) => ({
          value: code,
          name: [countryCodeToEmoji(code), name].join(" "),
        }))}
      />
    </Page>
  );
}
