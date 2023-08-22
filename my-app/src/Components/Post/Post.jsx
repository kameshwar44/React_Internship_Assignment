import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Post.css'
import CheckBox from '../CheckBoxData/CheckBox';

function Post() {
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(resp.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
    <div className='post-container'>
      <table className="post-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{display:'flex', justifyContent:'center'}}>
    <CheckBox/>

    </div>
    </>
  );
}

export default Post;
