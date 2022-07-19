import langDataRaw from "./languages.json" assert { type: "json" };

export interface Lang {
  English: string;
  French: string;
  alpha2: string | null;
  "alpha3-b": string;
  "alpha3-t": string | null;
}

const langData: Lang[] = langDataRaw;

const alpha3Lang = new Map<string, Lang>();
langData.forEach((x) => alpha3Lang.set(x["alpha3-b"], x));

const alpha2Lang = new Map<string, Lang>();
langData.forEach((x) => {
  if (x.alpha2) {
    alpha2Lang.set(x.alpha2, x);
  }
});

type ConsiderResponse =
  | {
      lang: Lang;
    }
  | {
      redir: string;
    }
  | null;

export function considerCode(code: string): ConsiderResponse {
  const codeLower = code.toLowerCase();
  if (codeLower.length == 2) {
    const lang = alpha2Lang.get(codeLower);
    if (!lang) {
      return null;
    } else if (codeLower != code) {
      return { redir: codeLower };
    } else {
      return { lang };
    }
  } else if (codeLower.length == 3) {
    const lang = alpha3Lang.get(codeLower);
    if (!lang) {
      return null;
    }
    if (lang.alpha2) {
      return { redir: lang.alpha2 };
    } else if (codeLower != code) {
      return { redir: codeLower };
    } else {
      return { lang };
    }
  } else {
    return null;
  }
}
