import { JsonArray, JsonElement, JsonNull, JsonPrimitive, RawPrimitive } from '.'

export class JsonObject extends JsonElement {
  private readonly children = new Map<string, JsonElement>()

  public clone (): JsonObject {
    const result = new JsonObject()

    this.children.forEach((value, key) => {
      result.set(key, value.clone())
    })

    return result
  }

  public set (key: string, value: JsonElement | null): this
  public set (key: string, value: RawPrimitive): this
  public set (key: string, value: JsonElement | RawPrimitive | null): this {
    let element: JsonElement = JsonNull.INSTANCE

    if (value !== null) {
      if (value instanceof JsonElement) {
        element = value
      } else {
        element = new JsonPrimitive(value)
      }
    }

    this.children.set(key, element)

    return this
  }

  public delete (key: string): boolean {
    return this.children.delete(key)
  }

  public entries (): IterableIterator<[string, JsonElement]> {
    return this.children.entries()
  }

  public keys (): IterableIterator<string> {
    return this.children.keys()
  }

  public size (): number {
    return this.children.size
  }

  public has (key: string): boolean {
    return this.children.has(key)
  }

  public get (key: string): JsonElement | null {
    return this.children.get(key) ?? null
  }

  public getPrimitive (key: string): JsonPrimitive {
    const value = this.children.get(key)

    if (value == null) throw new Error(`No element "${key}"`)

    return value.getAsPrimitive()
  }

  public getArray (key: string): JsonArray {
    const value = this.children.get(key)

    if (value == null) throw new Error(`No element "${key}"`)

    return value.getAsArray()
  }

  public getObject (key: string): JsonObject {
    const value = this.children.get(key)

    if (value == null) throw new Error(`No element "${key}"`)

    return value.getAsObject()
  }

  public serialize (): unknown {
    const result: Record<string, unknown> = {}

    this.children.forEach((value, key) => {
      result[key] = value.serialize()
    })

    return result
  }
}
