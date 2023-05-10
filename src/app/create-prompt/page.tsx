'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'





const CreatePrompt = () => {

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const router = useRouter()
  const { data: session } = useSession();

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.name,
          tag: post.tag
        })
      })

      if(response.ok) {
        router.push('/')
      }
    } 
    catch (error) {
      console.log('====================================');
      console.log('Error: ', error);
      console.log('====================================');
    }
    finally {
      setSubmitting(false)
    }
    
  }



  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt