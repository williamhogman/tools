import { PageProps } from "$fresh/server.ts";
import HyperList, {
  HyperGroup,
  HyperListItem,
} from "~/components/HyperList.tsx";
import Page from "../../components/Page.tsx";
import { pbirthday } from "../../data/birthday.ts";

const PR_RE =
  /whats-the-probability-of-(\d+)-people-sharing-a-birthday-in-a-room-of-(\d+)-people/;
const EVENT_RE = /(\d+)-coincidences-for-(\d+)-events-out-of-(\d+)-classes/;

interface Params {
  n: number;
  classes: number;
  coincident: number;
  birthday: boolean;
}

function paramsToUrl(p: Params): string {
  if (p.birthday) {
    return `whats-the-probability-of-${p.coincident}-people-sharing-a-birthday-in-a-room-of-${p.n}-people`;
  } else {
    return `${p.coincident}-coincidences-for-${p.n}-events-out-of-${p.classes}-classes`;
  }
}

function extractQuestion(url: string): Params | null {
  const pr = PR_RE.exec(url);
  const ev = EVENT_RE.exec(url);
  if (pr) {
    const [coincident, n] = Array.from(pr)
      .slice(1)
      .map((x) => parseInt(x, 10));
    return {
      n,
      classes: 365,
      coincident,
      birthday: true,
    };
  } else if (ev) {
    const [coincident, n, classes] = Array.from(ev)
      .slice(1)
      .map((x) => parseInt(x, 10));
    return {
      n,
      classes,
      coincident,
      birthday: false,
    };
  } else {
    return null;
  }
}

function description(p: Params): string {
  if (p.birthday) {
    return `What's the probability of ${p.coincident} people sharing a birthday in a room of ${p.n} people`;
  } else {
    return `What's the probability of ${p.coincident} conincidences of ${p.n} events beloning to ${p.classes}`;
  }
}

function title(p: Params): string {
  if (p.birthday) {
    return `${p.coincident} people sharing a birthday`;
  } else {
    return `${p.coincident} conincidences out of ${p.n} `;
  }
}

function probabilityToWord(w: number): string {
  if (w === 1) {
    return "Certain";
  } else if (w === 0) {
    return "Impossible";
  }
  const VALS = {
    "Almost Certain": 0.93,
    Probable: 0.75,
    "Chances about even": 0.5,
    "Probably Not": 0.3,
    "Almost Certainly Not": 0.07,
  };
  const s = Object.entries(VALS).map(
    ([s, v]) => [Math.pow(v - w, 2), s] as [number, string]
  );
  s.sort((a, b) => a[0] - b[0]);
  return s[0][1];
}

function Pct({ p }: { p: number }) {
  const pct = p.toLocaleString(undefined, {
    style: "percent",
    maximumSignificantDigits: 4,
  });
  return (
    <span>
      <span
        title={p.toLocaleString(undefined, {
          style: "percent",
          maximumSignificantDigits: 10,
        })}
        class="text-xl"
      >
        {pct}
      </span>
      {" " + probabilityToWord(p)}
    </span>
  );
}

function Options({ params }: { params: Params }) {
  const N = [1, 2, 5, 10, 15, 25, 50, 75, 100, 250, 500].map((n) => ({
    ...params,
    n,
  }));
  const coincidences = [1, 2, 3, 4, 5].map((x) => ({
    ...params,
    coincident: x,
  }));
  const possiblities = [10, 100, 365, 1000].map((x) => ({
    ...params,
    classes: x,
    birthday: false,
  }));
  const events = params.birthday ? "people" : "events";

  const hli: HyperListItem[] = [
    N.map((n) => ({
      value: paramsToUrl(n),
      name: `${n.n} ${events}`,
      group: "n",
    })),
    coincidences.map((x) => ({
      value: paramsToUrl(x),
      name: `${x.coincident} coinsidences`,
      group: "c",
    })),
    possiblities.map((x) => ({
      value: paramsToUrl(x),
      name: `${x.classes} possiblities`,
      group: "classes",
    })),
  ].flat(1);

  const hlg: HyperGroup[] = [
    {
      text: events,
      value: "n",
    },
    {
      text: params.birthday ? "People per birthday" : "Coinciding events",
      value: "c",
    },
    {
      text: "Possibilities",
      value: "classes",
    },
  ];

  return <HyperList items={hli} groups={hlg} />;
}

export default function Birthday(props: PageProps) {
  const q = extractQuestion(props.params.slug);
  if (!q) {
    return null;
  }

  const p = pbirthday(q.n, q.classes, q.coincident);

  return (
    <Page heading={title(q)} description={description(q)}>
      <p>
        The probability is <Pct p={p} />
      </p>
      <Options params={q} />
    </Page>
  );
}
