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

const Calendar = () => {
  return (
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
  );
};

export default Calendar;
