import { eduSABegginer } from '@/app/layout';
import { useEffect } from 'react';


const AdditionalTextHandler = ({children, loadNextText}) => {

    useEffect(() => {
        // bubble an action to load the text?    
    }, [loadNextText])




  return (
    children
  )
}

export default AdditionalTextHandler