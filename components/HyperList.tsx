import { tw } from "twind";

export interface HyperListItem {
  value: string;
  name: string;
  group?: string;
}

export interface HyperGroup {
  value: string;
  text: string;
}

export interface HyperListProps {
  items: HyperListItem[];
  groups?: HyperGroup[];
  urlBase?: string;
  heading?: string;
}

interface GroupSplit {
  ungrouped: HyperListItem[];
  groups: Array<{
    group: HyperGroup;
    content: HyperListItem[];
  }>;
}

function splitGroups(items: HyperListItem[], groups: HyperGroup[]): GroupSplit {
  return {
    groups: groups
      .map((group) => ({
        group,
        content: items.filter((item) => item.group == group.value),
      }))
      .filter((g) => g.content.length > 0),
    ungrouped: items.filter((item) => item.group == null),
  };
}

interface RenderSegment {
  text: string | null;
  items: HyperListItem[];
}

function renderSegments({ ungrouped, groups }: GroupSplit): RenderSegment[] {
  const ug = ungrouped.length > 0 ? [{ text: null, items: ungrouped }] : []; //
  const gs = groups.map(({ group: { text }, content }) => ({
    text,
    items: content,
  }));
  return [...ug, ...gs];
}

function HyperListItem({
  data: { value, name },
  urlBase,
}: {
  data: HyperListItem;
  urlBase?: string | null | undefined;
}) {
  return (
    <li>
      <a
        class="hover:underline underline-offset-8"
        href={(urlBase ?? "") + value}
      >
        {name}
      </a>
    </li>
  );
}

export default function HyperList({
  items,
  urlBase,
  heading,
  groups: rawGroups,
}: HyperListProps) {
  const headingEl =
    heading != null ? <li class="col-span-full text-xl">{heading}</li> : null;

  const rs = renderSegments(splitGroups(items ?? [], rawGroups ?? []));
  const onlyOne = rs.length === 1;
  const gridCls = tw`grid grid-cols-2 lg:grid-cols-3 list-none gap-0.5 ml-4`;
  const rsEls = rs.map(({ text, items }) => (
    <>
      {text ? <h3 class="font-bold">{text}</h3> : null}
      <ul class={onlyOne ? gridCls : ""}>
        {items.map((data) => (
          <HyperListItem urlBase={urlBase} data={data} />
        ))}
      </ul>
    </>
  ));

  if (rsEls.length == 0) {
    return <div>Nothing to see here</div>;
  } else if (rsEls.length == 1) {
    return rsEls[0];
  } else {
    return (
      <ul class={gridCls}>
        {headingEl}
        {rsEls.map((x) => (
          <li>{x}</li>
        ))}
      </ul>
    );
  }
}
