import { useEffect, useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { MapView } from "../../components/map/Map";
import { DefaultLayout } from "../../components/template/default";
import userService from "../../services/userService";
import { Volunteer } from "../../types";

export function MapPage() {
  const [members, setMembers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getLocations()
      .then((response) => setMembers(response.users))
      .catch(alert)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader
          title="Mapa"
          description="Visualize a distribuição geográfica dos membros e organizações"
        />
        <MapView volunteers={members} organizations={[]} />
      </div>
    </DefaultLayout>
  );
}
