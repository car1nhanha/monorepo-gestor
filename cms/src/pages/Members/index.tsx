import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import { InviteButton } from "./components/InviteButton";
import { VolunteerList } from "./components/VolunteerList";

export function Members() {
  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader
          title="Voluntários"
          description="Gerencie voluntários e envie convites para novos participantes"
        />

        <div className="flex justify-end">
          <InviteButton />
        </div>

        <VolunteerList />
      </div>
    </DefaultLayout>
  );
}
