import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import { ProjectsList } from "./components/ProjectsList";

export function Projects() {
  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader
          title="Projetos"
          description="Acompanhe projetos e iniciativas em andamento"
        />
        <ProjectsList />
      </div>
    </DefaultLayout>
  );
}
