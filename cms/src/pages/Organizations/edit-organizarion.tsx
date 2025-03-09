import { ArrowLeft, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import { Organization } from "../../types";
import organizationService from "../../services/OrganizationService";

export function EditOrganization() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Organization>>({
    name: "",
    type: "ngo",
    description: "",
    contact: "",
    website: "",
    social_media: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
    location: {
      lat: 0,
      lng: 0,
    },
    areas_of_activity: [],
  });

  useEffect(() => {
    if (!id) return;

    organizationService
      .getOrganizationById(id)
      .then((org) => setFormData(org))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("social_media.")) {
      const [, network] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        social_media: {
          ...prev.social_media,
          [network]: value,
        },
      }));
    } else if (name.startsWith("location.")) {
      const [, coord] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [coord]: parseFloat(value) || 0,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAreasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const areas = e.target.value.split(",").map((area) => area.trim());
    setFormData((prev) => ({ ...prev, areas_of_activity: areas }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);

    organizationService
      .updateOrganization(id, formData)
      .then(() => {
        alert("Organização atualizada com sucesso!");
        navigate("/organizations");
      })
      .catch(() => alert("Erro ao atualizar organização. Tente novamente."))
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader
          title="Editar Organização"
          description="Atualize as informações da organização"
        />

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome da Organização
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tipo
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="ngo">ONG</option>
                  <option value="association">Associação</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Descrição
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contato
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
                <div>
                  <label
                    htmlFor="social_media.facebook"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="social_media.facebook"
                    id="social_media.facebook"
                    value={formData.social_media?.facebook}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="social_media.instagram"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="social_media.instagram"
                    id="social_media.instagram"
                    value={formData.social_media?.instagram}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="social_media.linkedin"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="social_media.linkedin"
                    id="social_media.linkedin"
                    value={formData.social_media?.linkedin}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location.lat"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="location.lat"
                    id="location.lat"
                    value={formData.location?.lat}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location.lng"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="location.lng"
                    id="location.lng"
                    value={formData.location?.lng}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="areas_of_activity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Áreas de Atuação (separadas por vírgula)
                </label>
                <input
                  type="text"
                  name="areas_of_activity"
                  id="areas_of_activity"
                  value={formData.areas_of_activity?.join(", ")}
                  onChange={handleAreasChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Educação, Saúde, Meio Ambiente"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => navigate("/organizations")}
                className="inline-flex items-center px-4 py-2 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}