import { API_BASE_URL } from "@/constants/constants";
import axiosInstance from "@/redux/axios/axiosInterceptor";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "../Helper/Loader";
import { PatientHistory } from "@/types/patient";
import { capitalize, convertTimestamp } from "@/utils/convertTime";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const PatientHistoryRecords: React.FC<{ patientId: string }> = ({
  patientId,
}) => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // const [documents, setDocuments] = useState([] as any);
  const [selectedDocuments, setSelectedDocuments] = useState([] as any);
  const getPatientHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_BASE_URL}/patients/${patientId}/history`
      );
      setPatientHistory(response.data);
    } catch (error) {
      console.error(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HistoryOfPatient = () => {
    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
    if (loading)
      return (
        <div className="flex justify-center h-32">
          <Loader isCard />
        </div>
      );

    if (patientHistory.length === 0)
      return <div> No History For {patientId}</div>;

      console.log("patientHistory", patientHistory)

    return (
      <div>
        <table className="table-auto min-w-950 overflow-auto">
          <thead>
            <tr>
              {Object.keys(patientHistory[0]).map(
                (title: string, index: number) => {
                  if (["firstName", "lastName", "age", "bloodGroup", "phoneNumber"].includes(title)) return;
                  return <th key={index}>{capitalize(title)}</th>;
                }
              )}
            </tr>
          </thead>
          <tbody>
            {patientHistory.map((data: PatientHistory, index: number) => {
              // console.log(`data${index} -> ${data}`)
              const documents = data?.reports?.map(uri => ({ uri }));
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {/* <td>{data.bloodGroup}</td> */}
                
                  {/* <td>
                    { documents.length > 0 ? (
                      // <DocViewer
                      //   documents={documents}
                      //   initialActiveDocument={documents[0]}
                      //   pluginRenderers={DocViewerRenderers}
                      // />
                      <div className="mb-4">
                      <button
                        onClick={() => {
                          setSelectedDocuments(documents);
                          openModal();
                        }}
                        className="w-full pt-2 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        View Reports
                      </button>
                    </div>
                    ) : (
                      "---"
                    )}
                </td> */}
                  <td>{data.allergies}</td>
                  <td>{data.symptoms}</td>
                  <td>{data.diagnosis}</td>
                  <td>{data.treatment}</td>
                  <td>{data.followUp}</td>
                     <td>
                    { documents.length > 0 ? (
                      // <DocViewer
                      //   documents={documents}
                      //   initialActiveDocument={documents[0]}
                      //   pluginRenderers={DocViewerRenderers}
                      // />
                      <div className="mb-4">
                      <button
                        onClick={() => {
                          setSelectedDocuments(documents);
                          openModal();
                        }}
                        className="w-full pt-2 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        View Reports
                      </button>
                    </div>
                    ) : (
                      "---"
                    )}
                </td>
                  <td>{data.changedBy}</td>
                  <td>{`${convertTimestamp(
                    parseInt(data.Timestamp.seconds)
                  )}`}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="  overflow-hidden transform  rounded-2xl px-4 pb-6 sm:px-6 lg:px-8  p-6 text-left shadow-xl transition-all ">
                      <DocViewer
                        documents={selectedDocuments}
                        initialActiveDocument={selectedDocuments[0]}
                        pluginRenderers={DocViewerRenderers}
                      />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>
    );
  };

  return (
    <div className="header min-w-fit rounded-3xl  px-3 py-1">
      <div className="p-3">
        <i className="fas fa-book mr-1"></i> Patient History -{" "}
        <span className="font-semibold">{patientId}</span>
      </div>
      <div className="p-3">
        <HistoryOfPatient />
      </div>
    </div>
  );
};

export default PatientHistoryRecords;
