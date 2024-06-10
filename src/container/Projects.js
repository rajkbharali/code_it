import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) =>
    state.search?.searchTerm ? state.search?.searchTerm : ""
  );

  const [filteredData, setFiltereData] = useState([]);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filteredProject = projects.filter((x) =>
        x.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltereData(filteredProject);
    } else {
      setFiltereData(projects);
    }
  }, [searchTerm]);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-14 flex-wrap">
      {filteredData.length > 0
        ? filteredData.map((x, index) => (
            <ProjectCard key={x.id} project={x} index={index} />
          ))
        : projects.map((x, index) => (
            <ProjectCard key={x.id} project={x} index={index} />
          ))}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.5 }}
      className="w-full cursor-pointer md:w-[300px] h-[300px] bg-secondary rounded-md p-4 flex flex-col
   items-center justify-center gap-4"
    >
      <div
        className="bg-primary w-full h-full rounded-md object-cover"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          className="overflow-hidden"
          title="Result"
          srcDoc={project.output}
          style={{
            border: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="flex items-center justify-start gap-3 w-full">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl
    overflow-hidden cursor-pointer bg-emerald-500"
        >
          {project?.user?.photoURL ? (
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={project?.user?.photoURL}
              alt={project?.user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover flex items-center justify-center"
            />
          ) : (
            <p className="text-lg text-white font-semibold capitalize">
              {project?.user?.email[0]}
            </p>
          )}
        </div>
        <div>
          <p className="text-white text-sm capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName
              ? project.user.displayName
              : `${project?.user.email.split("@")[0]}`}
          </p>
        </div>

        <motion.div
          className="cursor-pointer ml-auto"
          whileTap={{ scale: 0.9 }}
        >
          <MdBookmark className="text-primaryText text-xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
