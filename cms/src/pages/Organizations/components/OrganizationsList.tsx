import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import organizationService from "../../../services/OrganizationService";
import { Organization } from "../../../types";

export function OrganizationsList() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    organizationService
      .getOrganizations()
      .then((data) => setOrganizations(data.organizations))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <div
          key={org.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{org.name}</h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  org.type === "ngo"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {org.type === "ngo" ? "ONG" : "Associação"}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{org.description}</p>

            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>
                  {org.location.lat.toFixed(2)}, {org.location.lng.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{org.contact}</span>
              </div>

              {org.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>

            {org.social_media && (
              <div className="mt-4 flex gap-4">
                {org.social_media.facebook && (
                  <a
                    href={org.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {org.social_media.instagram && (
                  <a
                    href={org.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {org.social_media.linkedin && (
                  <a
                    href={org.social_media.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            )}

            {org.areas_of_activity && (
              <div className="mt-4 flex flex-wrap gap-2">
                {org.areas_of_activity.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
