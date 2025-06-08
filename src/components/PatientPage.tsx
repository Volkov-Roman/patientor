import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientPage;
