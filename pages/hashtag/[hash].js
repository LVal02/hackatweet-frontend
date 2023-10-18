import { useRouter } from 'next/router'
import Hash from '../../components/Hash';


const Post = () => {
  const router = useRouter()
  const { hash } = router.query

  return <Hash hashtag={hash}/>
}

export default Post
