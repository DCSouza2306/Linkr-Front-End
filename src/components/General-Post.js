import styled from "styled-components";
import { AiOutlineHeart, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { URL_BASE } from "../constants/url";
import axios from "axios";
import { AuthContext } from "../context/auth-context";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";


export default function GeneralPost({ id, urlImage, name, content, link, setModalIsOpen}) {
	  

 
  const { userData } = React.useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };


 

  function deletePost() {
    axios
      .delete(`${URL_BASE}/posts/${id}`, config)
      .then(() => {
        alert("deletou");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }
  return (
    <Container>
      <div className="post" key={id}>
        <div className="headerPost">
          <div className="leftSide">
            <img src={urlImage} alt="profile picture" />
            <AiOutlineHeart className="iconHeart" />
          </div>
          <div className="rightSide">
            <div className="name-buttons">
              <p className="name">{name}</p>
              <div className="buttons-edit-delete">
                <AiFillEdit className="icon-button" />
                <AiFillDelete
                  className="icon-button"
                  onClick={()=>setModalIsOpen(true)}
                />
              </div>
            </div>
            <p className="a">{content}</p>
          </div>
        </div>
        <div className="linkEmbed">
          <iframe src={link} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  background-color: #171717;
  color: #ffffff;
  width: 611px;
  font-family: "Lato", sans-serif;

 

  .headerPost {
    display: flex;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    position: absolute;
    top: 16px;
  }

  .iconHeart {
    width: 30px;
    height: 30px;
    color: #ffffff;
    margin-top: 8px;
    cursor: pointer;
    position: absolute;
    top: 72px;
  }
  .leftSide {
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .rightSide {
    width: 85%;
    margin-top: 16px;
    margin-left: 8px;
    overflow-wrap: break-word;

    .name-buttons {
      display: flex;
      justify-content: space-between;

      .buttons-edit-delete {
        margin-right: 20px;
        width: 80px;
        display: flex;
        justify-content: space-around;
        font-size: 20px;

        .icon-button:hover {
          cursor: pointer;
        }
      }
    }

    .a {
      margin-top: 8px;
    }
  }

  .linkEmbed {
    display: flex;
    justify-content: center;
  }

  iframe {
    width: 90%;
    height: 80%;
    margin-top: 8px;
    margin-bottom: 16px;
  }
`;
