import { JsonElement, JsonNull, JsonPrimitive, RawPrimitive } from '.'

export class JsonArray extends JsonElement {
  private readonly values: JsonElement[] = []

  public clone (): JsonArray {
    const result = new JsonArray()

    this.values.forEach((value) => {
      result.add(value.clone())
    })

    return result
  }

  public add (value: JsonElement | null): this
  public add (value: RawPrimitive): this
  public add (value: JsonElement | RawPrimitive | null): this {
    let element: JsonElement = JsonNull.INSTANCE

    if (value !== null) {
      if (value instanceof JsonElement) {
        element = value
      } else {
        element = new JsonPrimitive(value)
      }
    }

    this.values.push(element)

    return this
  }

  public addAll (array: JsonArray): this {
    array.values.forEach((element) => {
      this.values.push(element)
    })

    return this
  }

  public set (index: number, element: JsonElement): this {
    this.values[index] = element

    return this
  }

  public remove (value: JsonElement): boolean;
  public remove (index: number): JsonElement | undefined;
  public remove (value: JsonElement | number): boolean | JsonElement | undefined {
    let index, result

    if (typeof value === 'number') {
      index = value
      result = this.values[index]
    } else {
      index = this.values.indexOf(value)
      result = index > -1
    }

    if (result === true || result !== undefined) this.values.splice(index, 1)

    return result
  }

  public includes (value: JsonElement): boolean {
    return this.values.includes(value)
  }

  public size (): number {
    return this.values.length
  }

  public isEmpty (): boolean {
    return this.values.length === 0
  }

  public iterator (): IterableIterator<JsonElement> {
    return this.values[Symbol.iterator]()
  }

  public get (i: number): JsonElement {
    const value = this.values[i]

    if (value === undefined) throw new Error(`No element at index ${i}`)

    return value
  }

  public override getAsBoolean (): boolean {
    if (this.values.length !== 1) throw new Error('Operation not supported')

    return this.get(0).getAsBoolean()
  }

  public override getAsNumber (): number {
    if (this.values.length !== 1) throw new Error('Operation not supported')

    return this.get(0).getAsNumber()
  }

  public override getAsString (): string {
    if (this.values.length !== 1) throw new Error('Operation not supported')

    return this.get(0).getAsString()
  }

  public serialize (): unknown {
    const result: unknown[] = []

    this.values.forEach((value) => {
      result.push(value.serialize())
    })

    return result
  }
}
