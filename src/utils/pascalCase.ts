import { 
  camelCase,
  capitalize,
  head,
  isString,
  tail,
} from 'lodash/fp'

const pascalCase = (input: string) => {
  const capitalised = capitalize(input)
  const firstChar = head(capitalised)
  return firstChar && isString(firstChar)
    ? `${ firstChar }${ camelCase(tail(capitalised).join('')) }`
    : capitalised
}

export default pascalCase