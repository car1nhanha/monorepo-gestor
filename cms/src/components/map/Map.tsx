import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Organization, Volunteer } from "../../types";
import { MapMarker } from "./MapMarker";

interface MapViewProps {
  volunteers: Volunteer[];
  organizations: Organization[];
}

export function MapView({ volunteers, organizations }: MapViewProps) {
  const center = {
    lat: -23.55052, // São Paulo
    lng: -46.633308,
  };

  const locations = volunteers.map((volunteer) => ({
    lat: volunteer.location.lat,
    lng: volunteer.location.lng,
    title: volunteer.name,
  }));

  return (
    <MapContainer
      center={center}
      zoom={4}
      className="w-full h-[600px] rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((member, i) => (
        <MapMarker key={String(i)} item={member} />
      ))}

      {/* {organizations.map((org) => (
        <MapMarker key={org.id} item={org} type="organization" />
      ))} */}
    </MapContainer>
  );
}
