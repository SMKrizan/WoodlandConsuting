import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table } from "reactstrap";
import "./MsgList.css";
import { GET_MESSAGES } from "../../utils/queries";
import { REMOVE_MESSAGE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
import { SUBMIT_MESSAGE } from "../../utils/actions";
import { ADD_SUBMIT_MESSAGE} from "../../utils/actions";

const MessageList = (props) => {
  const [message, newMessageData] = useState({});
  const [state, dispatch] = useStoreContext();
    // reminder: "data" is the object described by associated query/mutation
    const { loading, data } = useQuery(GET_MESSAGES)
    const messageData = data?.messages;

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: GET_MESSAGES,
        messages: data.messages
      });
  
      // but let's also take each product and save it to IndexedDB using the helper function 
      data.messages.forEach((message) => {
        idbPromise('messages', 'put', message);
      });
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    async function getMessage() {
      const sentMessage = await idbPromise('messages', 'get');
      dispatch({ type: ADD_SUBMIT_MESSAGE, messages: [...sentMessage] });
    };
  
    if (!state.messages.length) {
      getMessage();
    }
  }, [state.messages.length, dispatch]);


  const [removeMessage, { error }] = useMutation(REMOVE_MESSAGE, {
    update(cache, { data: { removeMessage } }) {
      console.log(removeMessage);
      try {
        const { messages } = cache.readQuery({ query: GET_MESSAGES });
        console.log(messages, "=====", removeMessage._id);
        const newMessageArray = messages.filter((message) => removeMessage._id !== message._id);
        console.log(newMessageArray)
        cache.writeQuery({
          query: GET_MESSAGES,
          data: { messages: [...newMessageArray] },
        });
        console.log(messages, removeMessage._id);
        // deleteMessage();
      } catch (e) {
        console.log(e);
      }
    },
  });
  // const deleteMessage = (removeMessage) => {
  //   dispatch({
  //     type: REMOVE_MESSAGE,
  //     _id: removeMessage._id,
  //   });
  //   idbPromise('messages', 'delete', { ...message });
  // };

  if (loading) {
    return <div>Loading...</div>;
  } else if (!messageData.length) {
    return <h2>No messages to display.</h2>;
  }

  const handleSubmit = async (messageData) => {
    console.log("handlesubmit", messageData._id);
    const { data } = await removeMessage({
      variables: { _id: messageData._id },

    });
    console.log(data)
   
    newMessageData({
      ...message, data
    });
    console.log(newMessageData)
  };
  // const onChange = (e) => {
  //   // const value = e.target.value;
  
  //   // if (value === '0') {
  //     dispatch({
  //       type: REMOVE_MESSAGE,
  //       _id: removeMessage._id
  //     });
  //     idbPromise('messages', 'delete', { ...removeMessage });

  //   // } else {
  //   //   dispatch({
  //   //     type: UPDATE_MESSAGE_Q,
  //   //     _id: item._id,
  //   //     purchaseQuantity: parseInt(value)
  //   //   });
  //   //   idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
  //   }

  return (
    <div>
      <p>{error && <span>Something went wrong.</span>}</p>
      <h3 className="padtb">You have {messageData.length} messages:</h3>
      <Table responsive id="messages" className="box shadow">
        <thead>
          <tr>
            <th key="delete">Delete</th>
            <th key="type">Type</th>
            <th key="name">Name</th>
            <th key="company">Company</th>
            <th key="email">Email</th>
            <th key="message">Message</th>
            <th key="date">Date Received</th>
          </tr>
        </thead>
        <tbody>
          {messageData &&
            messageData.map((message, i) => (
              <tr key={messageData._id}>
                <td key="deleteBtn">
                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit(messageData[i]);
                    }}
                    value={removeMessage._id}
                    // onChange={onChange}
                  >
                    Delete
                  </button>
                </td>
                <td key={messageData.purpose}>{message.purpose}</td>
                <td key={messageData.userName}>{message.userName}</td>
                <td key={messageData.userCompany}>{message.userCompany}</td>
                <td key={messageData.userEmail}>{message.userEmail}</td>
                <td key={messageData.userMessage}>{message.userMessage}</td>
                <td key={messageData.created_at}>
                  {new Date(parseInt(message.created_at)).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MessageList;
