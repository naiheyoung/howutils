interface DirectoryItem {
  dir: string,
  child: DirectoryItem[]
}

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T