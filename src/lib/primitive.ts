import { JsonElement } from '.'

export type RawPrimitive = boolean | number | string

export class JsonPrimitive extends JsonElement {
  private readonly value: RawPrimitive

  constructor (value: RawPrimitive) {
    super()

    this.value = value
  }

  public clone (): JsonPrimitive {
    return this
  }

  public isBoolean (): boolean {
    return typeof this.value === 'boolean'
  }

  public isNumber (): boolean {
    return typeof this.value === 'number'
  }

  public isString (): boolean {
    return typeof this.value === 'string'
  }

  public getAsBoolean (): boolean {
    switch (typeof this.value) {
      case 'boolean': return this.value
      case 'string': return this.value.toLowerCase() === 'true'
      default: throw new Error(`Not JSON Boolean: ${this.value}`)
    }
  }

  public getAsNumber (): number {
    switch (typeof this.value) {
      case 'number': return this.value
      case 'string': return parseFloat(this.value)
      default: throw new Error(`Not JSON Number: ${String(this.value)}`)
    }
  }

  public getAsInteger (): number {
    return this.getAsNumber() | 0
  }

  public getAsString (): string {
    return typeof this.value === 'string' ? this.value : String(this.value)
  }

  public serialize (): unknown {
    return this.value
  }
}
