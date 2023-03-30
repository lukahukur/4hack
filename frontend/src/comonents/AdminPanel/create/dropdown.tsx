import { Topics } from '@/types/types'
import { FC, MutableRefObject } from 'react'
import styles from '../styles/editor.module.scss'

export const DropDown: FC<{
  topic: string | undefined // current topic that would be sent to the server
  onChange: (...args: any[]) => void
  topics: Topics[]
  getTopics: Topics[]
  setTopic: (...args: any[]) => void
  topicRef: MutableRefObject<any>
}> = ({ topic, onChange, topics, getTopics, setTopic, topicRef }) => {
  return (
    <span className={styles.dropDownWrapper}>
      <label htmlFor="coverimg" className="font-bold w-full px-2">
        Topic: {topic && topic.toString()}
      </label>
      <div className="h-min">
        <input
          type="text"
          name="coverimg"
          className="w-48 rounded-md bg-slate-900 border border-gray-400  px-2 outline-none "
          onChange={onChange}
          ref={topicRef}
        />
        <ul className={styles.dropDown}>
          {topics &&
            getTopics.map((e, i) => {
              return (
                <li
                  key={i}
                  className="list-none pl-2 bg-slate-800 m-0 hover:bg-gray-500 cursor-pointer"
                  onClick={() => setTopic(e.name)}
                >
                  {e.name}
                </li>
              )
            })}
        </ul>
      </div>
    </span>
  )
}
