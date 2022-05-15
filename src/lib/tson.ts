import { JsonArray, JsonElement, JsonNull, JsonObject, JsonPrimitive, RawPrimitive } from '.'

export function isPrimitive (value: unknown): value is RawPrimitive {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

export function createJsonArray (values: unknown[]): JsonArray {
  const result = new JsonArray()

  values.forEach((value) => {
    result.add(createJsonElement(value))
  })

  return result
}

export function createJsonObject (value: object): JsonObject {
  const result = new JsonObject()

  Object.entries(value).forEach(([key, value]) => {
    result.set(key, createJsonElement(value))
  })

  return result
}

export function createJsonElement (value: unknown): JsonElement {
  if (value === null) return JsonNull.INSTANCE

  if (isPrimitive(value)) return new JsonPrimitive(value)

  if (Array.isArray(value)) return createJsonArray(value)

  if (typeof value === 'object') return createJsonObject(value)

  throw new Error(`Not JSON Element: ${String(value)}`)
}

export function parseJson (value: string): JsonElement {
  return createJsonElement(JSON.parse(value))
}
