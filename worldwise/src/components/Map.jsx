import { useState, useEffect } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	MapContainer,
	Marker,
	TileLayer,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "./hooks/useGeolocation";
import { useUrlPosition } from "./hooks/useUrlPosition";
import Button from "./Button";

export default function Map() {
	const { cities } = useCities();

	const [mapPostion, setMapPostion] = useState([40, 0]);

	const {
		isLoading: isLoadingPostion,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	const [mapLat, mapLng] = useUrlPosition();

	useEffect(() => {
		if (mapLat && mapLng) setMapPostion([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geolocationPosition)
			setMapPostion([geolocationPosition.lat, geolocationPosition.lng]);
	}, [geolocationPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPostion ? "Loading..." : "Use Your Position"}
				</Button>
			)}
			<MapContainer
				center={mapPostion}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPostion} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			console.log(e);
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}
