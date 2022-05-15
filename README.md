# TSON

TypeScript JSON validator inspired by Google's GSON from Java.

## Why?

There is a lot of JSON validators for TypeScript but they are either based on predefined schema or have no runtime check and just rely on type casting hoping the input is always correct.

## Installation

This library is available as NPM package:

```bash
npm install @keupoz/tson
```

## Usage

All you need is just to call the function that transforms the input to corresponding Json classes and returns a JsonElement:

```typescript
import { createJsonElement } from "@keupoz/tson";

const element = createJsonElement({ a: 1, b: { c: 2 }, d: 3 });
```

You can also parse a stringified json object and immediately transform it:

```typescript
import { parseJson } from "@keupoz/tson";

const element = parseJson("{ a: 1, b: { c: 2 }, d: 3 }");
```

All methods of JsonElement and other classes should be intuitive and are similar to their GSON alternatives.
