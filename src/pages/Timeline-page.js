import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";

import Modal from "../components/Timeline-components/Modal";
import AddPost from "../components/Timeline-components/Add-Post";
import GeneralPost from "../components/Timeline-components/General-Post";
import Header from "../components/Header-components/Header";
import LoadingMessage from "../components/Timeline-components/LoadingMessage";
import NoPostsMessage from "../components/Timeline-components/NoPostsMessage";
import { URL_BASE } from "../constants/url";
import { AuthContext } from "../context/auth-context";
import { isLiked, lika, request } from "../requests/requests.js";
import HashtagBox from "../components/Timeline-components/Hashtag-box";

export default function TimelinePage(params) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  const [postsComments, setPostsComments] = useState([]);
  const { refreshTimeline, setUserData, userData, hashtags } =
    React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const [likes, setLikes] = useState();
  const [listIsLiked, setListIsLiked] = useState();
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };
  let userId = userData.userId;
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    setUserData(token);
    axios
      .get(`${URL_BASE}/posts`)
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.data);
        Swal.fire({
          width: "300px",
          title: "Error",
          text: "An error occured while trying to fetch the posts, please refresh the page",
          icon: "error",
          button: "OK",
        });
      });

    axios
      .get(`${URL_BASE}/posts/comments`, config)
      .then((res) => {
        setPostsComments(res.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });

    axios
      .get(`${URL_BASE}/comments`)
      .then((res) => {
        setCommentsCount(res.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });

    const requestLikes = async () => {
      const data = await request({ config });
      setLikes(data?.likesPost);
      setListIsLiked(data?.isLiked);
    };

    requestLikes();
  }, [refreshTimeline]);
  return (
    <>
      <Header />

      <Wrapper>
        {modalIsOpen ? (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            closeModal={setModalIsOpen}
            idPost={idPost}
            contentLabel="Example Modal"
            overlayClassName="modal-overlay"
            className="modal-content"
          />
        ) : null}

        <section className="left-container-timeline">
          <AddPost />
          {isLoading && <LoadingMessage />}
          {posts.length === 0 && isLoading === false ? (
            <NoPostsMessage />
          ) : (
            posts.map((p, i) => (
              <GeneralPost
                key={i}
                id={p.id}
                userId={p.userId}
                urlImage={p.urlImage}
                name={p.name}
                content={p.content}
                link={p.link}
                metaTitle={p.metaTitle}
                metaDesc={p.metaDesc}
                metaImage={p.metaImage}
                postsComments={postsComments}
                setModalIsOpen={setModalIsOpen}
                commentsCount={commentsCount}
                setIdPost={setIdPost}
                like={lika({ likes, p })}
                isLiked={isLiked({ listIsLiked, p, userId })}
              />
            ))
          )}
        </section>
        <HashtagBox />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #333333;
  padding-top: 100px;
  width: 100vw;
  justify-content: center;
  display: flex;
  position: relative;

  section{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
