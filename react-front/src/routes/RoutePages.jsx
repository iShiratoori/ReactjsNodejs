import { Route } from "react-router-dom";
import Patients from "../components/Admin/Patients";
import Dentists from "../components/Admin/Dentists";
import Users from "../components/Admin/Users";
import Overview from "../components/Admin/Overview";
import Appointments from "../components/Admin/Appointments";
import NewPatient from "../components/utils/NewPatient";
import Setting from "../components/Admin/Setting";
import NewDentist from "../components/utils/NewDentist";
import GuestOverview from "../components/Guest/Overview";
import Profile from "../components/Admin/Profile";

export const AdminRoute = (
    <>
        <Route path='' element={<Overview />} />
        <Route path='patients' element={<Patients />} />
        <Route path='patients/new' element={<NewPatient />} />
        <Route path='patients/:patientId' element={<h1>Patient id</h1>} />
        <Route path='dentists' element={<Dentists />} />
        <Route path='dentists/new' element={<NewDentist />} />
        <Route path='dentists/:dentistId' element={<h1>dentists id</h1>} />
        <Route path='dentists/:dentistId/edit' element={<h1>Editing Dentist Infor goes here</h1>} />
        <Route path='appointments' element={<Appointments />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:userId' element={<h1>Uuser id</h1>} />
        <Route path='users/:userId/edit' element={<h1>Editing  users Infor goes here</h1>} />
        <Route path='payments' element={<h1>All payments</h1>} />
        <Route path='reports' element={<h1>All reports</h1>} />
        <Route path='setting' element={<Setting />} />
        <Route path='profile' element={<Profile />} />
    </>
)

export const DentistRoute = (
    <>
        <Route path='' element={<h1>dentists Overview page</h1>} />
        <Route path='patients' element={<Patients />} />
        <Route path='patients/:patientId' element={<h1>Patient id</h1>} />
        <Route path='patients/:patientId/edit' element={<h1>Patient Infor goes here</h1>} />
    </>
)
export const PatientRoute = (
    <>
        <Route path='' element={<h1>Patient Overview page</h1>} />
        <Route path='dentist/:dentistId' element={<h1>YOur Dentist</h1>} />
    </>
)
export const GuestRoute = (
    <>
        <Route path='' element={<GuestOverview />} />
    </>
)