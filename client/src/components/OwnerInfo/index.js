import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_OWNER } from '../../utils/queries';
import { UPDATE_OWNER } from '../../utils/mutations';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ManageOwnerInfo = (props) => {
    
    const { loading, data } = useQuery(GET_OWNER);
    const ownerData = data?.owner || [];
    console.log('ownerData: ', data?.owner);
    const [updateOwner, { error }] = useMutation(UPDATE_OWNER);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("LOG", newOwnerInfo);
        const mutationResponse = await updateOwner({
            variables: {
                _id: newOwnerInfo._id,
                ownerName: newOwnerInfo.ownerName,
                ownerEmail: newOwnerInfo.ownerEmail,
                address: newOwnerInfo.address
            },
        });
    };

    const [newOwnerInfo, setNewOwnerInfo] = useState({ ownerName: '', ownerEmail: '', address: '' });
    const handleClick = (data) => {
        setNewOwnerInfo(data);
        console.log("DATA", data)
    };
    function handleChange(event) {
        const { name, value } = event.target;
        console.log('CHANGE', value);

        setNewOwnerInfo({
            ...newOwnerInfo,
            [name]: value,
        });
    }
    const [open, setOpen] = React.useState(false);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!ownerData) {
        return <h2>Something went wrong.</h2>;
    }

    return (
        <>
            <div>
                <h3>Name: {ownerData.ownerName},{newOwnerInfo.ownerName}</h3>
                <h3>Email: {ownerData.ownerEmail}</h3>
                <h3>Address {ownerData.address}</h3>
            </div>
            <div>
                <button className="button"
                    onClick={() => {
                        setOpen(true)
                        handleClick(ownerData);
                    }}> Update </button>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                {console.log("MODAL", newOwnerInfo)}
                <h2>Please update your information</h2>
                <form
                    key={newOwnerInfo._id}
                    value={newOwnerInfo}
                    onSubmit={handleChange}
                >
                    <p><label htmlFor="ownerName">
                        New Name: <input type="name" name="ownerName" value={newOwnerInfo.ownerName} onChange={handleChange} /></label></p>
                    <p><label htmlFor="ownerEmail">
                        New Email: <input type="email" name="ownerEmail" value={newOwnerInfo.ownerEmail} onChange={handleChange} /></label></p>
                    <p><label htmlFor="ownerAddress">
                        New Address: <input type="address" name="address" value={newOwnerInfo.address} onChange={handleChange} /></label></p>
                    {
                        error ? <div>
                            < p className="error-text" > Something went wrong..Please provide information</p>
                        </div> : null
                    }
                    <input
                        type="submit"
                        value="Submit"
                        onClick={handleFormSubmit}
                    />
                </form>
            </Modal >
        </>
    );
};

export default ManageOwnerInfo;