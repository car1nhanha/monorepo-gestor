import Api from "./api";
import { Organization, OrganizationInput } from "./types/Organization";

interface OrganizationListResponse {
  organizations: Organization[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

class OrganizationService extends Api {
  async getOrganizations(
    page: number = 1,
    limit: number = 10
  ): Promise<OrganizationListResponse> {
    return this.get<OrganizationListResponse>(
      `/organizations?page=${page}&limit=${limit}`
    );
  }

  async getOrganizationById(id: string): Promise<Organization> {
    return this.get<Organization>(`/organizations/${id}`);
  }

  async createOrganization(
    organizationData: OrganizationInput
  ): Promise<Organization> {
    return this.post<Organization>("/organizations", organizationData);
  }

  async updateOrganization(
    id: string,
    organizationData: Partial<OrganizationInput>
  ): Promise<Organization> {
    return this.put<Organization>(`/organizations/${id}`, organizationData);
  }

  async deleteOrganization(id: string): Promise<void> {
    return this.delete<void>(`/organizations/${id}`);
  }
}

export default new OrganizationService();
