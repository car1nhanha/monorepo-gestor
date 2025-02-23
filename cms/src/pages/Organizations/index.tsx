import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import { OrganizationsList } from "./components/OrganizationsList";

export function Organizations() {
  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader
          title="Organizações"
          description="Explore ONGs e associações parceiras"
        />
        <OrganizationsList />
      </div>
    </DefaultLayout>
  );
}
