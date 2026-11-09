
import {
  Monster,
  MonsterAction,
} from "../types/Monster";

// Traduz os tamanhos utilizados no JSON.
const SIZE_MAP: Record<string, string> = {
  T: "Minúsculo",
  S: "Pequeno",
  M: "Médio",
  L: "Grande",
  H: "Enorme",
  G: "Imenso",
};

// Traduz os códigos de alinhamento.
const ALIGNMENT_MAP: Record<string, string> = {
  L: "Leal",
  N: "Neutro",
  C: "Caótico",
  G: "Bom",
  E: "Mau",
  U: "Indeterminado",
};

// Remove as marcações especiais do 5e.tools,
// preservando o conteúdo textual.
function cleanText(value: string): string {
  return value.replace(
    /\{@[^{}]+?\}/g,
    (tag) => {
      const content = tag.slice(2, -1);
      const parts = content.split("|");

      return parts[1] ?? parts[0].split(" ")[1] ?? "";
    }
  );
}

// Converte estruturas de texto em string.
function getText(value: any): string {
  if (value == null) return "";

  if (typeof value === "string") {
    return cleanText(value);
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(getText).filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    if (value.entries) return getText(value.entries);
    if (value.entry) return getText(value.entry);
    if (value.items) return getText(value.items);

    return "";
  }

  return "";
}

// Converte objetos de perícias em texto.
function formatSkills(skills: any): string {
  if (!skills) return "Nenhuma";

  return Object.entries(skills)
    .map(([name, value]) => `${name}: ${value}`)
    .join(", ");
}

// Converte os atributos.
function getAbility(monster: any, key: string) {
  const score = monster[key] ?? 10;

  const modifier = Math.floor((score - 10) / 2);

  const save = monster.save?.[key];

  return {
    score,
    modifier,
    ...(save !== undefined
      ? { save: Number(String(save).replace("+", "")) }
      : {}),
  };
}

// Converte ações, características e reações.
function getActions(items: any[] = []): MonsterAction[] {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    const entries = item.entries ?? item.headerEntries ?? [];

    return {
      name: item.name ?? "Sem nome",
      description: getText(entries),
    };
  });
}

// Converte tamanho.
function formatSize(size: any): string {
  if (!Array.isArray(size)) return "Desconhecido";

  return size
    .map((item) => SIZE_MAP[item] ?? item)
    .join(", ");
}

// Converte alinhamento.
function formatAlignment(alignment: any): string {
  if (!Array.isArray(alignment)) return "Não informado";

  return alignment
    .map((item) => {
      if (typeof item === "string") {
        return ALIGNMENT_MAP[item] ?? item;
      }

      return getText(item);
    })
    .filter(Boolean)
    .join(" ");
}

// Converte tipo de criatura.
function formatType(type: any): string {
  if (typeof type === "string") return type;

  if (typeof type === "object" && type !== null) {
    const name = type.type ?? "Desconhecido";
    const tags = type.tags ?? [];

    return tags.length
      ? `${name} (${tags.map((tag: any) =>
          typeof tag === "string" ? tag : tag.prefix ?? ""
        ).filter(Boolean).join(", ")})`
      : name;
  }

  return "Desconhecido";
}

// Converte CA.
function formatArmorClass(ac: any): string {
  if (!Array.isArray(ac) || !ac.length) return "—";

  return ac.map((item) => {
    if (typeof item === "number") {
      return String(item);
    }

    if (typeof item === "object") {
      const description = getText(item.from);

      return description
        ? `${item.ac} (${description})`
        : String(item.ac ?? "—");
    }

    return String(item);
  }).join(" / ");
}

// Converte deslocamento.
function formatSpeed(speed: any): string {
  if (!speed) return "—";

  return Object.entries(speed)
    .filter(([key]) => key !== "canHover")
    .map(([key, value]) => {
      if (typeof value === "boolean") return "";

      return `${key}: ${getText(value)} ft.`;
    })
    .filter(Boolean)
    .join(", ");
}

// Converte iniciativa.
function formatInitiative(monster: any): string {
  const initiative = monster.initiative;

  if (initiative == null) {
    const dex = monster.dex ?? 10;

    const modifier = Math.floor((dex - 10) / 2);

    return modifier >= 0 ? `+${modifier}` : String(modifier);
  }

  if (typeof initiative === "number" ||
      typeof initiative === "string") {
    return String(initiative);
  }

  if (typeof initiative === "object") {
    const dexModifier = Math.floor(
      ((monster.dex ?? 10) - 10) / 2
    );

    const proficiency = initiative.proficiency ?? 0;
    const bonus = initiative.bonus ?? 0;

    const total = dexModifier + proficiency + bonus;

    return total >= 0 ? `+${total}` : String(total);
  }

  return "—";
}

// Conversor principal.
export function mapApiMonster(data: any): Monster {
  const cr = data.cr;

  const challenge =
    typeof cr === "object" ? cr.cr : cr;

  const hp = data.hp ?? {};

  return {
    id: `${data.source}:${data.name}`,
    source: data.source,

    name: data.name,
    image: undefined,

    size: formatSize(data.size),
    type: formatType(data.type),
    alignment: formatAlignment(data.alignment),

    challenge: String(challenge ?? "—"),
    xp: String(cr?.xp ?? data.xp ?? "—"),

    armorClass: formatArmorClass(data.ac),

    hitPoints: hp.average != null
      ? `${hp.average} (${hp.formula ?? ""})`
      : "—",

    initiative: formatInitiative(data),

    speed: formatSpeed(data.speed),

    abilities: {
      str: getAbility(data, "str"),
      dex: getAbility(data, "dex"),
      con: getAbility(data, "con"),
      int: getAbility(data, "int"),
      wis: getAbility(data, "wis"),
      cha: getAbility(data, "cha"),
    },

    skills: formatSkills(data.skill),

    damageResistances: getText(data.resist) || "Nenhuma",
    damageImmunities: getText(data.immune) || "Nenhuma",
    conditionImmunities: getText(data.conditionImmune) || "Nenhuma",

    senses: getText(data.senses) || (
      data.passive != null
        ? `Percepção passiva ${data.passive}`
        : "Nenhum"
    ),

    languages: getText(data.languages) || "Nenhum",

    traits: getActions(data.trait),
    actions: getActions(data.action),

    bonusActions: getActions(
      data.bonus ?? data.bonusActions
    ),

    reactions: getActions(data.reaction),
    legendaryActions: getActions(data.legendary),

    lairActions: getActions(data.lairActions),
    regionalEffects: getActions(data.regionalEffects),
  };
}
