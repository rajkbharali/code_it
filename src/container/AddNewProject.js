import React, { useEffect, useState } from "react";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Alert, UserProfileDetails } from "../components";
import { db } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { Editor } from "@monaco-editor/react";

const AddNewProject = () => {
  const user = useSelector((state) => state.auth.user);

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(false);

  const updateOutputFunc = () => {
    const combinedOutput = `
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
    setOutput(combinedOutput);
  };

  useEffect(() => {
    updateOutputFunc();
  }, [html, css, js]);

  const saveProject = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };
    await setDoc(doc(db, "Projects", id), _doc)
      .then((res) => {
        setAlert(true);
      })
      .catch((err) => console.log(err));

    setInterval(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-start
  justify-start overflow-hidden"
    >
      {/* alert section */}
      {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
      {/* header section */}
      <header className="w-full flex items-center justify-between px-12 py-4">
        <div className="flex items-center justify-center gap-6">
          <Link to={"/home/projects"}>
            <h1 className="flex items-center justify-center font-semibold text-white text-xl">
              CODE-<span className="text-red-600">IT</span> !
            </h1>
          </Link>
          <div className="flex flex-col items-start justify-start">
            {/* title */}
            <div className="flex items-center justify-center gap-3">
              <AnimatePresence>
                {isTitle ? (
                  <motion.input
                    className="px-3 py-1 rounded-md bg-transparent text-primaryText text-sm"
                    key={"TitleInput"}
                    type="text"
                    placeholder="Your Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <motion.p
                    key={"TitleLabel"}
                    className="px-3 py-2 text-white text-sm"
                  >
                    {title}
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isTitle ? (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    key={"MdCheck"}
                    className="cursor-pointer"
                    onClick={() => setIsTitle(false)}
                  >
                    <MdCheck className="text-lg text-emerald-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key={"mdEdit"}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    onClick={() => setIsTitle(true)}
                  >
                    <MdEdit className="text-lg text-emerald-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* follow */}
            <div className="flex items-center justify-center px-3 pt-4 -mt-2 gap-2">
              <p className="text-primaryText text-xs">
                {user?.displayName ? user.displayName : user?.email[0]}
              </p>
            </div>
          </div>
        </div>
        {/* save section */}
        {user && (
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={saveProject}
              className="px-4 py-2 bg-primaryText
                 cursor-pointer text-base text-primary font-semibold rounded-sm"
            >
              Save
            </motion.button>
            <UserProfileDetails />
          </div>
        )}
      </header>

      {/* coding section */}
      <div>
        {/* horizontal */}
        <SplitPane
          split="horizontal"
          minSize={100}
          maxSize={-100}
          defaultSize={"50%"}
        >
          {/* top coding section */}
          <SplitPane split="vertical" minSize={300}>
            {/* html code */}
            <div
              className="w-full h-full flex flex-col items-start
             justify-start"
            >
              <div className="w-full flex items-center justify-between">
                <div className="bg-secondary px-3 py-2 border-t-4 flex items-center justify-center gap-2">
                  <FaHtml5 className="text-lg text-red-500 border-t-gray-500" />
                  <p className="text-primaryText text-sm font-semibold">HTML</p>
                </div>
                {/* icons */}
                {/* <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                  <FcSettings className="text-lg" />
                  <FaChevronDown className="text-lg text-primaryText" />
                </div> */}
              </div>
              <div className="w-full px-2">
                <Editor
                  height="75vh"
                  theme="vs-dark"
                  defaultLanguage="html"
                  defaultValue="<!-- html code -->"
                  value={html}
                  onChange={(value) => {
                    setHtml(value);
                  }}
                />
              </div>
            </div>
            <SplitPane split="vertical" minSize={500}>
              {/* css code */}
              <div
                className="w-full h-full flex flex-col items-start
             justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-3 py-2 border-t-4 flex items-center justify-center gap-2">
                    <FaCss3 className="text-lg text-sky-500 border-t-gray-500" />
                    <p className="text-primaryText text-sm font-semibold">
                      CSS
                    </p>
                  </div>
                  {/* icons */}
                  {/* <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-lg" />
                    <FaChevronDown className="text-lg text-primaryText" />
                  </div> */}
                </div>
                <div className="w-full px-2">
                  {/* <CodeMirror
                    value={css}
                    height="500px"
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                      setCss(value);
                    }}
                    theme={"dark"}
                  /> */}
                  <Editor
                    height="75vh"
                    theme="vs-dark"
                    defaultLanguage="css"
                    defaultValue="/*css code */"
                    value={css}
                    onChange={(value) => {
                      setCss(value);
                    }}
                  />
                </div>
              </div>
              {/* js code */}
              <div
                className="w-full h-full flex flex-col items-start
             justify-start"
              >
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-3 py-2 border-t-4 flex items-center justify-center gap-2">
                    <FaJs className="text-lg text-yellow-500 border-t-gray-500" />
                    <p className="text-primaryText text-sm font-semibold">JS</p>
                  </div>
                  {/* icons */}
                  {/* <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-lg" />
                    <FaChevronDown className="text-lg text-primaryText" />
                  </div> */}
                </div>
                <div className="w-full px-2">
                  <Editor
                    height="75vh"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    defaultValue="//js code"
                    value={js}
                    onChange={(value) => {
                      setJs(value);
                    }}
                  />
                </div>
              </div>
            </SplitPane>
          </SplitPane>

          {/* bottom section */}
          <div
            className="bg-white"
            style={{ overflow: "hidden", height: "100%" }}
          >
            <iframe
              title="Result"
              srcDoc={output}
              style={{ border: "none", width: "100%", height: "100%" }}
            />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default AddNewProject;
