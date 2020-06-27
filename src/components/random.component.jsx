import React,{useEffect, useState} from 'react';
import { Message,Comment, Header,Dimmer, Loader, Button } from "semantic-ui-react";
import axios from "axios"

const RandomAPI = () => {
    const [post,setPost] = useState ("");
    const [comment,setComment] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [fetching, setFetching] = useState(true);
    const [background, setBackground] = useState("");
    const backgrounds = ["blue","brown","red","black"];
    useEffect(() => {
        const fetchData  = async () => {
            setLoading(true);
            const random = Math.floor(Math.random() * 101);
            const post = await axios (
                "http://jsonplaceholder.typicode.com/posts/" + random
            )
            const result = await axios (
                "http://jsonplaceholder.typicode.com/comments?postId=" + random
            )
            setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
            setPost(post.data);
            setComment(result.data);
            setLoading(false);
        }
        fetchData();
    }, [fetching])
  return (  
    <div>
        <Button
            icon="random"
            content="Random"
            color="red"
            onClick={() => setFetching(!fetching)}
        />
        <>
            <Message color={background}>
                <Message.Header>{post.title}</Message.Header>
                <div>{post.body}</div>
            </Message>
            <Comment.Group>
                <Header>
                    Comments
                </Header>
                {comment.map((comment, idx) => (
                <Comment key={idx}>
                    <Comment.Content>
                    <Comment.Author>{comment.name}</Comment.Author>
                    <Comment.Metadata>
                        <span>{comment.email}</span>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                    </Comment.Content>
                </Comment>
                ))}
          </Comment.Group>
        </>   
        <Dimmer active={loading} inverted>
            <Loader inverted>Loading...</Loader>
        </Dimmer> 
    </div>
  );
}

export default RandomAPI;
