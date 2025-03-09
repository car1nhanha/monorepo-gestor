import { FolderPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import { ProjectsList } from "./components/ProjectsList";

export function Projects() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader title="Projetos" description="Acompanhe projetos e iniciativas em andamento" />

        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/create-project")}
          >
            <FolderPlus size={20} />
            Criar Projeto
          </button>
        </div>

        <ProjectsList />
      </div>
    </DefaultLayout>
  );
}
