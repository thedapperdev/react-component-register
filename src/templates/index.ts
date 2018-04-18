import { kebabCase } from 'lodash/fp'
import { pascalCase } from './../utils'

export const indexFile = (name: string) =>
  `export { default as ${ pascalCase(name) } } from './${ kebabCase(name) }'`

export const componentFile = (name: string) =>
  `import React, { PureComponent } from 'react'
import { Base${ pascalCase(name) } } from './styled-${ kebabCase(name) }'

interface Props {

}

export default class ${ pascalCase(name) } extends PureComponent<Props> {
  render() {
    return (<Base${ pascalCase(name) } />)
  }
}`

export const styledComponentFile = (name: string) =>
  `import styled, { StyledFunction, css } from 'styled-components'

export const Base${ pascalCase(name) } = styled.div\`
  content: "styling"
\``