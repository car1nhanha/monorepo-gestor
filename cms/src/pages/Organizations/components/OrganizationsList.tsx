// import { Facebook, Globe, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import organizationService from "../../../services/OrganizationService";
// import { Organization } from "../../../types";

// export function OrganizationsList() {
//   const navigate = useNavigate();
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     organizationService
//       .getOrganizations()
//       .then((data) => setOrganizations(data.organizations))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div className="text-center">Carregando...</div>;

//   const handleEdit = (id: string) => navigate(`/organization/${id}`);

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {organizations.map((org) => (
//         <div key={org.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-semibold">{org.name}</h3>
//               <span
//                 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                   org.type === "ngo" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
//                 }`}
//               >
//                 {org.type === "ngo" ? "ONG" : "Associação"}
//               </span>
//             </div>

//             <p className="text-gray-600 mb-4">{org.description}</p>

//             <div className="space-y-2 text-gray-600">
//               <div className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 <span>
//                   {org.location.lat.toFixed(2)}, {org.location.lng.toFixed(2)}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Phone size={16} />
//                 <span>{org.contact}</span>
//               </div>

//               {org.website && (
//                 <div className="flex items-center gap-2">
//                   <Globe size={16} />
//                   <a
//                     href={org.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     Website
//                   </a>
//                 </div>
//               )}
//             </div>

//             {org.social_media && (
//               <div className="mt-4 flex gap-4">
//                 {org.social_media.facebook && (
//                   <a
//                     href={org.social_media.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-blue-600"
//                   >
//                     <Facebook size={20} />
//                   </a>
//                 )}
//                 {org.social_media.instagram && (
//                   <a
//                     href={org.social_media.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-pink-600"
//                   >
//                     <Instagram size={20} />
//                   </a>
//                 )}
//                 {org.social_media.linkedin && (
//                   <a
//                     href={org.social_media.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-blue-700"
//                   >
//                     <Linkedin size={20} />
//                   </a>
//                 )}
//               </div>
//             )}

//             {org.areas_of_activity && (
//               <div className="mt-4 flex flex-wrap gap-2">
//                 {org.areas_of_activity.map((area, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
//                   >
//                     {area}
//                   </span>
//                 ))}
//               </div>
//             )}

//             <div className="mt-6 space-x-2">
//               <button
//                 type="button"
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 onClick={() => handleEdit(org.id)}
//               >
//                 Editar
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { Facebook, Globe, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewToggle } from "../../../components/ViewToggle";
import organizationService from "../../../services/OrganizationService";
import { Organization } from "../../../types";

export function OrganizationsList() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    organizationService
      .getOrganizations()
      .then((data) => setOrganizations(data.organizations))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: string) => navigate(`/organization/${id}`);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (view === "list") {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <ViewToggle view={view} onViewChange={setView} />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Áreas de Atuação
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{org.name}</div>
                    <div className="text-sm text-gray-500">{org.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        org.type === "ngo" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {org.type === "ngo" ? "ONG" : "Associação"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{org.contact}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {org.areas_of_activity.map((area, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => handleEdit(org.id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ViewToggle view={view} onViewChange={setView} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{org.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    org.type === "ngo" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
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

              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleEdit(org.id)}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
