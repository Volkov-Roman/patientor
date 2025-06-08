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
      <h3>Entries</h3>
      <ul>
        {patient.entries.map(entry => (
          <li key={entry.id}>
            <p><b>{entry.date}</b> {entry.description}</p>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientPage;
