/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCommentWithId = `subscription OnCreateCommentWithId($talkId: ID!) {
  onCreateCommentWithId(talkId: $talkId) {
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
export const onCreateTalk = `subscription OnCreateTalk {
  onCreateTalk {
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
export const onUpdateTalk = `subscription OnUpdateTalk {
  onUpdateTalk {
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
export const onDeleteTalk = `subscription OnDeleteTalk {
  onDeleteTalk {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
