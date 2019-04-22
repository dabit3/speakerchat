// eslint-disable
// this is an auto generated file. This will be overwritten

export const listCommentsForTalk = `query ListCommentsForTalk($talkId: ID!) {
  listCommentsForTalk(talkId: $talkId) {
    items {
      id
      talkId
      clientId
      talk {
        id
        title
        speakerName
        speakerImage
      }
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
export const listTalks = `query ListTalks(
  $filter: ModelTalkFilterInput
  $limit: Int
  $nextToken: String
) {
  listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      speakerName
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      talkId
      clientId
      talk {
        id
        title
        speakerName
        speakerImage
      }
      text
      createdAt
      createdBy
    }
    nextToken
  }
}
`;
