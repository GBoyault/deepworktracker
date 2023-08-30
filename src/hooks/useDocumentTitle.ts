import { useEffect, useRef } from 'react'

const useDocumentTitle = (title: string) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title

    return () => {
      document.title = defaultTitle.current
    }
  }, [title])
}

export default useDocumentTitle
