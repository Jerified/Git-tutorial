import { useToast } from '@/components/ui/use-toast'
import React,{useEffect, useState} from 'react'
import Loader from './Loader'
import Link from 'next/link'

const Repos = ({reposUrl}: any) => {
    const {toast} = useToast()
    const [repos, setRepos] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    useEffect(() => {
            const fetchRepos = async () => {
                try {
                    const res = await fetch(reposUrl)
                    const data = await res.json()
                    if(data.message) throw new Error(data.message)
                    setRepos(data)
                    // console.log(repos)
                } catch (error: any) {
                    toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive",
                        // status: "error",
                        duration: 3000,
                        // isClosable: true,
                    });
                } finally {
                    setLoading(false)
                }
            }
            fetchRepos()
    },[reposUrl, toast])
    console.log(repos)
  return (
    <div>
        <h1 className="text-2xl text-center">REPOSITORIES</h1>
        {loading && <Loader />}
        {repos.sort((a,b): any => b.stargazers_count - a.stargazers_count)
        .map((repo, index: any) => {
            if(index > 4 && !showMore) return null
            return (
                <div className="" key={repo.id}>
                    <div className="">
                        <Link href={repo.html_url}>{repo.name}</Link>
                        <p className="">{repo.language || 'None'}</p>
                    </div>
                    <div className="">
                        <p className="bg-orange-600">STARS: {repo.stargazers_count}</p>
                        <p className="bg-pink-600">FORKS: {repo.forks_count}</p>
                        <p className="bg-blue-600">WATCHERS: {repo.watchers_count}</p>
                    </div>
                </div>
            )
        })}

        {showMore && (
            <button className="" onClick={() => setShowMore(false)}>
                SHOW LESS
            </button>
        )}

        {!showMore && repos.length > 5 && (
            <button className="" onClick={() => setShowMore(true)}>
            SHOW MORE
        </button>
        )}
    </div>
  )
}

export default Repos