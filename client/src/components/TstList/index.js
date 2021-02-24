import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {
  Card,
  CardText,
  CardBody,
  CardGroup,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

// import TstUpdate from '../TstUpdate';
import { GET_TESTIMONIALS } from "../../utils/queries";
// import { UPDATE_TST } from "../../utils/actions";
import { UPDATE_TESTIMONIAL } from "../../utils/mutations";
// import Auth from "../../utils/auth";

const TestimonialList = (props) => {
  const [state, dispatch] = useStoreContext();
  const { testimonials, testimonial } = state;

  // queries data from db to display testimonials to admin page
  const { loading, data } = useQuery(GET_TESTIMONIALS);
  const tstData = data?.testimonials || [];

  // submits replaced/updated testimonial values to db for persistent storage
  const [updatedTst] = useMutation(UPDATE_TESTIMONIAL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log("updated modalData: ", modalData);
    const mutationResponse = await updatedTst({
      variables: {
        _id: modalData._id,
        tstName: modalData.tstName,
        tstCompany: modalData.tstCompany,
        tstMessage: modalData.tstMessage,
      },
    });
  };

  // state is updated with any new form values
  const [modalData, setModalData] = useState({});
  const handleClick = (testimonial) => {
    setModalData(testimonial);
  };
  
  // grabs any updated form values with other retained object properties
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      // gets value of name attribute and returns associated value property
      [name]: value,
    });
  };
  
  // modal
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <h3 className="padtb">
        There are currently {tstData.length} testimonials displaying to your
        page:
      </h3>
      {tstData &&
        tstData.map((testimonial) => (
          // 'key' is required on mapped data for React to track data changes
          <div key={testimonial._id}>
            <CardGroup className="padb">
              <Card className=' box shadow pad'>
                <CardBody>
                  <h4>{testimonial.tstName}</h4>
                  <h5 className="mb-2 text-muted">
                    {testimonial.tstCompany}
                  </h5>
                  <CardText>{testimonial.tstMessage}</CardText>
                  <h5 className="mb-2 text-muted">
                    Updated: {testimonial.updated_at} 
                    <br/>
                    Created: {testimonial.created_at}
                  </h5>
                  <Button
                    className="button"
                    onClick={() => {
                      setOpen(true);
                      handleClick(testimonial);
                    }}
                  >
                    Update
                  </Button>
                </CardBody>
              </Card>
            </CardGroup>
          </div>
        ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* {console.log("modalData: ", modalData)} */}
        <h2>Replace/update testimonial:</h2>
        <form>
          <p>
            <label name="tstName">
              Name:
              <input
                type="text"
                name="tstName"
                value={modalData.tstName}
                onChange={handleInputChange}
              />
            </label>
          </p>
          <p>
            <label name="tstCompany">
              Company:
              <input
                type="text"
                name="tstCompany"
                value={modalData.tstCompany}
                onChange={handleInputChange}
              />
            </label>
          </p>
          <p>
            <label name="tstMessage">
              Message:
              <input
                type="text"
                name="tstMessage"
                value={modalData.tstMessage}
                onChange={handleInputChange}
              />
            </label>
          </p>
          <button onClick={handleFormSubmit}>Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default TestimonialList;