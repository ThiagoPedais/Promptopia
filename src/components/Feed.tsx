'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";



const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {

  const [serachText, setSerachText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();

      setPosts(data)
    }
    console.log(posts);
    

    fetchPosts()
  }, [])


  return (
    <section className="feed">
      <form action="" className="realtive w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={serachText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed