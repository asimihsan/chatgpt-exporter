export interface ExportMeta {
    name: string
    value: string
}

export interface ExporterSettings {
    format: string
    enableTimestamp: boolean
    timeStamp24H: boolean
    enableTimestampHTML: boolean
    enableTimestampMarkdown: boolean
    enableMeta: boolean
    exportMetaList: ExportMeta[]
    exportAllLimit: number
}

export const DEFAULT_FILENAME_FORMAT = 'ChatGPT-{title}'
export const DEFAULT_EXPORT_ALL_LIMIT = 1000

export const DEFAULT_EXPORT_META_LIST: ExportMeta[] = [
    { name: 'title', value: '{title}' },
    { name: 'source', value: '{source}' },
]

export const DEFAULT_EXPORTER_SETTINGS: ExporterSettings = {
    format: DEFAULT_FILENAME_FORMAT,
    enableTimestamp: false,
    timeStamp24H: false,
    enableTimestampHTML: false,
    enableTimestampMarkdown: false,
    enableMeta: false,
    exportMetaList: DEFAULT_EXPORT_META_LIST,
    exportAllLimit: DEFAULT_EXPORT_ALL_LIMIT,
}
