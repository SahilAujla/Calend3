import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../abis/Calend3.json";

import { Box, Button, Slider } from "@material-ui/core";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";

import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

const contractAddress = "0xe7aF5A268C4E9D9DF91Ed6c8c93B72a6E2Ec0051";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);

const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider.getSigner()
);

console.log(contract);

const Calendar = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [rate, setRate] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [mined, setMined] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const transformAppointmentData = (appointmentData) => {
    let data = [];
    appointmentData.forEach((appointment) => {
      data.push({
        title: appointment.title,
        startDate: new Date(appointment.startTime * 1000),
        endDate: new Date(appointment.endTime * 1000),
      });
    });

    setAppointments(data);
  };

  const getData = async () => {
    // get contract owner and set admin if connected account is owner
    const owner = await contract.owner();
    setIsAdmin(owner.toUpperCase() === props.account.toUpperCase());

    const rate = await contract.getRate();
    setRate(ethers.utils.formatEther(rate.toString()));

    const appointmentData = await contract.getAppointments();
    console.log("got appointments");
    console.log(appointmentData);
    transformAppointmentData(appointmentData);
  };

  useEffect(() => {
    getData();
    console.log(rate, isAdmin);
  }, []);

  const handleSliderChange = (event, newValue) => {
    setRate(newValue);
  };

  const saveAppointment = async (data) => {
    const appointment = data.added;
    const title = appointment.title;
    const startTime = appointment.startDate.getTime() / 1000;
    const endTime = appointment.endDate.getTime() / 1000;

    setShowSign(true);
    setShowDialog(true);
    setMined(false);

    try {
      const cost = ((endTime - startTime) / 60) * rate;
      const msg = { value: ethers.utils.parseEther(cost.toString()) };
      let transaction = await contract.createAppointment(
        title,
        startTime,
        endTime,
        msg
      );

      setShowSign(false);

      await transaction.wait();

      setMined(true);
      setTransactionHash(transaction.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const saveRate = async () => {
    const tx = await contract.setRate(ethers.utils.parseEther(rate.toString()));
  };

  const marks = [
    {
      value: 0.0,
      label: "Free",
    },
    {
      value: 0.02,
      label: "0.02 ETH/min",
    },
    {
      value: 0.04,
      label: "0.04 ETH/min",
    },
    {
      value: 0.06,
      label: "0.06 ETH/min",
    },
    {
      value: 0.08,
      label: "0.08 ETH/min",
    },
    {
      value: 0.1,
      label: "Expensive",
    },
  ];

  const Admin = () => {
    return (
      <div className="admin">
        <Box>
          <h3>Set Your Minutely Rate</h3>
          <Slider
            defaultValue={parseFloat(rate)}
            step={0.001}
            min={0}
            max={0.1}
            marks={marks}
            valueLabelDisplay="auto"
            onChangeCommitted={handleSliderChange}
          />
          <br />
          <br />
          <Button className="settings" onClick={saveRate} variant="contained">
            <SettingsSuggestIcon /> save configuration
          </Button>
        </Box>
      </div>
    );
  };

  const ConfirmDialog = () => {
    return (
      <Dialog open={true}>
        <h3>
          {mined && "Appointment Confirmed"}
          {!mined && !showSign && "Confirming Your Appointment..."}
          {!mined && showSign && "Please Sign to Confirm"}
        </h3>
        <div style={{ textAlign: "left", padding: "0px 20px 20px 20px" }}>
          {mined && (
            <div>
              Your appointment has been confirmed and is on the blockchain.
              <br />
              <br />
              <a
                target="_blank"
                href={`https://goerli.etherscan.io/tx/${transactionHash}`}
              >
                View on Etherscan
              </a>
            </div>
          )}
          {!mined && !showSign && (
            <div>
              <p>
                Please wait while we confirm your appoinment on the
                blockchain....
              </p>
            </div>
          )}
          {!mined && showSign && (
            <div>
              <p>Please sign the transaction to confirm your appointment.</p>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", paddingBottom: "30px" }}>
          {!mined && <CircularProgress />}
        </div>
        {mined && (
          <Button
            onClick={() => {
              setShowDialog(false);
              getData();
            }}
          >
            Close
          </Button>
        )}
      </Dialog>
    );
  };

  return (
    <>
      {isAdmin && <Admin />}
      <div className="calendar">
        <Scheduler data={appointments}>
          <ViewState />
          <EditingState onCommitChanges={saveAppointment} />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={19} />
          <Appointments />
          <AppointmentForm />
        </Scheduler>
      </div>

      {showDialog && <ConfirmDialog />}
    </>
  );
};

export default Calendar;
