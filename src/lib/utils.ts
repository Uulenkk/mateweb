export const cn = (...cls: Array<string | undefined | false>) => cls.filter(Boolean).join(' ')
