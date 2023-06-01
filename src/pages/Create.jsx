import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import Sidebar from '../partials/Sidebar';
// import MHeader from '../partials/MHeader';
import FormCreate from '../partials/FormCreate';

import CreatedModal from '../components/ModalBlank';

import Copy from '../images/copy.png';

import post from "../post.js";

function Create() {

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
	const [error, setError] = useState("");
  const [redirect, setRedirect] = useState("");
  const [doRedirect, setDoRedirect] = useState(false);
  const [userId, setUserId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
	const navigate = useNavigate();

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

          setUserId(id);
        }
      });
    }
  }, []);
	
	const handleSubmit = (event) => {
		event.preventDefault();
		const x = event.target; //shorthand
		post("/createForm", {"name":x.name.value,"goal":x.goal.value,"logo":x.logo.value,"questions":x.questions.value,"initialPrompting":x.initialPrompting.value,"summaryPrompting":x.summaryPrompting.value,"nps":x.nps.checked,"redirect":x.redirect.value||"https://www.google.com/","user_id":userId,"table":x.table.value,"background":x.background.value,"box":x.box.value,"button":x.button.value})
    .then((data) => {
      if ("id" in data) {
        setRedirect(data["id"]);
        setModalOpen(true);
      } else {
        setError(data["error"]);
      }
    });
	}

  const confirm = () => {
    setDoRedirect(true);
  }

	const copy = () => {
	  navigator.clipboard.writeText("https://formgptfrontend.vercel.app/form/"+redirect);
	}
	
  if (doRedirect) {
    navigate("/forms/stats/"+redirect);
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

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
            
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Create</h1>
              </div>
            
            </div>

            <FormCreate handleSubmit={handleSubmit} error={error} values={[]} />

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
                    <div className="text-lg font-semibold text-slate-800">Form Created</div>
                  </div>
                  {/* Modal content */}
                  <div className="text-sm mb-10">
                    <div className="space-y-2">
                      <p>Your form link is <a href={"https://formgptfrontend.vercel.app/form/"+redirect} target="_blank" className="text-indigo-500 hover:text-indigo-600">{"https://formgptfrontend.vercel.app/form/"+redirect}</a> <button onClick={copy}><img src={Copy} className="w-3.5" /></button></p>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex flex-wrap justify-center space-x-2">
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

export default Create;