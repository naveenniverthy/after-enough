export const defaultFilters = {
  orientation: "",
  intensity: "",
  duration: "",
  budget: "",
  comfort: "",
  food: "",
  location: "",
  bestFor: "",
};

export function normalizeFilters(filters) {
  return {
    ...defaultFilters,
    ...(filters ?? {}),
  };
}
