/** @jsx h */
import { tw } from "@twind";
import { h, ComponentChildren } from "preact";

export interface HyperListItem {
  value: string;
  name: string;
}

export interface HyperListProps {
  items: HyperListItem[];
  urlBase?: string;
  heading?: string;
}

export default function HyperList({ items, urlBase, heading }: HyperListProps) {
  const headingEl =
    heading != null ? (
      <li class={tw`col-span-full text-xl`}>{heading}</li>
    ) : null;
  return (
    <ul class={tw`grid grid-cols-2 lg:grid-cols-3 list-none gap-0.5 ml-4`}>
      {headingEl}
      {items.map((x) => (
        <li>
          <a
            class={tw`hover:underline underline-offset-8`}
            href={(urlBase ?? "") + x.value}
          >
            {x.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
