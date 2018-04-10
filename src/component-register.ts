import * as Fs from 'fs'
import * as Path from 'path'
import { kebabCase } from 'lodash'
import { indexFile, componentFile, styledComponentFile } from './templates'

class ComponentRegister {
  path: string
  components: string[]
  constructor(componentRootPath: string) {
    this.path = componentRootPath
    this.components = []
    this.createComponent()
    this.registerAll()
  }

  writeIndex(): void {
    this.writeFile(Path.join(this.path, 'index.ts'), (stream: Fs.WriteStream)  => {
      this.components.sort().forEach(component => {
        stream.write(`export * from './${ component }'\r\n`)
      })
    })
  }

  private isFolder(folderPath: string): boolean {
    let isDir = false
    try {
      isDir = Fs.statSync(folderPath)
        .isDirectory()
    } catch (err) {
      //  ignore errs
    }
    return isDir
  }

  private getFilesList(path = this.path): string[] {
    let contents: string[] = []
    try {
      contents = Fs.readdirSync(path)
    } catch (err) {
      console.log(`cannot run component register.. ${ err }`)
    }
    return contents
  }

  private hasIndexFile(componentPath: string): boolean {
    return Fs.existsSync(Path.join(componentPath, 'index.ts')) ||
      Fs.existsSync(Path.join(componentPath, 'index.tsx'))
  }

  private registerSingle(folderPath: string): void {
    const entirePath = Path.join(this.path, folderPath)
    if (this.isFolder(entirePath) && this.hasIndexFile(entirePath)) {
      this.components.push(folderPath)
    }
  }

  private registerAll(): string[] {
    for (const file of this.getFilesList()) {
      this.registerSingle(file)
    }
    return this.components
  }

  private writeFile(path: string, processStream: Function): void {
    const stream: Fs.WriteStream = Fs.createWriteStream(path)
    stream.once('open', () => {
      processStream(stream)
    })
  }

  private getComponentArg() {
    let [, , component]: string[] = process.argv
    component = component && component.includes('=') ?
      (component.split('=')[1] || component) : component
    
    return component
  }

  private createComponent(): void {
    const component = this.getComponentArg()
    if (component) {
      const componentPath = Path.join(this.path, component)
      if (!Fs.existsSync(componentPath)) {
        Fs.mkdirSync(componentPath)

        // write index
        this.writeFile(Path.join(componentPath, 'index.ts'),
          (stream: Fs.WriteStream) => {
            stream.write(indexFile(component))
          })

        //  write tsx
        this.writeFile(Path.join(componentPath, `${ kebabCase(component) }.tsx`),
          (stream: Fs.WriteStream) => {
            stream.write(componentFile(component))
          })

        //  write styled-component
        this.writeFile(Path.join(componentPath, `styled-${ kebabCase(component) }.ts`),
          (stream: Fs.WriteStream) => {
            stream.write(styledComponentFile(component))
          })
      }
    }
  }
}

new ComponentRegister('./src/components').writeIndex()
