import { PageProps, Handlers } from "$fresh/server.ts";
import Page from "../../components/Page.tsx";
import { getFullInfo, CountryData, Idd, Name } from "../../data/countries.ts";

export const handler: Handlers<CountryData | null> = {
  async GET(_, ctx) {
    const { code } = ctx.params;
    const info = await getFullInfo(code);
    return ctx.render(info);
  },
};

const SUFFIXES = ["", "k", "m", "b"];

function numWithSuffixUnit(num: number): [number, string] {
  let nnum = num;
  for (let i = 0; i < SUFFIXES.length; i++) {
    const next = nnum / 1000;
    if (next < 1) {
      return [nnum, SUFFIXES[i]];
    }
    nnum = next;
  }
  return [nnum, SUFFIXES[SUFFIXES.length - 1]];
}

const numberFormat = new Intl.NumberFormat("en-GB", {
  maximumSignificantDigits: 3,
});

function BigNum({ num }: { num: number }) {
  const [shortNum, suffix] = numWithSuffixUnit(num);
  const shortNumFormatted = numberFormat.format(shortNum);
  return <span>{shortNumFormatted + suffix}</span>;
}

function PillBadge(props: { name: string; value: string }) {
  return (
    <span class="flex">
      <div class="bg-indigo-300 text-white py-1 px-2 rounded-l-lg">
        {props.name}
      </div>
      <div class="bg-indigo-100 text-white p-1 rounded-r-lg">
        {props.value}
      </div>
    </span>
  );
}

function toDegreeString(val: number, pos: string, neg: string) {
  const sign = val > 0 ? pos : neg;
  const valFormatted = numberFormat.format(Math.abs(val));
  return `${valFormatted}° ${sign}`;
}

function Coordinates({ latlng: [lat, lng] }: { latlng: [number, number] }) {
  const latS = toDegreeString(lat, "N", "S");
  const lngS = toDegreeString(lng, "E", "W");
  return (
    <span>
      {latS} {lngS}
    </span>
  );
}

function Values({
  object,
  sep,
  parenthesis,
  link,
}: {
  object: Record<string, string> | string[];
  parenthesis?: boolean;
  sep?: string;
  link?: string;
}) {
  const vals = Array.isArray(object) ? object : Object.values(object);
  const linkSegments = Array.isArray(object) ? object : Object.keys(object);
  if (vals.length === 0) {
    return null;
  }
  const els = [];
  if (parenthesis) {
    els.push("(");
  }
  for (let i = 0; i < vals.length; i++) {
    const v = vals[i];
    els.push(
      link != null ? (
        <a
          class="border-b-2 border-dotted border-indigo-300 hover:border-solid"
          href={`${link}${linkSegments[i]}`}
        >
          {v}
        </a>
      ) : (
        <span>{v}</span>
      )
    );
    els.push(sep ?? " / ");
  }
  els.pop();
  if (parenthesis) {
    els.push(")");
  }

  return <span>{els}</span>;
}

function CountryNames({
  name: { common, official, nativeName },
}: {
  name: Name;
}) {
  const nativeNames = Object.entries(nativeName ?? {})
    .filter(([k, _x]) => k != "eng")
    .map(([k, x]) => x.common);

  const officialNames = Object.entries(nativeName ?? {})
    .filter(([k, _x]) => k != "eng")
    .map(([k, x]) => x.official);
  return (
    <hgroup>
      <h1 class="text-3xl">
        {common}{" "}
        <span class="text-gray-500 italic">
          <Values object={nativeNames} parenthesis />
        </span>
      </h1>
      <h2>
        <span class="text-gray-500 italic">Officially: </span>

        <span>
          {official} <Values object={officialNames} parenthesis />
        </span>
      </h2>
    </hgroup>
  );
}

function timezoneToUTCDelta(tz: string): number {
  if (tz === "UTC") {
    return 0;
  }
  console.log(tz);
  const [hrs, mins] = tz
    .slice(3)
    .split(":")
    .map((x) => parseInt(x, 10));
  const decimal = hrs + Math.sign(hrs) * (mins / 60);
  return decimal;
}

export default function GreetPage(props: PageProps<CountryData | null>) {
  const { data } = props;
  if (!data) {
    return (
      <Page heading="That's not country I ever heard of">Say what again!</Page>
    );
  }

  return (
    <Page>
      <CountryNames name={data.name} />
      {data.unMember && data.independent ? (
        <p>An independent country in {data.subregion ?? data.region}</p>
      ) : null}
      <div class="flex gap-2 rounded my-4 flex-wrap">
        <PillBadge name={"alpha-2"} value={data.cca2} />
        <PillBadge name={"alpha-3"} value={data.cca3} />
        {data.ccn3 ? <PillBadge name={"num-3"} value={data.ccn3} /> : null}
        {data.cioc && data.fifa !== data.cioc ? (
          <PillBadge name={"🏸"} value={data.cioc} />
        ) : null}
        {data.fifa && data.fifa !== data.cca3 ? (
          <PillBadge name={"⚽"} value={data.fifa} />
        ) : null}
        {(data.tld ?? []).map((x) => (
          <PillBadge name={"dns"} value={x} />
        ))}
      </div>

      <div
        style={{ gridTemplateColumns: "20rem 1fr" }}
        class="grid gap-x-1"
      >
        <div>Currency</div>
        <div>
          <Values
            sep={", "}
            object={Object.fromEntries(
              Object.entries(data.currencies ?? {}).map(([k, x]) => [
                k,
                `${x.name} (${k}; ${x.symbol})`,
              ])
            )}
            link={`/currencies/`}
          />
        </div>
        <div>Phone prefix</div>
        <div>
          <DialingInfo idd={data.idd} />
        </div>
        <div>Coordinates</div>
        <div>
          <Coordinates latlng={data.latlng} />
        </div>
        <div>Capital</div>
        <div>
          <Values object={data.capital ?? []} />
        </div>
        <div>Population</div>
        <div>
          <BigNum num={data.population} />
        </div>
        <div>Languages</div>
        <div>
          <Values link="/languages/" object={data.languages ?? {}} sep=", " />
        </div>
        <div>Timezones (offset from GMT)</div>
        <div>
          <Values
            object={data.timezones
              .map(timezoneToUTCDelta)
              .map((x) => (x > 0 ? `+${x}` : `${x}`))}
            sep=", "
            link="/timezones/"
          />
        </div>
      </div>

      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </Page>
  );
}

function DialingInfo({ idd: { root, suffixes } }: { idd: Idd }) {
  if (!root || !suffixes) {
    return null;
  }
  if (!suffixes || !suffixes.length) {
    return <div>root</div>;
  }
  const codes = suffixes.map((x) => `${root}${x}`);
  if (codes.length > 10 && root == "+1") {
    return <div>+1 (North American Numbering Plan)</div>;
  }
  return (
    <div>
      <Values object={codes.slice(0, 10)} sep=", " link="/phone/prefix/" />
    </div>
  );
}
