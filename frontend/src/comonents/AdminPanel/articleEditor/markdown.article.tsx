import { marked } from 'marked'
import { FC, useEffect, useRef, useState, memo } from 'react'
import styles from '../styles/editor.module.scss'
import h from 'highlight.js'
import { sanitize } from 'dompurify'
import Editor from '@monaco-editor/react'

const renderer = new marked.Renderer()
/**
 *
 * @function sanitize() filters html
 *
 * here we prevent  xss
 */
renderer.html = (html) => {
  return sanitize(html, { USE_PROFILES: { html: true, svg: true } })
}
/**
 *
 * @returns sanitized text
 */
renderer.text = (text) => {
  console.log(text)
  return sanitize(text)
}
/**
 *
 *
 *
 *@disabled variable saves state of code editor visibility
 *
 */
const ArticleEditor: FC<{
  getArticle: (...args: any) => void
  previewState: boolean
  useLocalStorage: boolean
  text?: string
}> = ({ getArticle, previewState, useLocalStorage, text }) => {
  const display = useRef<any>(null)
  const textareaWrapper = useRef<any>(null)
  const articleWrapper = useRef<any>(null)
  const border = useRef<any>(null)
  const editorRef = useRef<any>(null)
  const [defText, setDefText] = useState<any>('')

  useEffect(() => {
    preview() // if true, centered layout and hidden editor
  }, [previewState])

  const preview = () => {
    const on = () => {
      display.current!.classList.remove(styles.md_text_display_editor)
      display.current!.classList.add(styles.md_text_display)
      textareaWrapper!.current.style.display = 'none'
      articleWrapper!.current.style.justifyContent = 'center'
    }
    const off = () => {
      display.current!.classList.add(styles.md_text_display_editor)
      display.current!.classList.remove(styles.md_text_display)
      textareaWrapper!.current.style.display = 'flex'
      articleWrapper!.current.style.justifyContent = 'space-between'
    }

    if (!previewState) {
      on()
    } else {
      off()
    }
  }

  const rerender = (e: any) => {
    display.current!.innerHTML = marked(e, { renderer })

    if (useLocalStorage) {
      localStorage.setItem('text', e)
    }

    getArticle(e)

    h.highlightAll()
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
  }

  useEffect(() => {
    if (useLocalStorage) {
      getArticle(localStorage.getItem('text') || '')

      display.current!.innerHTML = marked(
        localStorage.getItem('text') || '',
        { renderer }
      )

      setDefText(localStorage.getItem('text') || '// some text...')
    } else {
      if (text) {
        getArticle(text)

        display.current!.innerHTML = marked(text, { renderer })

        setDefText(text)
      }
    }

    h.highlightAll()
  }, [text])

  return (
    <span className={'w-full h-full flex flex-col mt-3'}>
      <span
        className="flex flex-row w-full bg-white"
        ref={articleWrapper}
        style={{ justifyContent: 'space-between' }}
      >
        <span
          ref={textareaWrapper}
          className="mb-3  overflow-hidden  h-min"
        >
          {(defText || text) && (
            <Editor
              height="2000px"
              onMount={handleEditorDidMount}
              width="55vw"
              defaultLanguage="markdown"
              defaultValue={useLocalStorage ? defText : text}
              theme="vs-dark"
              onChange={(e) => rerender(e)}
              options={{
                mouseWheelZoom: true,
                padding: {
                  top: 15,
                },
                lineNumbers: 'off',
                wrappingStrategy: 'advanced',
                minimap: {
                  enabled: false,
                },
              }}
            />
          )}
        </span>
        <span
          ref={border}
          style={{
            width: previewState ? '762px' : '750px',
            height: previewState ? '2000px' : '',
            overflowY: previewState ? 'scroll' : 'hidden',
            overflowX: 'hidden',
          }}
        >
          <div
            className={styles.md_text_display_editor}
            ref={display}
          />
        </span>
      </span>
    </span>
  )
}

export default ArticleEditor
