import { poppinsFont } from "@/util/Constants";
import { useMemo, useState } from "react";
import ModalButtons from "./ModelButtons";

const FlightModel: React.FC<{
  onClose: () => void;
  onSave: (flights: string[]) => void;
}> = ({ onClose, onSave }) => {
  const [flights, setFlights] = useState<string[]>([""]);
  const flightItems = useMemo(
    () =>
      flights.map((_, index) => (
        <input
          key={`flight_image_${index}`}
          className={poppinsFont.className}
          style={{
            ...poppinsFont.style,
            width: "100%",
            height: "auto",
            marginTop: 2,
            padding: 10,
            alignContent: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: "black",
          }}
          placeholder="Highlight Image"
          type="file"
          onChange={(e) => {
            var result = e.target.files?.item(0);
            result && setFlights(flights.concat([URL.createObjectURL(result)]));
          }}
        />
      )),
    [flights]
  );
  return (
    <>
      <div style={{ width: "100%" }}>{flightItems}</div>
      <ModalButtons
        onClose={onClose}
        onSave={() => onSave(flights.filter((v) => v.length > 0))}
      />
    </>
  );
};

export default FlightModel;
