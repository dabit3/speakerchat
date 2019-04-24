// eslint-disable
// this is an auto generated file. This will be overwritten

export const listCommentsForTalk = `query ListCommentsForTalk($talkId: ID!) {
  listCommentsForTalk(talkId: $talkId) {
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
`;
export const getTalk = `query GetTalk($id: ID!) {
  getTalk(id: $id) {
    id
    title
    speakerName
    clientId
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
export const listTalks = `query ListTalks {
  listTalks(limit: 500) {
    items {
      id
      title
      speakerName
      clientId
      speakerImage
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    talkId
    clientId
    talk {
      id
      title
      speakerName
      clientId
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
export const listComments = `query ListComments {
  listComments(limit: 500) {
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
`;
