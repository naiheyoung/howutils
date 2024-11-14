import { readdir, readFile, access, constants } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

/**
 * Given a directory name, return all the file paths under it.
 *
 * @param {string} dir target directory
 * @param {...string[]} options Additional Configuration Items
 *
 * @throws {Error} If the directory name is illegal, an exception will be thrown. (/[<>:"\\|?*]/)
 *
 * @returns {Promise<DirectoryItem[]>}
 *
 * @example
 * await getFilePaths('dir/share')
 */
export async function getMarkdownPaths(dir: string, ...options: string[]): Promise<any> {
  if (/[<>:"\\|?*]/.test(dir)) {
    throw new Error('The directory name is invalid.')
  }

  const entries = await readdir(dir, { withFileTypes: true })

  const paths = await Promise.all(
    entries.map(async (entry) => {
      const _fullpath = join(dir, entry.name)
      if (entry.isDirectory()) {
        return await getMarkdownPaths(_fullpath)
      }
      return entry.name.endsWith('.md') ? _fullpath.replaceAll('\\', '/').replaceAll(/index\.md$/g, '') : ['']
    })
  )
  return paths.flat(Infinity)
}

/**
 * Convert markdown file to html.
 *
 * Only supports single file.
 *
 * @param {string} path the single markdown path
 * @returns {Promise<string>}
 *
 * @example
 * await markdownToHtml('pages/share/index.md')
 */
export async function markdownToHtml(path: string): Promise<string> {
  try {
    await access(path)
    const raw = await readFile(path, 'utf-8')
    const { data, content } = matter(raw)
    return markdown.render(content)
  } catch (error) {
    throw new Error('File does not exist.')
  }
}
