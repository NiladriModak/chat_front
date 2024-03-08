export const getSender = (loggedUser, users) => {
  // console.log("tuibol1", users);

  // console.log(loggedUser, users);
  if (!loggedUser || !users || users.length < 2) {
    return "mmmm"; // Return null or handle the edge case as per your requirement
  }

  return users[0]._id === loggedUser.user._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  // console.log("tuibol2", users);
  if (!loggedUser || !users || !Array.isArray(users) || users.length < 2) {
    return "m"; // Return null or handle the edge case as per your requirement
  }

  return users[0]._id === loggedUser.user._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, m, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  ) {
    return "34px";
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i == messages.length - 1 && messages[i].sender._id !== userId)
  )
    return "0";
  return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
