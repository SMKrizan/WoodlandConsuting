// MVP: page holds admin profile data, data collected from user contact form, and form for entering testimonial info
// Nice to have: location to enter client list data, location to add photos and photo data

import React, { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import Auth from "../../utils/auth";

import MsgList from "../../components/MsgList";
import TstList from "../../components/TstList";
import OwnerInfo from "../../components/OwnerInfo";

// const AdminPage = (props) => {
//   return (
//     <div>
//       <MsgList />
//       <TstList />
//       <OwnerInfo />
//     </div>
//   );
// };

const AdminPage = (props) => {
  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <MsgList />
          <TstList />
          <OwnerInfo />
        </div>
      ) : (
        <span>Please log in.</span>
      )}
    </div>
  );
};

export default AdminPage;
