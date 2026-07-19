// Keep aliases and every consumer-specific brand field in this one definition list.
// vendorNames overrides names only when news matching intentionally differs.
const BRAND_DEFINITIONS = [
];

export const BRANDS = BRAND_DEFINITIONS
  .filter(brand => Number.isInteger(brand.planOrder))
  .sort((a, b) => a.planOrder - b.planOrder)
  .map(brand => ({
    id: brand.id,
    label: brand.label,
    providers: brand.names,
    iconUrl: brand.iconUrl
  }));

export const PROVIDER_NAME_MAP = Object.fromEntries(
  BRANDS.flatMap(brand => brand.providers.map(provider => [provider, brand.label]))
);

export function brandForProvider(provider) {
  const providerName = String(provider ?? '').trim();
  if (!providerName) return undefined;

  const exactMatch = BRANDS.find(brand => brand.providers.includes(providerName));
  if (exactMatch) return exactMatch;

  let bestMatch;
  let bestAliasLength = -1;
  for (const brand of BRANDS) {
    for (const alias of brand.providers) {
      if (providerName.includes(alias) && alias.length > bestAliasLength) {
        bestMatch = brand;
        bestAliasLength = alias.length;
      }
    }
  }
  return bestMatch;
}

export const VENDOR_NAMES = BRAND_DEFINITIONS.flatMap(brand => brand.vendorNames ?? brand.names);
