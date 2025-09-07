export interface CarBasic {
id: number
make: string
model: string
year: number
}

export interface CarDetailsRaw {
Trims?: Array<Record<string, any>>
[key: string]: any
}

export interface CachedCarDetails {
loading: boolean
error?: string
data?: CarDetailsRaw
}