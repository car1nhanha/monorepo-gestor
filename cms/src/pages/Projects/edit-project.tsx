import { ArrowLeft, Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import projectService from "../../services/ProjectService";
import { Project } from "../../types";

export function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    organization_id: "",
    status: "planned",
    start_date: "",
    end_date: "",
    volunteers_needed: 0,
    current_volunteers: 0,
    skills_required: [],
  });

  useEffect(() => {
    if (!id) return;

    projectService
      .getProjectById(id)
      .then((project) => {
        // Format dates for input fields
        const formattedProject = {
          ...project,
          start_date: project.start_date.split("T")[0],
          end_date: project.end_date ? project.end_date.split("T")[0] : "",
        };
        setFormData(formattedProject);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "skills_required") {
      const skills = value.split(",").map((skill) => skill.trim());
      setFormData((prev) => ({ ...prev, skills_required: skills }));
    } else if (name === "volunteers_needed" || name === "current_volunteers") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);

    projectService
      .updateProject(id, formData)
      .then(() => {
        alert("Projeto atualizado com sucesso!");
        navigate("/projects");
      })
      .catch(() => alert("Erro ao atualizar projeto. Tente novamente."))
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
        <PageHeader title="Editar Projeto" description="Atualize as informações do projeto" />

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Projeto
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="planned">Planejado</option>
                  <option value="active">Ativo</option>
                  <option value="completed">Concluído</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Término
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="volunteers_needed" className="block text-sm font-medium text-gray-700 mb-2">
                    Voluntários Necessários
                  </label>
                  <input
                    type="number"
                    name="volunteers_needed"
                    id="volunteers_needed"
                    min="0"
                    value={formData.volunteers_needed}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="current_volunteers" className="block text-sm font-medium text-gray-700 mb-2">
                    Voluntários Atuais
                  </label>
                  <input
                    type="number"
                    name="current_volunteers"
                    id="current_volunteers"
                    min="0"
                    value={formData.current_volunteers}
                    onChange={handleChange}
                    className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="skills_required" className="block text-sm font-medium text-gray-700 mb-2">
                  Habilidades Necessárias (separadas por vírgula)
                </label>
                <input
                  type="text"
                  name="skills_required"
                  id="skills_required"
                  value={formData.skills_required?.join(", ")}
                  onChange={handleChange}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Comunicação, Organização, Liderança"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => navigate("/projects")}
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
