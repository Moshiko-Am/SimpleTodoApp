export const stringToArray: (
  str: string | string[] | undefined | null,
) => string[] = (str) => {
  if (str === undefined || str === null || str === "") {
    return [];
  }
  if (typeof str === "string") {
    return [str];
  }
  return str;
};

export const generateModifierArray: (modifier?: TModifiers) => string[] = (
  modifier,
) => {
  if (typeof modifier === "string" && modifier?.length > 0) {
    return [modifier];
  }
  const objectModifier: any = modifier; // bandage for typescript :(
  if (typeof modifier === "object" && objectModifier?.name) {
    return objectModifier?.condition ? [objectModifier?.name] : [];
  }
  if (Array.isArray(modifier)) {
    return modifier.reduce((acc: string[], curr: string | IModifier) => {
      if (typeof curr === "string") {
        return [...acc, ...(curr?.trim() ? [curr] : [])];
      }
      if (typeof curr === "object" && curr.name) {
        return curr?.condition
          ? [...acc, ...(curr?.name?.trim() ? [String(curr?.name)] : [])]
          : [...acc];
      }
      return [...acc];
    }, []);
  }
  return [];
};

export interface IModifier {
  name: string;
  condition: boolean;
}

export type TModifiers = string | IModifier | (string | IModifier)[];

interface IGenerateBEMBlockParams {
  block: string | string[];
  element?: string | string[];
  modifier?: TModifiers;
}

export const generateBEMClassName: (
  params: IGenerateBEMBlockParams,
) => string = ({ block, element, modifier }) => {
  const blockArray: string[] = stringToArray(block);
  const elementArray: string[] = stringToArray(element);
  const modifierArray: string[] =
    generateModifierArray(modifier).filter(Boolean);

  let className: string = "";
  blockArray?.forEach((block) => {
    if (elementArray?.length <= 0) {
      className += `${block} `;
      modifierArray?.forEach((modifier) => {
        if (modifier && modifier?.trim()) {
          className += `${block}${modifier ? `--${modifier}` : ""} `;
        }
      });
    } else {
      elementArray?.forEach((element) => {
        if (element && element?.trim()) {
          className += `${block}${element ? `__${element}` : ""} `;
          modifierArray?.forEach((modifier) => {
            if (modifier && modifier?.trim()) {
              className += `${block}${element ? `__${element}` : ""}${
                modifier ? `--${modifier}` : ""
              } `;
            }
          });
        }
      });
    }
  });

  return className.trim();
};
