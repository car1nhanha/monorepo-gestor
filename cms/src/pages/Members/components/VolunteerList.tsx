import { Calendar, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../services/types/user";
import volunteerService from "../../../services/userService";

export function VolunteerList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    volunteerService
      .getUsers()
      .then((data) => setUsers(data.users))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: string) => navigate(`/edit-volunteer/${id}`);

  if (loading) return <div className="text-center">Carregando...</div>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">{user.name}</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>
                  {user.address.city} - {user.address.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  Desde {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role === "admin" ? "Administrador" : "Voluntário"}
              </span>
            </div>
            {/* group button */}
            <div className="mt-6 space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleEdit(user.id)}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
