import path from 'path'
import fs from 'fs'
import glob from 'tiny-glob'

export async function mkdirp(dir: string) {
  try {
    await fs.promises.mkdir(dir, { recursive: true })
  } catch (e: any) {
    if (e.code === 'EEXIST') return
    throw e
  }
}

export const copy = async (fromPath: string, toPath: string) => {
  const stat = await fs.promises.stat(fromPath)
  if (stat.isDirectory()) {
    return copyDir(fromPath, toPath)
  }
  return copyFile(fromPath, toPath)
}

export const copyFile = async (fromFile: string, toFile: string) => {
  await mkdirp(path.dirname(toFile))
  await fs.promises.copyFile(fromFile, toFile)
}

export const copyDir = async (fromDir: string, toDir: string) => {
  const files = await glob('**/*', { cwd: fromDir, filesOnly: true })
  await Promise.all(
    files.map(async (file) => {
      const fromPath = path.join(fromDir, file)
      const toPath = path.join(toDir, file)
      await mkdirp(path.dirname(toPath))
      await fs.promises.copyFile(fromPath, toPath)
    }),
  )
}

export const outputFile = async (filepath: string, data: string | Buffer) => {
  await mkdirp(path.dirname(filepath))
  await fs.promises.writeFile(filepath, data)
}
export const moveFile = async (fromPath: string, toPath: string) => {
  await mkdirp(path.dirname(toPath))
  await fs.promises.copyFile(fromPath, toPath)
  await fs.promises.unlink(fromPath)
}

export const existSync = fs.existsSync

export const removeSync = fs.rmSync
