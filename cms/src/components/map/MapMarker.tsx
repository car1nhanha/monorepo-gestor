import { Marker, Popup } from "react-leaflet";

interface MapMarkerProps {
  item: {
    lat: number;
    lng: number;
    title: string;
  };
  // type: "member" | "organization";
}

export function MapMarker({ item }: MapMarkerProps) {
  return (
    <Marker position={{ lat: item.lat, lng: item.lng }}>
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-lg">{item.title}</h3>
          {/* {type === 'organization' && (
            <p className="text-sm text-gray-600">
              {(item as Organization).type === 'ngo' ? 'ONG' : 'Associação'}
            </p>
          )} */}
        </div>
      </Popup>
    </Marker>
  );
}
