import React, { useState } from 'react';

// Style
import Button from '../styles/Button';
import { PostForm } from '../styles/PostForm';
import PostFormDiv from '../styles/PostFormDiv';
import { PostSelect } from '../styles/PostSelect';
import { PostInfoDiv } from '../styles/PostInfoDiv';
import '../styles/Post.css';
import { SubmitHandler, useForm } from 'react-hook-form';

// API
import { postStudyFn } from '../apis/crudAPI';
import { useMutation } from 'react-query';
type PostInputs = {
  category: string;
  peopleNumber: string | number;
};

function Post() {
  const peoleNumber = ['인원 미상', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log('test');
  const { register, handleSubmit } = useForm<PostInputs>();

  const { mutate: postStudy } = useMutation((postData: PostInputs) =>
    postStudyFn(postData),
  );

  const onSubmitHandler: SubmitHandler<PostInputs> = (values) => {
    postStudy(values);
    console.log('포스트 제출');
    console.log(values);
  };

  return (
    <PostFormDiv>
      <h1>글쓰기</h1>
      <PostForm onSubmit={handleSubmit(onSubmitHandler)} id="postForm">
        <div className="post-info">
          <PostInfoDiv>
            <label htmlFor="category-select">카테고리</label>
            <PostSelect
              id="category-select"
              form="postForm"
              {...register('category')}
            >
              <option value="java-script">JavaScript</option>
            </PostSelect>
          </PostInfoDiv>
          <PostInfoDiv>
            <label htmlFor="people-number-select">모집인원</label>
            <PostSelect
              id="people-number-select"
              fom="postForm"
              {...register('peopleNumber')}
            >
              {peoleNumber.map((number, index) => (
                <option key={index}>{number}</option>
              ))}
            </PostSelect>
          </PostInfoDiv>
        </div>

        <Button>새 글 쓰기</Button>
      </PostForm>
    </PostFormDiv>
  );
}

export default Post;
