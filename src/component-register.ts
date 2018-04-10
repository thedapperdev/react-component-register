import * as Fs from 'fs'
import * as Path from 'path'
import { kebabCase } from 'lodash'
import { indexFile, componentFile, styledComponentFile } from './templates'

export default class ComponentRegister {
  public path: string
  components: string[]
  constructor(componentRootPath: string) {
    console.log(componentRootPath, 'waay')
    this.path = componentRootPath
    this.components = []
    this.registerAll()
  }

  public writeIndex(): void {
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

  public isValidComponent(path: string) {
    return this.isFolder(path) && this.hasIndexFile(path)
  }

  private registerSingle(folderPath: string): void {
    const entirePath = Path.join(this.path, folderPath)
    if (this.isValidComponent(entirePath)) {
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

  public createComponent(name: string): void {
    if (name) {
      const componentPath = Path.join(this.path, name)
      if (!Fs.existsSync(componentPath)) {
        Fs.mkdirSync(componentPath)
        console.log('here')
        // write index
        this.writeFile(Path.join(componentPath, 'index.ts'),
          (stream: Fs.WriteStream) => {
            stream.write(indexFile(name))
          })

        //  write tsx
        this.writeFile(Path.join(componentPath, `${ kebabCase(name) }.tsx`),
          (stream: Fs.WriteStream) => {
            stream.write(componentFile(name))
          })

        //  write styled-component
        this.writeFile(Path.join(componentPath, `styled-${ kebabCase(name) }.ts`),
          (stream: Fs.WriteStream) => {
            stream.write(styledComponentFile(name))
          })
      }
    }
  }
}

