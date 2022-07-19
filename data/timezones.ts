import { readCSV } from "https://deno.land/x/csv/mod.ts";

export interface Timezone {
  value: string;
  abbr: string;
  offset: number;
  isdst: boolean;
  text: string;
  utc: string[];
}

function loadTimezones() {
  const path = new URL('', import.meta.url).pathname
  const f = readCSV(Deno.open(path + "/time_zonee.csv" , { read: true, write: false }))
  const mp = new Map<string, {}>
  for (const row of f) {
     const [zoneName, countryCode, abbreviation, time_start, gmt_offset, dst] = row;
  }}
