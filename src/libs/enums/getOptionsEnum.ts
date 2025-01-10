export const getOptionsFromEnum = (enumOptions) =>
    Object.entries(enumOptions)
    .map((option) => option.join('=')).join