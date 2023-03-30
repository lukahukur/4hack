import { MutableRefObject } from 'react'

interface validationObject {
  value: string
  input: MutableRefObject<any>
}

export default class ValidateForm {
  validateMany = (
    vals: validationObject[],
    callback: (...args: any[]) => any
  ): Promise<(...args: any) => void> => {
    return new Promise((resolve, reject) => {
      let errCount = 0
      for (let elems of vals) {
        if (!elems.value) {
          errCount++
          elems.input!.current.style.border = '1px solid red'
          setTimeout(
            () =>
              (elems.input!.current.style.border = '1px solid gray'),
            3000
          )
        }
      }

      if (errCount) reject('Field is Empty')
      else resolve(callback())
    })
  }
}
