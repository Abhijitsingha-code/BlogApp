import React, { useEffect, useState } from 'react';
import './Single.css'
import SinglePost from '../../components/SinglePost/SinglePost'
import RelatedBlog from '../../components/RelatedBlog/RelatedBlog';
import Loader from '../../components/Loader/Loader';

const Single = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setTimeout(()=>{
        setIsLoading(false);
      },1000)
  }, []);
  return (
    <div className='single'>
      {isLoading ? <Loader /> : <SinglePost/>}
        <RelatedBlog/>
    </div>
  )
}

export default Single