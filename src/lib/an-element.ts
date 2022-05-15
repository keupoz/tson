import { JsonArray, JsonNull, JsonObject, JsonPrimitive } from '.'

export abstract class JsonElement {
  public abstract clone (): JsonElement
  public abstract serialize (): unknown

  public isArray (): this is JsonArray {
    return this instanceof JsonArray
  }

  public isObject (): this is JsonObject {
    return this instanceof JsonObject
  }

  public isPrimitive (): this is JsonPrimitive {
    return this instanceof JsonPrimitive
  }

  public isNull (): this is JsonNull {
    return this instanceof JsonNull
  }

  public getAsObject (): JsonObject {
    if (!this.isObject()) throw new Error(`Not a JSON Object: ${this.toString()}`)

    return this
  }

  public getAsArray (): JsonArray {
    if (!this.isArray()) throw new Error(`Not a JSON Array: ${this.toString()}`)

    return this
  }

  public getAsPrimitive (): JsonPrimitive {
    if (!this.isPrimitive()) throw new Error(`Not a JSON Primitive: ${this.toString()}`)

    return this
  }

  public getAsNull (): JsonNull {
    if (!this.isNull()) throw new Error(`Not a JSON Null: ${this.toString()}`)

    return this
  }

  public getAsBoolean (): boolean {
    throw new Error('Unsupported operation')
  }

  public getAsNumber (): number {
    throw new Error('Unsupported operation')
  }

  public getAsInteger (): number {
    return this.getAsNumber() | 0
  }

  public getAsString (): string {
    throw new Error('Unsupported operation')
  }

  public toJSON (): string {
    return JSON.stringify(this.serialize())
  }

  public toString (): string {
    return this.toJSON()
  }
}
