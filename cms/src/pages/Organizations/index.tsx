import { Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import { OrganizationsList } from "./components/OrganizationsList";

export function Organizations() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader title="Organizações" description="Explore ONGs e associações parceiras" />

        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/create-organization")}
          >
            <Building size={20} />
            Criar Organização
          </button>
        </div>

        <OrganizationsList />
      </div>
    </DefaultLayout>
  );
}
