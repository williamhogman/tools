/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import Page from "../../../components/Page.tsx";

function hrOffsetToClockOffset(hrOffset: string) {
  const offsetDecimal = parseFloat(hrOffset);
  const hrs = Math.floor(offsetDecimal);
  const mins = Math.round((offsetDecimal - hrs) * 60);
  return `${hrs > 0 ? "+" : ""}${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

function clockOffsetToHrsOffset(clockOffset: string): number {
  return extHours(clockOffset) + extMinutes(clockOffset) / 60;
}

function extHours(offset: string): number {
  return parseInt(offset.split(":")[0]);
}

function extMinutes(offset: string): number {
  return parseInt(offset.split(":")[1]);
}

export const handler: Handlers<{} | null> = {
  GET(_, ctx) {
    const { tz } = ctx.params;
    if (/^[-+]?[0-9]*\.?[0-9]*$/.exec(tz) && !isNaN(parseFloat(tz))) {
      return new Response("Redirecting...", {
        status: 302,
        headers: {
          Location: "/timezones/" + hrOffsetToClockOffset(ctx.params.tz),
        },
      });
    }

    const { code } = ctx.params;
    return ctx.render({});
  },
};

function describeTz(tz: string): string {
  const hrs = extHours(tz);
  const mins = extMinutes(tz);
  const behindAhead = hrs > 0 ? "behind" : "ahead of";
  const andMinutes = mins > 0 ? `and ${mins} minutes` : "";
  return `${hrs} hours ${andMinutes} ${behindAhead} UTC`;
}

interface TimezoneProps {
  timezone: Timezone;
}

function Timezone({ timezone: { abbr } }: TimezoneProps) {
  const href = `/timezones/${abbr}`;
  return (
    <li>
      <a href={href}>{abbr}</a>
    </li>
  );
}

export default function TimezonesOffset(props: PageProps) {
  const tz = props.params.tz;
  const hrOffset = clockOffsetToHrsOffset(tz);
  const tzMatches: any = []; //timezones.filter((x) => x.offset === hrOffset);
  const nDst = tzMatches.reduce((acc, x) => acc + (x.isdst ? 1 : 0), 0);
  const hours = extHours(tz);
  const minutes = extMinutes(tz);

  const description =
    describeTz(tz) +
    ". " +
    `This offset is used in ${
      tzMatches.length - nDst
    } timezones and is the DST timezone for ${nDst}`;
  return (
    <Page heading={`UTC${tz}`} description={description}>
      <nav>
        <ul>
          <li>
            <a
              href={`${hours > 0 ? "+" : ""}${(hours + 1)
                .toString()
                .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`}
            >
              +1hr
            </a>
          </li>
          <li>
            <a
              href={`${hours > 0 ? "+" : ""}${(hours - 1)
                .toString()
                .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`}
            >
              -1hr
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <ul class={tw`list-disc list-inside`}>
          {tzMatches.map((x: any) => (
            <Timezone key={x.abbr} timezone={x} />
          ))}
        </ul>
      </div>
    </Page>
  );
}
