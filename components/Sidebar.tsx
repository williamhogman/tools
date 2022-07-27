/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

interface Link {
  name: string;
  href: string;
}

const LINKS: Link[] = [
  { name: "Json Pretty Print", href: "/json-pretty-print" },
  { name: "Generate QR code", href: "/qr-code" },
  { name: "Countries", href: "/countries" },
  { name: "Currencies", href: "/currencies" },
  { name: "Birthday Problem", href: "/birthday" },
];

export default function Sidebar() {
  return (
    <div class={tw`w-40 align-self-end`}>
      <h2 class={tw`text-sm font-bold`}>More stupid tools:</h2>
      <ul>
        {LINKS.map((link: Link) => (
          <li class={tw`text-sm hover:(font-bold)`}>
            <a class={tw`text-blue-300`} href={link.href}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
