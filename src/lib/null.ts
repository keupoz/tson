import { JsonElement } from '.'

export class JsonNull extends JsonElement {
  // TypeScript makes classes with no unique fields
  // just the super class. This should fix that
  __proto__ = JsonElement

  public static readonly INSTANCE = new JsonNull()

  private constructor () {
    super()
  }

  public clone (): JsonNull {
    return JsonNull.INSTANCE
  }

  public serialize (): unknown {
    return null
  }
}
