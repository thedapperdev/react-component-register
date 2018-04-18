
import * as Path from 'path'

const getSrcPath = dir => Path.join(__dirname, 'src', dir)

module.exports = {
  resolve: {
    alias: {
      utils: getSrcPath('utils'),
      templates: getSrcPath('templates')
    }
  }
}
