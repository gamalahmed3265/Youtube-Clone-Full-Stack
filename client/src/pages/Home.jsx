import { useState,useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import React from "react";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({typeVideo}) => {
  const [videos,setVideos]=useState([]);

  
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await axios.get(`/videos/${typeVideo}`);
        setVideos(res.data.videos);
      } catch (error) {
        setVideos([]);
      }
        
    };
    fetchData();
  },[typeVideo]);
  return (
    <Container>
        {
          videos.length!==0?
          videos.map((video)=>(
            <Card video={video} key={video._id} />

))
:<></>
        }
    </Container>
  );
};

export default Home;