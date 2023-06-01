import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import Sidebar from '../../partials/Sidebar';
// import MHeader from '../../partials/MHeader';
import FormCreate from '../../partials/FormCreate';
import DeleteModal from '../../components/ModalBlank';

import CreatedModal from '../../components/ModalBlank';

import Copy from '../../images/copy.png';

import post from "../../post.js";

function Edit() {

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
	const [error, setError] = useState("");
  const [formName, setFormName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
	const [oldData, setOldData] = useState("");
  const { formId } = useParams();
	const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
		// Checked logged in
		const id = localStorage.getItem("id");
		if (id === null) {
			navigate("/");
		} else {
      post("/idToName", {"id":id})
      .then((name) => {
        if (name["name"].length === 0) {
					localStorage.clear();
          navigate("/");
        } else {
          setName(name["name"][0]["name"]);

          post("/getData", {"id":formId,"dataType":"name"})
          .then((data) => {
            setFormName(data["data"]);
            document.title = "FormGPT - Edit " + data["data"];
          });

					post("/getData", {"id":formId,"dataType":"editSetup"})
					.then((data) => {
						setOldData(data["data"]);
          })
        }
      });
    }
  }, []);
	
	const handleSubmit = (event) => {
		event.preventDefault();
		const x = event.target; //shorthand
		post("/edit", {"name":x.name.value,"goal":x.goal.value,"logo":x.logo.value,"questions":x.questions.value,"initialPrompting":x.initialPrompting.value,"summaryPrompting":x.summaryPrompting.value,"redirect":x.redirect.value||"https://www.google.com/","background":x.background.value,"box":x.box.value,"button":x.button.value,"formId":formId})
    .then((data) => {
      if (!("error" in data)) {
        setModalOpen(true);
      } else {
        setError(data["error"]);
      }
    });
	}

  const confirm = () => {
    navigate("/forms/stats/"+formId);
  }

	const copy = () => {
	  navigator.clipboard.writeText("https://formgptfrontend.vercel.app/form/"+formId);
	}

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        {/* <MHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name={name} /> */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
            <div className="relative mb-8">
              <div className="absolute bottom-0 w-full h-px bg-slate-200" aria-hidden="true"></div>
              <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <a className="block pb-3 text-slate-500 hover:text-slate-600 whitespace-nowrap" href={"/forms/stats/"+formId}>Stats</a>
                </li>
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <a className="block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500" href="#0">Edit</a>
                </li>
              </ul>
            </div>

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
            
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{formName === "" ? "Loading..." : formName}</h1>
                <p>Your form link is <a href={"https://formgptfrontend.vercel.app/form/"+formId} target="_blank" className="text-indigo-500 hover:text-indigo-600">{"https://formgptfrontend.vercel.app/form/"+formId}</a> <button onClick={copy}><img src={Copy} className="w-4" /></button></p>
              </div>

              
              {/* Delete form button */}
              <button className="btn bg-rose-500 hover:bg-rose-600 text-white" aria-controls="delete-modal" onClick={(e) => { e.stopPropagation(); setDeleteModalOpen(true);}} >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                  <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                </svg>
                <span className="ml-2">Delete Form</span>
              </button>

              <DeleteModal id="delete-modal" modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} clickOff>
                <div className="p-5 flex space-x-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
                    <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div>
                    {/* Modal header */}
                    <div className="mb-2">
                      <div className="text-lg font-semibold text-slate-800">Delete {formName}?</div>
                    </div>
                    {/* Modal content */}
                    <div className="text-sm mb-10">
                      <div className="space-y-2">
                        <p>This will instantly close the form to submissions, and delete all data recorded.</p>
                      </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex flex-wrap justify-end space-x-2">
                      <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setDeleteModalOpen(false); }}>Never mind</button>
                      <a className="btn-sm bg-rose-500 hover:bg-rose-600 text-white" href={"/delete/"+formId}>Yes, Delete it</a>
                    </div>
                  </div>
                </div>
              </DeleteModal>
            
            </div>

						{oldData === "" ?  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Loading...</h1> : <FormCreate handleSubmit={handleSubmit} values={oldData} error={error} />}

            <CreatedModal id="success-modal" modalOpen={modalOpen} setModalOpen={setModalOpen}>
              <div className="p-5 flex space-x-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100">
                  <svg className="w-4 h-4 shrink-0 fill-current text-emerald-500" viewBox="0 0 16 16">
                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
                  </svg>
                </div>
                {/* Content */}
                <div>
                  {/* Modal header */}
                  <div className="mb-2">
                    <div className="text-lg font-semibold text-slate-800">Form Updated</div>
                  </div>
                  {/* Modal content */}
                  <div className="text-sm mb-10">
                    <div className="space-y-2">
                      <p>Your form data has been updated!</p>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={confirm}>Got it!</button>
                  </div>
                </div>
              </div>
            </CreatedModal>
          
          </div>

        </main>

      </div>

    </div>
  );
}

export default Edit;