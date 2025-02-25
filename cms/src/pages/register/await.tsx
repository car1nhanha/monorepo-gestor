import { CheckCircle } from "lucide-react";

interface SuccessPageProps {
  userData: {
    name: string;
    email: string;
  };
  onNewRegistration: () => void;
}

export const ThankYou = () => {
  const { userData, onNewRegistration } = {
    userData: {
      name: "John Doe",
      email: "teste",
    },
    onNewRegistration: () => {},
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Cadastro Realizado!
          </h2>
        </div>

        <div className="mt-4">
          <p className="text-xl text-gray-600 mb-4">Olá, {userData.name}!</p>
          <p className="text-gray-600 mb-2">
            Agradecemos por se cadastrar em nosso sistema.
          </p>
          <p className="text-gray-600">
            Seus dados estão sendo processados e em breve você receberá mais
            informações no email:
          </p>
          <p className="text-blue-600 font-medium mt-2">{userData.email}</p>
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            ✨ Estamos muito felizes em ter você conosco! ✨
          </p>
        </div>

        <button
          onClick={onNewRegistration}
          className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Fazer novo cadastro
        </button>
      </div>
    </div>
  );
};
