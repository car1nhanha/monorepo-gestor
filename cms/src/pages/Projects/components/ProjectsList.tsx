import { useEffect, useState } from "react";
import projectService from "../../../services/ProjectService";
import { Project } from "../../../types";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService
      .getProjects()
      .then((data) => setProjects(data.projects))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="text-sm text-gray-500">
            <p>Status: {project.status}</p>
            <p>Início: {new Date(project.start_date).toLocaleDateString()}</p>
            {project.end_date && (
              <p>Término: {new Date(project.end_date).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
