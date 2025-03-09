import { Loader2, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/layout/PageHeader";
import { DefaultLayout } from "../../components/template/default";
import organizationService from "../../services/OrganizationService";
import projectService from "../../services/ProjectService";
import { Organization } from "../../services/types/Organization";
import { ProjectInput } from "../../services/types/project";

export function CreateProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searching, setSearching] = useState(false);
  const [formData, setFormData] = useState<ProjectInput>({
    title: "",
    description: "",
    organization_id: "",
    status: "planned",
    start_date: "",
    end_date: "",
    volunteers_needed: 0,
    current_volunteers: 0,
    skills_required: [] as string[],
  });

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setSearching(true);
      const timeoutId = setTimeout(() => {
        organizationService
          .searchOrganizations(searchTerm)
          .then(setOrganizations)
          .finally(() => setSearching(false));
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setOrganizations([]);
    }
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "skills_required") {
      const skills = value.split(",").map((skill) => skill.trim());
      setFormData((prev) => ({ ...prev, skills_required: skills }));
    } else if (name === "volunteers_needed") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await projectService.createProject(formData);
      alert("Projeto criado com sucesso!");
      navigate("/projects");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar projeto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <PageHeader title="Criar Novo Projeto" description="Cadastre um novo projeto no sistema" />

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label htmlFor="organization_search" className="block text-sm font-medium text-gray-700 mb-2">
                Organização
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="organization_search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Digite para pesquisar organizações..."
                />
                {searching && (
                  <div className="absolute right-3 top-3">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                )}
                {organizations.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
                    <ul className="max-h-60 overflow-auto py-1">
                      {organizations.map((org) => (
                        <li
                          key={org.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              organization_id: org.id,
                            }));
                            setSearchTerm(org.name);
                            setOrganizations([]);
                          }}
                        >
                          {org.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
                value={formData.skills_required.join(", ")}
                onChange={handleChange}
                className="block w-full rounded-md border-2 border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Comunicação, Organização, Liderança"
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Criar Projeto
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
