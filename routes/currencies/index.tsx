import Page from "../../components/Page.tsx";
import HyperList from "../../components/HyperList.tsx";
import currencies, { Currency } from "@data/currencies.ts";

export default function Currencies() {
  return (
    <Page heading="Currencies" description="Currencies of the world">
      <HyperList
        urlBase="/currencies/"
        items={Object.values(currencies).map((x) => ({
          value: x.code,
          name: `${x.code} - ${x.name}`,
        }))}
      />
    </Page>
  );
}
