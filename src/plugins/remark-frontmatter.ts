import { frontmatterFromMarkdown, frontmatterToMarkdown } from 'mdast-util-frontmatter'
import { frontmatter, Options } from 'micromark-extension-frontmatter'

export default function remarkFrontmatter(options: Options | null | undefined) {
    // @ts-expect-error: TS is wrong about `this`.
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = (this)
    const settings = options || 'yaml'
    const data = self.data()

    const micromarkExtensions =
        data.micromarkExtensions || (data.micromarkExtensions = [])
    const fromMarkdownExtensions =
        data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
    const toMarkdownExtensions =
        data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

    micromarkExtensions.push(frontmatter(settings))
    fromMarkdownExtensions.push(frontmatterFromMarkdown(settings))
    toMarkdownExtensions.push(frontmatterToMarkdown(settings))
}
