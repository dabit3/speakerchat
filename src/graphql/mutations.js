// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTalk = `mutation CreateTalk($input: CreateTalkInput!) {
  createTalk(input: $input) {
    id
    title
    speakerName
    speakerImage
    comments {
      items {
        id
        talkId
        clientId
        text
        createdAt
        createdBy
      }
      nextToken
    }
  }
}
`;
export const updateTalk = `mutation UpdateTalk($input: UpdateTalkInput!) {
  updateTalk(input: $input) {
    id
    title
    speakerName
    speakerImage
    comments {
      items {
        id
        talkId
        clientId
        text
        createdAt
        createdBy
      }
      nextToken
    }
  }
}
`;
export const deleteTalk = `mutation DeleteTalk($input: DeleteTalkInput!) {
  deleteTalk(input: $input) {
    id
    title
    speakerName
    speakerImage
    comments {
      items {
        id
        talkId
        clientId
        text
        createdAt
        createdBy
      }
      nextToken
    }
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    talkId
    clientId
    talk {
      id
      title
      speakerName
      speakerImage
      comments {
        nextToken
      }
    }
    text
    createdAt
    createdBy
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    talkId
    clientId
    talk {
      id
      title
      speakerName
      speakerImage
      comments {
        nextToken
      }
    }
    text
    createdAt
    createdBy
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    talkId
    clientId
    talk {
      id
      title
      speakerName
      speakerImage
      comments {
        nextToken
      }
    }
    text
    createdAt
    createdBy
  }
}
`;
