import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
function DeletePopup(props) {
  const navigate = useNavigate();

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/${id}`);
      if (response) {
        toast.success("deleted!", {
          position: "top-right",
          theme: "colored",
        });
        // clearForm();
        navigate(`/employees`);
      }
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 2,
  };
  return props.trigger ? (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.trigger}
      onClose={props.setTrigger}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.trigger}>
        <Box sx={style} className="rounded border-b-2 border-red-500">
          <div className="py-2 px-3">
            <h2 className="font-semibold text-lg">Delete account</h2>
            <p className="">
              are you sure you want to delete this account? if you delete this
              account , you will permanently lose this profile ,data and
              information.
            </p>
          </div>
          <div className="flex w-full flex-row ">
            <button
              onClick={() => props.setTrigger(false)}
              className=" w-full rounded bg-white font-medium self-end hover:bg-gray-100 border border-gray-300
                  text-black text-sm p-2  m-4 justify-evenly"
            >
              <p className="text-base">Cancel</p>
            </button>
            <button
              onClick={() => deleteEmployee(props.id)}
              className=" w-full rounded bg-red-500 font-medium self-end hover:bg-red-400
                  text-white text-sm p-2  m-4 justify-evenly"
            >
              <p className="text-base">Delete</p>
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  ) : (
    ""
  );
}

export default DeletePopup;
