import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../abis/Calend3.json";

import { Box, Button, Slider } from "@material-ui/core";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

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

const schedulerData = [
  {
    startDate: "2022-03-02T09:45",
    endDate: "2022-03-02T11:00",
    title: "Meeting 1",
  },
  {
    startDate: "2022-03-03T12:00",
    endDate: "2022-03-03T13:30",
    title: "Meeting 2",
  },
];

const saveAppointment = (data) => {
  alert("Appointment saved!");
  console.log(data);
};

const Calendar = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rate, setRate] = useState(false);

  const getData = async () => {
    // get contract owner and set admin if connected account is owner
    const owner = await contract.owner();
    setIsAdmin(owner.toUpperCase() === props.account.toUpperCase());

    const rate = await contract.getRate();
    setRate(ethers.utils.formatEther(rate.toString()));
  };

  useEffect(() => {
    getData();
    console.log(rate, isAdmin);
  }, []);

  const handleSliderChange = (event, newValue) => {
    setRate(newValue);
  };

  const saveRate = async () => {
    const tx = await contract.setRate(ethers.utils.parseEther(rate.toString()));
  };

  const Admin = () => {
    return (
      <div className="admin">
        <h3>Hello</h3>
        <Slider
          defaultValue={parseFloat(rate)}
          step={0.001}
          min={0}
          max={0.1}
          valueLabelDisplay="auto"
          onChangeCommitted={handleSliderChange}
        />
        <br />
        <br />
      </div>
    );
  };

  return (
    <>
      {isAdmin && <Admin />}
      <div className="calendar">
        <Scheduler data={schedulerData}>
          <ViewState />
          <EditingState onCommitChanges={saveAppointment} />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={19} />
          <Appointments />
          <AppointmentForm />
        </Scheduler>
      </div>
    </>
  );
};

export default Calendar;
