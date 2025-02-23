import { Building2, FolderHeart, Map, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/layout/Card";
import { PageHeader } from "../components/layout/PageHeader";
import { DefaultLayout } from "../components/template/default";

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Membros",
      description: "Gerencie membros e convites para novos participantes.",
      icon: Users,
      path: "/members",
      iconColor: "text-blue-600",
    },
    {
      title: "Organizações",
      description: "Explore ONGs e associações parceiras.",
      icon: Building2,
      path: "/organizations",
      iconColor: "text-green-600",
    },
    {
      title: "Projetos",
      description: "Acompanhe projetos e iniciativas em andamento.",
      icon: FolderHeart,
      path: "/projects",
      iconColor: "text-purple-600",
    },
    {
      title: "Mapa",
      description:
        "Visualize a distribuição geográfica dos membros e organizações.",
      icon: Map,
      path: "/map",
      iconColor: "text-red-600",
    },
  ];

  return (
    <DefaultLayout>
      <div className="space-y-8">
        <PageHeader
          title="Bem-vindo ao Gestor do Povo"
          description="Uma plataforma para conectar pessoas, organizações e projetos que fazem a diferença na sociedade."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.path}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconColor={feature.iconColor}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </div>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Como Participar</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              1. Receba um convite de um membro existente
            </p>
            <p className="text-gray-700">
              2. Complete seu cadastro com suas informações
            </p>
            <p className="text-gray-700">
              3. Conecte-se com organizações e projetos
            </p>
            <p className="text-gray-700">
              4. Participe ativamente da comunidade
            </p>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
