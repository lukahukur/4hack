import { setArticleDetails } from '../slices/create.slice'
import { setAppState } from '../slices/global'
import { previewState } from '../slices/ide.state'
import { AppDispatch, AppStore } from '../store'

export const AdminPageManager: any =
  (store: AppStore) => (next: AppDispatch) => (action: any) => {
    if (setAppState.match(action) && action.payload === 'none') {
      store.dispatch(previewState(false))
      store.dispatch(
        setArticleDetails({
          author: '',
          body: '',
          header: '',
          image: '',
          metatags: '',
          topic: '',
        })
      )
    }

    return next(action)
  }
