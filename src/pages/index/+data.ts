import { toJSString } from 'mongodb-query-parser'

export const data = async () => {
  return {
    message: toJSString({ message: "Hello from +data.ts!" })
  }
}
